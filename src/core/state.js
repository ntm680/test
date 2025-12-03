import { encryptDecrypt } from '@/utils/crypto.js';
import { initStore, write } from '@/utils/store.js';
import { outer } from '@/core/outer.js';

export const aimState = {
  lastAimPos_: null,
  aimTouchMoveDir_: null,
  aimTouchDistanceToEnemy_: null,
  reset() {
    this.lastAimPos_ = null;
    this.aimTouchMoveDir_ = null;
    this.aimTouchDistanceToEnemy_ = null;
  },
};

export const inputState = {
  queuedInputs_: [],
  toMouseLen_: 0,
};

export let gameManager;
export const setGameManager = (gm) => {
  gameManager = gm;
  if (DEV) {
    try {
      outer.gameManager = gm;
    } catch { }
  }
};

export const defaultSettings = {
  aimbot_: {
    enabled_: true,
    smooth_: 50,
    targetKnocked_: true,
    stickyTarget_: true,
    showDot_: true,
    wallcheck_: true,
    fov_: 80,
    showFov_: true,
  },
  meleeLock_: {
    enabled_: true,
    autoMelee_: false,
  },
  mobileMovement_: {
    enabled_: false,
    smooth_: 50,
  },
  autoFire_: {
    enabled_: true,
  },
  xray_: {
    enabled_: true,
    smokeOpacity_: 50,
    darkerSmokes_: true,
    treeOpacity_: 50,
    removeCeilings_: true,
  },
  esp_: {
    visibleNametags_: true,
    enabled_: true,
    players_: true,
    grenades_: {
      explosions_: true,
      trajectory_: true,
    },
    flashlights_: {
      own_: true,
      others_: true,
      trajectory_: true,
    },
  },
  autoLoot_: {
    enabled_: true,
  },
  mapHighlights_: {
    enabled_: true,
    smallerTrees_: true,
  },
  infiniteZoom_: {
    enabled_: true,
  },
  autoSwitch_: {
    enabled_: true,
    useOneGun_: false,
  },
  weaponSwitch_: {
    enabled_: false,
    // Shotguns
    mp220_: true,
    spas12_: true,
    m870_: false,
    saiga_: false,
    super90_: false,
    usas_: false,
    m1100_: false,
    // Snipers
    mosin_: true,
    sv98_: true,
    awc_: true,
    scout_: false,
    model94_: false,
    blr_: false,
    // DMRs
    mk12_: false,
    mk20_: false,
    m39_: false,
    svd_: false,
    garand_: false,
    // Pistolets
    ot38_: true,
    ots38_: true,
    deagle_: true,
    m9_: false,
    m93r_: false,
    m1911_: false,
    p30l_: false,
    flare_gun_: false,
    peacemaker_: false,
    // Autres
    groza_: false,
    grozas_: false,
    an94_: false,
    m1a1_: false,
  },
  layerSpoof_: {
    enabled_: true,
  },
  keybinds_: {
    toggleMenu_: 'ShiftRight',
    toggleAimbot_: 'KeyB',
    toggleStickyTarget_: 'KeyN',
    toggleLayerSpoof_: 'KeyT',
  },
  misc_: {
    discordNotifShown_: false,
  },
  damageCounter_: {
    enabled_: true,
  },
};

const settingsKeys = {
  aimbot_: {
    _k: 'ab',
    enabled_: 'e',
    smooth_: 's',
    targetKnocked_: 'tk',
    stickyTarget_: 'st',
    showDot_: 'sd',
    wallcheck_: 'wc',
    fov_: 'fv',
    showFov_: 'sf',
  },
  meleeLock_: {
    _k: 'ml',
    enabled_: 'e',
    autoMelee_: 'am',
  },
  mobileMovement_: {
    _k: 'mm',
    enabled_: 'e',
    smooth_: 's',
  },
  autoFire_: {
    _k: 'af',
    enabled_: 'e',
  },
  xray_: {
    _k: 'xr',
    enabled_: 'e',
    smokeOpacity_: 'so',
    treeOpacity_: 'to',
    removeCeilings_: 'rc',
    darkerSmokes_: 'ds',
  },
  esp_: {
    _k: 'es',
    visibleNametags_: 'vn',
    enabled_: 'e',
    players_: 'p',
    flashlights_: {
      _k: 'fl',
      own_: 'o',
      others_: 'ot',
      trajectory_: 't',
    },
    grenades_: {
      _k: 'gr',
      explosions_: 'ex',
      trajectory_: 't',
    },
  },
  mapHighlights_: {
    _k: 'mh',
    enabled_: 'e',
    smallerTrees_: 'st',
  },
  autoLoot_: {
    _k: 'al',
    enabled_: 'e',
  },
  infiniteZoom_: {
    _k: 'iz',
    enabled_: 'e',
  },
  autoSwitch_: {
    _k: 'as',
    enabled_: 'e',
    useOneGun_: 'uo',
  },
  weaponSwitch_: {
    _k: 'ws',
    enabled_: 'e',
    mp220_: 'a1',
    spas12_: 'a2',
    m870_: 'a3',
    saiga_: 'a4',
    super90_: 'a5',
    usas_: 'a6',
    m1100_: 'a7',
    mosin_: 'b1',
    sv98_: 'b2',
    awc_: 'b3',
    scout_: 'b4',
    model94_: 'b5',
    blr_: 'b6',
    mk12_: 'c1',
    mk20_: 'c2',
    m39_: 'c3',
    svd_: 'c4',
    garand_: 'c5',
    ot38_: 'd1',
    ots38_: 'd2',
    deagle_: 'd3',
    m9_: 'd4',
    m93r_: 'd5',
    m1911_: 'd6',
    p30l_: 'd7',
    flare_gun_: 'd8',
    peacemaker_: 'd9',
    groza_: 'e1',
    grozas_: 'e2',
    an94_: 'e3',
    m1a1_: 'e4',
  },
  layerSpoof_: {
    _k: 'ls',
    enabled_: 'e',
  },
  keybinds_: {
    _k: 'kb',
    toggleMenu_: 'tm',
    toggleAimbot_: 'ta',
    toggleStickyTarget_: 'ts',
    toggleLayerSpoof_: 'tl',
  },
  misc_: {
    _k: 'mi',
    discordNotifShown_: 'dn',
  },
  damageCounter_: {
    _k: 'dc',
    enabled_: 'e',
  },
};

