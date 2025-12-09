/**
 * ============================================
 * WEAPON MANAGER - Système unifié de switch d'armes
 * ============================================
 * 
 * Remplace AutoSwitch.js et WeaponSwitch.js
 * 
 * Logique:
 * 1. Si WeaponSwitch est activé ET l'arme est dans la liste -> utilise WeaponSwitch
 * 2. Sinon si AutoSwitch est activé ET l'arme est lente -> utilise AutoSwitch
 * 3. Sinon -> ne fait rien
 */

import { translations } from '@/core/obfuscatedNameTranslator.js';
import { gameManager, inputState, settings } from '@/core/state.js';
import { gameObjects, inputCommands, isGameReady } from '@/utils/constants.js';

// ============================================
// CONSTANTES
// ============================================

const WEAPON_COMMANDS = [inputCommands.EquipPrimary_, inputCommands.EquipSecondary_];


// Map des armes avec les VRAIS noms du jeu (depuis gunDefs.ts)
const WEAPON_MAP = {
  // Shotguns
  'mp220_': ['mp220'],
  'spas12_': ['spas12'],
  'm870_': ['m870'],
  'saiga_': ['saiga'],
  'super90_': ['m1014'],           // Super 90 = m1014 dans le jeu!
  'usas_': ['usas'],
  'm1100_': ['m1100'],
  // Snipers
  'mosin_': ['mosin'],
  'sv98_': ['sv98'],
  'awc_': ['awc', 'awm'],
  'scout_': ['scout'],
  'model94_': ['model94'],
  'blr_': ['blr'],
  // DMRs - NOMS EXACTS du jeu
  'mk12_': ['mk12'],               // mk12 dans le jeu
  'mk20_': ['scarssr'],            // Mk20 SSR = scarssr dans le jeu!
  'm39_': ['m39'],                 // m39 dans le jeu
  'svd_': ['svd'],                 // svd dans le jeu
  'garand_': ['garand'],           // garand dans le jeu
  // Pistols
  'ot38_': ['ot38'],
  'ots38_': ['ots38'],
  'deagle_': ['deagle'],
  'm9_': ['m9'],
  'm93r_': ['m93r'],
  'm1911_': ['m1911'],
  'p30l_': ['p30l'],
  'flare_gun_': ['flare_gun'],
  'peacemaker_': ['peacemaker'],
  // Others
  'groza_': ['groza'],
  'grozas_': ['grozas'],
  'an94_': ['an94'],
  'm1a1_': ['m1a1'],
};


// ============================================
// ÉTAT
// ============================================

const weaponState = [
  { ammo_: null, type_: '', lastSwitchTime_: 0, lastShotDate_: Date.now() },
  { ammo_: null, type_: '', lastSwitchTime_: 0, lastShotDate_: Date.now() },
];

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

const queueInput = (command) => {
  inputState.queuedInputs_.push(command);
};

const queueWeaponSwitch = (weaponIndex) => {
  queueInput(WEAPON_COMMANDS[weaponIndex]);
};

const queueWeaponCycleAndBack = (firstIndex, secondIndex) => {
  queueWeaponSwitch(firstIndex);
  queueWeaponSwitch(secondIndex);
};

const queueMeleeCycleAndBack = (weaponIndex) => {
  queueInput(inputCommands.EquipMelee_);
  queueWeaponSwitch(weaponIndex);
};

const getAlternateWeaponIndex = (index) => (index === 0 ? 1 : 0);

/**
 * Vérifie si l'arme est dans la liste WeaponSwitch
 */
const isWeaponInList = (weaponType) => {
  if (!weaponType) return false;
  const type = weaponType.toLowerCase().replace(/[-\s]/g, '_');

  for (const [settingKey, aliases] of Object.entries(WEAPON_MAP)) {
    for (const alias of aliases) {
      if (type.includes(alias) || type === alias) {
        return settings.weaponSwitch_?.[settingKey] === true;
      }
    }
  }
  return false;
};

/**
 * Vérifie si l'arme est une arme à tir lent (pour AutoSwitch)
 */
const isSlowFiringWeapon = (weaponType) => {
  try {
    const weapon = gameObjects[weaponType];
    if (!weapon) return false;
    return (
      (weapon.fireMode === 'single' || weapon.fireMode === 'burst') &&
      weapon.fireDelay >= 0.45
    );
  } catch {
    return false;
  }
};

/**
 * Vérifie si le joueur est en train de tirer
 */
const isPlayerFiring = () => {
  try {
    return (
      gameManager.game[translations.touch_]?.shotDetected ||
      gameManager.game[translations.inputBinds_]?.isBindDown(inputCommands.Fire_)
    );
  } catch {
    return false;
  }
};

// ============================================
// LOGIQUE PRINCIPALE
// ============================================

/**
 * Détermine quel système doit gérer cette arme
 * @returns 'weaponSwitch' | 'autoSwitch' | null
 */
