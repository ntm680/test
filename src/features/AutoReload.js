/**
 * =============================================
 * AUTO RELOAD - Recharge automatiquement l'arme
 * =============================================
 */

import { translations } from '@/core/obfuscatedNameTranslator.js';
import { outer } from '@/core/outer.js';
import { gameManager, inputState, settings } from '@/core/state.js';
import { gameObjects, inputCommands } from '@/utils/constants.js';

let lastReloadTime = 0;
const RELOAD_COOLDOWN = 500;

/**
 * Vérifie si le jeu est prêt
 */
function isGameReady() {
  const game = gameManager?.game;
  if (!game?.initialized) return false;

  const player = game[translations.activePlayer_];
  return player?.[translations.localData_]?.[translations.curWeapIdx_] != null;
}

/**
 * Lit les munitions depuis l'UI HTML du jeu
 * Format: ".50 AE\nAmmo for DEagle 50.\n0\n..."
 */
function getAmmoFromUI() {
  try {
    const doc = outer.document;

    // Utiliser .ui-ammo qui contient toutes les infos
    const ammoEl = doc.querySelector(".ui-ammo");
    if (ammoEl) {
      const text = ammoEl.textContent || '';
      const lines = text.split('\n').map(l => l.trim()).filter(l => l);

      // Chercher les nombres dans le texte
      // Format typique: ["50 AE", "Ammo for DEagle 50.", "0", "", ""]
      // Le chiffre seul est généralement les munitions dans le chargeur
      for (const line of lines) {
        // Si c'est juste un nombre, c'est probablement le count
        if (/^\d+$/.test(line)) {
          return {
            current: parseInt(line),
            reserve: -1, // On ne peut pas facilement distinguer
          };
        }
      }
    }

    // Alternative: chercher dans les éléments enfants
    const ammoCount = doc.querySelector(".ui-ammo-count");
    if (ammoCount) {
      const text = ammoCount.textContent || '';
      const match = text.match(/(\d+)/);
      if (match) {
        return {
          current: parseInt(match[1]),
          reserve: -1,
        };
      }
    }

  } catch (e) {
    console.log('AutoReload: Error reading ammo', e);
  }
  return { current: -1, reserve: -1 };
}

/**
 * Récupère les infos de l'arme actuelle depuis le jeu
 */
function getWeaponInfo() {
  try {
    const game = gameManager.game;
    const player = game[translations.activePlayer_];
    const localData = player[translations.localData_];
    const netData = player[translations.netData_];

    // Index de l'arme actuelle
    const weaponIdx = localData[translations.curWeapIdx_];

    // Pas de reload pour melee (2) ou grenade (3)
    if (weaponIdx === 2 || weaponIdx === 3) {
      return null;
    }

    // Nom de l'arme active
    const activeWeapon = netData[translations.activeWeapon_];
    if (!activeWeapon) return null;

    // Infos de l'arme depuis gameObjects
    const weaponData = gameObjects?.[activeWeapon];
    if (!weaponData || weaponData.type !== 'gun') return null;

    const maxClip = weaponData.maxClip ?? 30;

    // Lire les munitions depuis localData
    const weapons = localData[translations.weapons_];
    let ammoInClip = -1;

    if (weapons && weapons[weaponIdx]) {
      const currentWeapon = weapons[weaponIdx];
      ammoInClip = currentWeapon.ammo ?? -1;
    }

    // Si on n'a pas pu lire depuis le jeu, essayer l'UI
    if (ammoInClip < 0) {
      const uiAmmo = getAmmoFromUI();
      ammoInClip = uiAmmo.current;
    }

    return {
      name: activeWeapon,
      ammoInClip: ammoInClip,
      maxClip: maxClip,
      weaponIdx,
    };
  } catch (e) {
    return null;
  }
}

/**
 * Vérifie si le joueur est en train de recharger ou faire une action
 */
function isDoingAction() {
  try {
    const game = gameManager.game;
    const player = game[translations.activePlayer_];

    // Vérifier via les propriétés du joueur
    if (player.action && player.action.type) {
      return true;
    }

    // Vérifier l'UI
    const doc = outer.document;
    const actionIndicator = doc.querySelector("#ui-current-action");
    if (actionIndicator) {
      const display = actionIndicator.style.display;
      const opacity = actionIndicator.style.opacity;
      if (display !== 'none' && opacity !== '0') {
        return true;
      }
    }
  } catch (e) { }
  return false;
}

/**
 * Vérifie si le joueur peut recharger
 */
function canReload() {
  try {
    const game = gameManager.game;
    const player = game[translations.activePlayer_];

    // Pas de reload si mort ou downed
    if (player.dead || player.downed) return false;

    // Pas de reload si déjà en action
    if (isDoingAction()) return false;

    // Cooldown
    const now = Date.now();
    if (now - lastReloadTime < RELOAD_COOLDOWN) return false;

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Lance le rechargement
 */
function triggerReload() {
  lastReloadTime = Date.now();
  console.log('🔄 AutoReload: Reloading...');
  inputState.queuedInputs_.push(inputCommands.Reload_);
}

/**
 * Logique principale d'auto-reload
 */
function autoReloadTick() {
  try {
    // Vérifier si activé
    if (!settings.autoReload_?.enabled_) return;

    // Vérifier si le jeu est prêt
    if (!isGameReady()) return;

    // Vérifier si on peut recharger
    if (!canReload()) return;

    // Récupérer les infos de l'arme
    const weaponInfo = getWeaponInfo();
    if (!weaponInfo) return;

    const { ammoInClip, maxClip } = weaponInfo;

    // Pas de reload si données invalides
    if (ammoInClip < 0 || maxClip <= 0) return;

    // Pas de reload si le chargeur est plein
    if (ammoInClip >= maxClip) return;

    // Seuil de rechargement
    const reloadThreshold = settings.autoReload_.threshold_ ?? 30;
    const clipPercent = (ammoInClip / maxClip) * 100;

    // === MODE 1: Recharger seulement quand vide ===
    if (settings.autoReload_.onlyWhenEmpty_) {
      if (ammoInClip === 0) {
        triggerReload();
      }
      return;
    }

    // === MODE 2: Recharger sous le seuil ===
    if (clipPercent <= reloadThreshold) {
      triggerReload();
    }

  } catch (e) {
    // Silently fail
  }
}

/**
 * Initialisation
 */
let initialized = false;

export default function init() {
  if (initialized) return;
  initialized = true;

  // Lancer le tick toutes les 150ms
  setInterval(autoReloadTick, 150);

  console.log('🟢 AutoReload initialized');
}