const createSettings = (keys, defaults) => {
  const store = {};
  const obj = {};

  const build = (k, d, storePath) => {
    const result = {};
    for (const prop in k) {
      if (prop === '_k') continue;
      const key = k[prop];
      const defaultVal = d?.[prop];
      if (typeof key === 'object' && key._k) {
        result[prop] = build(key, defaultVal, storePath + '.' + prop);
      } else {
        const fullPath = storePath + '.' + prop;
        if (typeof defaultVal === 'number') {
          store[fullPath] = defaultVal;
        } else if (typeof defaultVal === 'string') {
          store[fullPath] = defaultVal;
        } else {
          store[fullPath] = Boolean(defaultVal);
        }
        Object.defineProperty(result, prop, {
          get() {
            return store[fullPath];
          },
          set(v) {
            if (typeof store[fullPath] === 'number') {
              store[fullPath] = typeof v === 'number' ? v : 0;
            } else if (typeof store[fullPath] === 'string') {
              store[fullPath] = typeof v === 'string' ? v : '';
            } else {
              store[fullPath] = Boolean(v);
            }
          },
          enumerable: true,
        });
      }
    }
    return result;
  };

  for (const topKey in keys) {
    obj[topKey] = build(keys[topKey], defaults[topKey], topKey);
  }

  const serialize = () => {
    const serializeGroup = (k, prefix) => {
      const result = {};
      for (const prop in k) {
        if (prop === '_k') continue;
        const key = k[prop];
        if (typeof key === 'object' && key._k) {
          result[key._k] = serializeGroup(key, prefix + '.' + prop);
        } else {
          const fullPath = prefix + '.' + prop;
          result[key] = store[fullPath];
        }
      }
      return result;
    };

    const result = {};
    for (const topKey in keys) {
      result[keys[topKey]._k] = serializeGroup(keys[topKey], topKey);
    }
    return result;
  };

  const deserialize = (data) => {
    if (!data || typeof data !== 'object') return;

    const deserializeGroup = (k, d, prefix) => {
      if (!d || typeof d !== 'object') return;
      for (const prop in k) {
        if (prop === '_k') continue;
        const key = k[prop];
        if (typeof key === 'object' && key._k) {
          const nested = d[key._k];
          deserializeGroup(key, nested, prefix + '.' + prop);
        } else {
          const value = d[key];
          if (value !== undefined) {
            const fullPath = prefix + '.' + prop;
            if (typeof store[fullPath] === 'number') {
              store[fullPath] = typeof value === 'number' ? value : 0;
            } else if (typeof store[fullPath] === 'string') {
              store[fullPath] = typeof value === 'string' ? value : '';
            } else {
              store[fullPath] = Boolean(value);
            }
          }
        }
      }
    };

    for (const topKey in keys) {
      const topData = data[keys[topKey]._k];
      deserializeGroup(keys[topKey], topData, topKey);
    }
  };

  obj._serialize = serialize;
  obj._deserialize = deserialize;

  return obj;
};

export const settings = createSettings(settingsKeys, defaultSettings);

let uiRoot;

export const setUIRoot = (root) => {
  uiRoot = root;
};

export const getUIRoot = () => uiRoot;

let configLoaded = false;
let isUpdatingConfig = false;
let lastConfig;
const stringify = JSON.stringify;
let updateTimer = null;

export const markConfigLoaded = () => {
  configLoaded = true;
};

export const isConfigLoaded = () => configLoaded;

const updateConfig = () => {
  if (!configLoaded || isUpdatingConfig) return;
  isUpdatingConfig = true;

  initStore();

  const serialized = settings._serialize();
  const config = stringify(serialized);
  if (config !== lastConfig) {
    const encrypted = encryptDecrypt(config);
    const success = write(encrypted);
    if (success) {
      lastConfig = config;
    }
  }
  isUpdatingConfig = false;
};

export const startConfigPersistence = () => {
  if (updateTimer === null) {
    initStore();
    updateTimer = setInterval(() => {
      updateConfig();
    }, 250);
  }
};

export const loadSettings = (data) => {
  if (data && typeof data === 'object') {
    settings._deserialize(data);
  }
};

startConfigPersistence();