const getHandlerForWeapon = (weaponType) => {
  // Priorité 1: WeaponSwitch (si activé ET arme dans la liste)
  if (settings.weaponSwitch_?.enabled_ && isWeaponInList(weaponType)) {
    return 'weaponSwitch';
  }

  // Priorité 2: AutoSwitch (si activé ET arme lente)
  if (settings.autoSwitch_?.enabled_ && isSlowFiringWeapon(weaponType)) {
    return 'autoSwitch';
  }

  return null;
};

/**
 * Exécute le switch d'arme
 */
const performSwitch = (currentWeaponIndex, otherWeaponIndex, otherWeapon, handler) => {
  const now = Date.now();

  // Cooldown entre les switch
  if (now - weaponState[currentWeaponIndex].lastSwitchTime_ < 150) {
    return;
  }

  weaponState[currentWeaponIndex].lastSwitchTime_ = now;
  weaponState[otherWeaponIndex].lastSwitchTime_ = now;
  weaponState[currentWeaponIndex].lastShotDate_ = now;

  // Logique de switch
  if (handler === 'weaponSwitch') {
    // WeaponSwitch: switch seulement si l'autre arme est aussi dans la liste ET a des munitions
    if (isWeaponInList(otherWeapon.type) && otherWeapon.ammo > 0) {
      queueWeaponSwitch(otherWeaponIndex);
    } else if (otherWeapon.type !== '') {
      queueWeaponCycleAndBack(otherWeaponIndex, currentWeaponIndex);
    } else {
      queueMeleeCycleAndBack(currentWeaponIndex);
    }
  } else if (handler === 'autoSwitch') {
    // AutoSwitch: switch si l'autre arme est lente et a des munitions (sauf mode oneGun)
    if (isSlowFiringWeapon(otherWeapon.type) && otherWeapon.ammo > 0 && !settings.autoSwitch_.useOneGun_) {
      queueWeaponSwitch(otherWeaponIndex);
    } else if (otherWeapon.type !== '') {
      queueWeaponCycleAndBack(otherWeaponIndex, currentWeaponIndex);
    } else {
      queueMeleeCycleAndBack(currentWeaponIndex);
    }
  }
};

/**
 * Tick principal - appelé chaque frame
 */
const weaponManagerTick = () => {
  if (!isGameReady()) return;

  // Aucun système activé
  if (!settings.autoSwitch_?.enabled_ && !settings.weaponSwitch_?.enabled_) {
    return;
  }

  try {
    const game = gameManager.game;
    const player = game[translations.activePlayer_];
    const localData = player[translations.localData_];
    const currentWeaponIndex = localData[translations.curWeapIdx_];

    // Seulement pour les armes primaires et secondaires (index 0 et 1)
    if (currentWeaponIndex !== 0 && currentWeaponIndex !== 1) return;

    const weapons = localData[translations.weapons_];
    const currentWeapon = weapons[currentWeaponIndex];
    const currentState = weaponState[currentWeaponIndex];

    // Pas de changement de munitions = pas de tir
    if (currentWeapon.ammo === currentState.ammo_) return;

    const otherWeaponIndex = getAlternateWeaponIndex(currentWeaponIndex);
    const otherWeapon = weapons[otherWeaponIndex];

    // Déterminer quel système gère cette arme
    const handler = getHandlerForWeapon(currentWeapon.type);

    // Vérifier si on doit switch
    const hasFired = currentWeapon.ammo < currentState.ammo_;
    const sameWeaponType = currentWeapon.type === currentState.type_;

    // Condition spéciale pour AutoSwitch: gère aussi le rechargement
    const autoSwitchReload = (
      handler === 'autoSwitch' &&
      currentState.ammo_ === 0 &&
      currentWeapon.ammo > currentState.ammo_ &&
      isPlayerFiring()
    );

    const shouldSwitch = handler && sameWeaponType && (hasFired || autoSwitchReload);

    if (shouldSwitch) {
      performSwitch(currentWeaponIndex, otherWeaponIndex, otherWeapon, handler);
    }

    // Mettre à jour l'état
    currentState.ammo_ = currentWeapon.ammo;
    currentState.type_ = currentWeapon.type;

  } catch (e) {
    // Silently fail
  }
};

// ============================================
// EXPORT POUR COMPATIBILITÉ
// ============================================

/**
 * Utilisé par AutoSwitch.js pour savoir si WeaponSwitch gère l'arme
 * @deprecated - Gardé pour compatibilité, mais plus nécessaire avec le système unifié
 */
export const isHandledByWeaponSwitch = (weaponType) => {
  if (!settings.weaponSwitch_?.enabled_) return false;
  return isWeaponInList(weaponType);
};

// ============================================
// INITIALISATION
// ============================================

let initialized = false;

export default function () {
  if (initialized) return;
  initialized = true;

  const checkReady = setInterval(() => {
    if (gameManager?.pixi?._ticker) {
      clearInterval(checkReady);
      gameManager.pixi._ticker.add(weaponManagerTick);
      console.log('🟢 WeaponManager initialized');
    }
  }, 100);
}