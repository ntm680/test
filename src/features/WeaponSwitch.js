import { gameManager, settings, inputState } from '@/core/state.js';
import { inputCommands, isGameReady } from '@/utils/constants.js';
import { translations } from '@/core/obfuscatedNameTranslator.js';

const WEAPON_COMMANDS = [inputCommands.EquipPrimary_, inputCommands.EquipSecondary_];

const weaponState = [
  { ammo_: null, type_: '', lastSwitchTime_: 0 },
  { ammo_: null, type_: '', lastSwitchTime_: 0 },
];

// Map des armes avec tous les noms possibles
const WEAPON_MAP = {
  // Shotguns
  'mp220_': ['mp220'],
  'spas12_': ['spas12', 'spas-12', 'spas'],
  'm870_': ['m870'],
  'saiga_': ['saiga', 'saiga12', 'saiga-12'],
  'super90_': ['super90', 'super_90', 'super 90'],
  'usas_': ['usas', 'usas12', 'usas-12'],
  'm1100_': ['m1100'],
  // Snipers
  'mosin_': ['mosin', 'mosin_nagant', 'mosinnagant'],
  'sv98_': ['sv98', 'sv-98'],
  'awc_': ['awc', 'awm', 'awm-s', 'awms', 'awc-s'],
  'scout_': ['scout', 'scout_elite', 'scoutelite'],
  'model94_': ['model94', 'model_94', 'model 94', 'm94'],
  'blr_': ['blr', 'blr81', 'blr_81', 'blr 81'],
  // DMRs
  'mk12_': ['mk12', 'mk_12', 'mk 12', 'mk12spr'],
  'mk20_': ['mk20', 'mk_20', 'mk 20', 'mk20ssr'],
  'm39_': ['m39', 'm39emr', 'm39_emr'],
  'svd_': ['svd', 'svd63', 'svd-63', 'svd_63'],
  'garand_': ['garand', 'm1garand', 'm1_garand'],
  // Pistols
  'ot38_': ['ot38', 'ot-38', 'ot_38'],
  'ots38_': ['ots38', 'ots-38', 'ots_38'],
  'deagle_': ['deagle', 'desert_eagle', 'deserteagle', 'desert eagle'],
  'm9_': ['m9'],
  'm93r_': ['m93r', 'm93-r', 'm93_r'],
  'm1911_': ['m1911', 'm_1911'],
  'p30l_': ['p30l', 'p30-l', 'p30_l'],
  'flare_gun_': ['flare_gun', 'flare', 'flaregun'],
  'peacemaker_': ['peacemaker', 'peace_maker', 'colt_peacemaker'],
  // Others
  'groza_': ['groza'],
  'grozas_': ['grozas', 'groza-s', 'groza_s'],
  'an94_': ['an94', 'an-94', 'an_94'],
  'm1a1_': ['m1a1', 'm1-a1', 'm1_a1'],
};

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

const isWeaponEnabled = (weaponType) => {
  if (!weaponType) return false;
  const type = weaponType.toLowerCase().replace(/[-\s]/g, '_');

  for (const [settingKey, aliases] of Object.entries(WEAPON_MAP)) {
    for (const alias of aliases) {
      if (type.includes(alias) || type === alias) {
        const enabled = settings.weaponSwitch_?.[settingKey] === true;
        return enabled;
      }
    }
  }
  return false;
};

export const isHandledByWeaponSwitch = (weaponType) => {
  if (!settings.weaponSwitch_?.enabled_) return false;
  return isWeaponEnabled(weaponType);
};

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

const handleWeaponSwitch = () => {
  if (!isGameReady() || !settings.weaponSwitch_?.enabled_) return;

  try {
    const game = gameManager.game;
    const player = game[translations.activePlayer_];
    const localData = player[translations.localData_];
    const currentWeaponIndex = localData[translations.curWeapIdx_];

    if (currentWeaponIndex !== 0 && currentWeaponIndex !== 1) return;

    const weapons = localData[translations.weapons_];
    const currentWeapon = weapons[currentWeaponIndex];
    const currentWeaponState = weaponState[currentWeaponIndex];

    const now = Date.now();
    if (now - currentWeaponState.lastSwitchTime_ < 150) {
      currentWeaponState.ammo_ = currentWeapon.ammo;
      currentWeaponState.type_ = currentWeapon.type;
      return;
    }

    if (currentWeapon.ammo === currentWeaponState.ammo_) return;

    const otherWeaponIndex = getAlternateWeaponIndex(currentWeaponIndex);
    const otherWeapon = weapons[otherWeaponIndex];

    const hasFired = currentWeapon.ammo < currentWeaponState.ammo_;

    const shouldSwitch =
      isWeaponEnabled(currentWeapon.type) &&
      currentWeapon.type === currentWeaponState.type_ &&
      hasFired;

    if (shouldSwitch) {
      currentWeaponState.lastSwitchTime_ = now;
      weaponState[otherWeaponIndex].lastSwitchTime_ = now;

      if (isWeaponEnabled(otherWeapon.type) && otherWeapon.ammo > 0) {
        queueWeaponSwitch(otherWeaponIndex);
      } else if (otherWeapon.type !== '') {
        queueWeaponCycleAndBack(otherWeaponIndex, currentWeaponIndex);
      } else {
        queueMeleeCycleAndBack(currentWeaponIndex);
      }
    }

    currentWeaponState.ammo_ = currentWeapon.ammo;
    currentWeaponState.type_ = currentWeapon.type;
  } catch { }
};

let initialized = false;

export default function () {
  if (initialized) return;
  initialized = true;

  const checkReady = setInterval(() => {
    if (gameManager?.pixi?._ticker) {
      clearInterval(checkReady);
      gameManager.pixi._ticker.add(handleWeaponSwitch);
    }
  }, 100);
}