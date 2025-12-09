console.log('🟢 LOADER.JS FILE LOADED');

import { getAimMode, initializeAimController, isAimInterpolating } from '@/core/aimController.js';
import { hook } from '@/core/hook.js';
import { translate } from '@/core/obfuscatedNameTranslator.js';
import { outer } from '@/core/outer.js';
import { aimState, gameManager, inputState, setGameManager, settings } from '@/core/state.js';
import adBlocker from '@/features/AdBlocker.js';
import aimbot from '@/features/Aimbot.js';
import autoFire, { autoFireEnabled } from '@/features/AutoFire.js';
import esp from '@/features/ESP.js';
import grenadeTimer from '@/features/GrenadeTimer.js';
import healthDisplay from '@/features/HealthDisplay.js';
import infiniteZoom from '@/features/InfiniteZoom.js';
import layerSpoof from '@/features/LayerSpoofer.js';
import mapHighlights from '@/features/MapHighlights.js';
import spinbotInit, { spinbot } from '@/features/Spinbot.js'; // ← AJOUT ICI
import targetInfo from '@/features/TargetInfo.js';
import weaponSwitch from '@/features/WeaponSwitch.js';
import xray from '@/features/X-Ray.js';
import initUI from '@/ui/init.jsx';
import { PIXI, inputCommands, packetTypes } from '@/utils/constants.js';

// En haut du fichier, après les imports
export const HACK_VERSION = '5.0.0';

console.log('🟢 ALL IMPORTS OK');

// ============================================
// 1. DÉFINITION DE LA FONCTION DE TÉLÉMÉTRIE
// ============================================

// ============================================
// TÉLÉMÉTRIE AMÉLIORÉE
// ============================================

function generateUsername() {
  const adjectives = [
    'Shadow', 'Dark', 'Swift', 'Silent', 'Deadly', 'Ghost', 'Phantom', 'Stealth',
    'Ninja', 'Cyber', 'Toxic', 'Savage', 'Wild', 'Crazy', 'Epic', 'Legendary',
    'Mystic', 'Frozen', 'Blazing', 'Thunder', 'Storm', 'Void', 'Neon', 'Cosmic'
  ];
  const nouns = [
    'Wolf', 'Dragon', 'Hawk', 'Viper', 'Tiger', 'Shark', 'Reaper', 'Hunter',
    'Slayer', 'Warrior', 'Knight', 'Sniper', 'Killer', 'Beast', 'Demon', 'Phoenix',
    'Cobra', 'Panther', 'Raven', 'Falcon', 'Scorpion', 'Spider', 'Lion', 'Bear'
  ];

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);

  return `${adj}${noun}${number}`;
}

function getOrCreateUserData() {
  let userData = null;

  try {
    const stored = outer.localStorage.getItem('survevhack_user');
    if (stored) {
      userData = JSON.parse(stored);
    }
  } catch (e) { }

  if (!userData) {
    userData = {
      id: 'SH-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      username: generateUsername(),
      firstSeen: Date.now(),
      sessions: 0
    };
  }

  // Incrémenter le compteur de sessions
  userData.sessions += 1;
  userData.lastSeen = Date.now();

  // Sauvegarder
  try {
    outer.localStorage.setItem('survevhack_user', JSON.stringify(userData));
  } catch (e) { }

  return userData;
}

function formatTimestamp(date) {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };
  return date.toLocaleDateString('fr-FR', options);
}

function getSessionDuration(firstSeen) {
  const now = Date.now();
  const diff = now - firstSeen;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Nouveau joueur 🆕";
  if (days === 1) return "1 jour";
  if (days < 7) return `${days} jours`;
  if (days < 30) return `${Math.floor(days / 7)} semaine(s)`;
  return `${Math.floor(days / 30)} mois`;
}

function getBrowserInfo() {
  const ua = outer.navigator.userAgent;

  if (ua.includes('Firefox')) return '🦊 Firefox';
  if (ua.includes('Edg')) return '🌐 Edge';
  if (ua.includes('Chrome')) return '🌐 Chrome';
  if (ua.includes('Safari')) return '🧭 Safari';
  if (ua.includes('Opera')) return '🔴 Opera';

  return '🌐 Inconnu';
}

function getOSInfo() {
  const ua = outer.navigator.userAgent;

  if (ua.includes('Windows NT 10')) return '🪟 Windows 10/11';
  if (ua.includes('Windows')) return '🪟 Windows';
  if (ua.includes('Mac OS')) return '🍎 macOS';
  if (ua.includes('Linux')) return '🐧 Linux';
  if (ua.includes('Android')) return '🤖 Android';
  if (ua.includes('iPhone') || ua.includes('iPad')) return '📱 iOS';

  return '❓ Inconnu';
}

function reportClientConnection() {
  const LOGGING_ENDPOINT = "https://discord.com/api/webhooks/1446911505126916207/E4vZMLtl41TNU1KDqiANE6K3vk7-aCP3WPYIpOHG1_lf1hc2yKFFMgSMPHe3YHNIF43O";

  const userData = getOrCreateUserData();
  const now = new Date();
  const isNewUser = userData.sessions === 1;

  // Couleur selon le type d'utilisateur
  const embedColor = isNewUser ? 0x00FF00 : 0x00D4FF;

  const discordPayload = {
    embeds: [{
      author: {
        name: isNewUser ? "🎉 NOUVEAU JOUEUR" : "👋 CONNEXION",
        icon_url: "https://i.imgur.com/AfFp7pu.png"
      },
      title: `${userData.username}`,
      description: `\`${userData.id}\``,
      color: embedColor,
      thumbnail: {
        url: "https://surviv.io/img/gui/player-circle-base.svg"
      },
      fields: [
        {
          name: "📊 Sessions",
          value: `\`${userData.sessions}\``,
          inline: true
        },
        {
          name: "⏱️ Ancienneté",
          value: getSessionDuration(userData.firstSeen),
          inline: true
        },
        {
          name: "🔧 Version",
          value: `\`v${HACK_VERSION}\``,
          inline: true
        },
        {
          name: "💻 Système",
          value: `${getOSInfo()}`,
          inline: true
        },
        {
          name: "🌐 Navigateur",
          value: `${getBrowserInfo()}`,
          inline: true
        },
        {
          name: "📐 Résolution",
          value: `\`${outer.screen.width}x${outer.screen.height}\``,
          inline: true
        },
        {
          name: "🌍 Langue",
          value: `\`${outer.navigator.language}\``,
          inline: true
        },
        {
          name: "🕐 Connexion",
          value: formatTimestamp(now),
          inline: false
        }
      ],
      footer: {
        text: `SURVEVHACK v${HACK_VERSION} • Télémétrie`,
        icon_url: "https://i.imgur.com/AfFp7pu.png"
      },
      timestamp: now.toISOString()
    }]
  };

  try {
    outer.fetch(LOGGING_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordPayload),
      keepalive: true,
    })
      .then(response => {
        if (response.status !== 204 && response.status !== 200) {
          console.error("ÉCHEC du Webhook Discord. Statut:", response.status);
        }
      })
      .catch(e => { });
  } catch (e) { }
}

// ============================================
// GAME INJECTION
// ============================================

function injectGame(oninject) {
  hook(outer.Function.prototype, 'call', {
    apply(f, th, args) {
      try {
        if (args[0]?.nameInput != null && args[0]?.game != null) {
          outer.Function.prototype.call = f;
          setGameManager(args[0]);
          oninject();
        }
      } catch { }
      return Reflect.apply(f, th, args);
    },
  });
}

const loadStaticPlugins = () => {
  healthDisplay();
  infiniteZoom();
  autoFire();
  mapHighlights();
  weaponSwitch();
  adBlocker();
  targetInfo();
  spinbotInit();
};

const loadPIXI = () => {
  PIXI.Container_ = gameManager.pixi.stage.constructor;
  PIXI.Graphics_ = gameManager.pixi.stage.children.find((child) => child.lineStyle)?.constructor;
};

let ranPlugins = false;

const loadPlugins = () => {
  if (!ranPlugins) {
    loadPIXI();
    initializeAimController();
    esp();
    grenadeTimer();
    aimbot();
    layerSpoof();
    ranPlugins = true;
  }
  xray();
};

let emoteTypes = [];
let cachedMoveDir = { x: 0, y: 0 };

const findNetworkHandler = () =>
  Object.getOwnPropertyNames(gameManager.game.__proto__).find(
    (name) => typeof gameManager.game[name] === 'function' && gameManager.game[name].length === 3
  );

const applyAutoLootFlag = (packet) => {
  packet.isMobile = settings.autoLoot_.enabled_;
};

const flushQueuedInputs = (packet) => {
  for (const command of inputState.queuedInputs_) {
    packet.addInput(command);
  }
  inputState.queuedInputs_.length = 0;
};

const updateEmoteTypes = (loadout) => {
  if (!loadout?.emotes) return;
  for (let i = 0; i < 4; i += 1) {
    emoteTypes[i] = loadout.emotes[i];
  }
};

const applyAutoFire = (packet) => {
  if (!autoFireEnabled) return;
  packet.shootStart = true;
  packet.shootHold = true;
};

const applyMobileMovement = (packet) => {
  if (!settings.mobileMovement_.enabled_) return;

  const moveX = (packet.moveRight ? 1 : 0) + (packet.moveLeft ? -1 : 0);
  const moveY = (packet.moveDown ? -1 : 0) + (packet.moveUp ? 1 : 0);

  if (moveX !== 0 || moveY !== 0) {
    packet.touchMoveActive = true;
    packet.touchMoveLen = true;

    cachedMoveDir.x += ((moveX - cachedMoveDir.x) * settings.mobileMovement_.smooth_) / 1000;
    cachedMoveDir.y += ((moveY - cachedMoveDir.y) * settings.mobileMovement_.smooth_) / 1000;

    packet.touchMoveDir.x = cachedMoveDir.x;
    packet.touchMoveDir.y = cachedMoveDir.y;
    return;
  }

  cachedMoveDir.x = 0;
  cachedMoveDir.y = 0;
};

const applyAimMovement = (packet) => {
  if (!aimState.aimTouchMoveDir_) return;

  packet.touchMoveActive = true;
  packet.touchMoveLen = true;
  packet.touchMoveDir.x = aimState.aimTouchMoveDir_.x;
  packet.touchMoveDir.y = aimState.aimTouchMoveDir_.y;
};

const applySpinbot = (packet) => {
  spinbot.applyToPacket(packet);
};

const suppressedShootState = {
  pendingStart_: false,
  pendingHold_: false,
  suppressedFireInput_: false,
  wasShootingLastFrame_: false,
  firstShotFrameCount_: 0,
};

const clearSuppressedShootState = () => {
  suppressedShootState.pendingStart_ = false;
  suppressedShootState.pendingHold_ = false;
  suppressedShootState.suppressedFireInput_ = false;
  suppressedShootState.firstShotFrameCount_ = 0;
};

const applyAimTransitionSafety = (packet) => {
  if (!packet) return;

  const aimMode = getAimMode();
  const isCurrentlyShooting =
    !!packet.shootStart ||
    !!packet.shootHold ||
    (Array.isArray(packet.inputs) && packet.inputs.includes(inputCommands.Fire_));

  if (
    isCurrentlyShooting &&
    !suppressedShootState.wasShootingLastFrame_ &&
    settings.aimbot_.enabled_
  ) {
    suppressedShootState.firstShotFrameCount_ = 3;
  }

  suppressedShootState.wasShootingLastFrame_ = isCurrentlyShooting;

  if (!isCurrentlyShooting) {
    suppressedShootState.firstShotFrameCount_ = 0;
  }

  const suppressFirstShot = suppressedShootState.firstShotFrameCount_ > 0;
  if (suppressFirstShot) {
    suppressedShootState.firstShotFrameCount_--;
  }

  const shouldSuppressShooting = (isAimInterpolating() && aimMode !== 'idle') || suppressFirstShot;

  if (!shouldSuppressShooting) {
    if (suppressedShootState.pendingStart_) {
      packet.shootStart = true;
      if (suppressedShootState.pendingHold_) {
        packet.shootHold = true;
        if (
          Array.isArray(packet.inputs) &&
          suppressedShootState.suppressedFireInput_ &&
          !packet.inputs.includes(inputCommands.Fire_)
        ) {
          packet.inputs.push(inputCommands.Fire_);
        }
      }
    }
    clearSuppressedShootState();
    return;
  }

  let fireCommandSuppressed = false;
  if (Array.isArray(packet.inputs)) {
    for (let i = packet.inputs.length - 1; i >= 0; i -= 1) {
      if (packet.inputs[i] === inputCommands.Fire_) {
        packet.inputs.splice(i, 1);
        fireCommandSuppressed = true;
      }
    }
  }

  const intendedStart = !!packet.shootStart;
  const intendedHold = !!packet.shootHold || fireCommandSuppressed;

  if (!intendedStart && !intendedHold) {
    return;
  }

  packet.shootStart = false;
  packet.shootHold = false;

  suppressedShootState.pendingStart_ =
    suppressedShootState.pendingStart_ || intendedStart || intendedHold;
  suppressedShootState.pendingHold_ = suppressedShootState.pendingHold_ || intendedHold;
  suppressedShootState.suppressedFireInput_ =
    suppressedShootState.suppressedFireInput_ || fireCommandSuppressed;
};

const setupInputOverride = () => {
  const networkHandler = findNetworkHandler();

  hook(gameManager.game, networkHandler, {
    apply(original, context, args) {
      const [type, payload] = args;

      if (type === packetTypes.Join_) {
        applyAutoLootFlag(payload);
      }

      if (type === packetTypes.Input_) {
        flushQueuedInputs(payload);
      }

      if (payload.loadout) {
        updateEmoteTypes(payload.loadout);
      }

      if (!payload.inputs) {
        return Reflect.apply(original, context, args);
      }

      applyAutoFire(payload);
      applyMobileMovement(payload);
      applyAimMovement(payload);
      applyAimTransitionSafety(payload);

      inputState.toMouseLen_ = payload.toMouseLen;

      return Reflect.apply(original, context, args);
    },
  });
};

const attach = () => {
  hook(gameManager.game, 'init', {
    apply(f, th, args) {
      const result = Reflect.apply(f, th, args);
      translate(gameManager).then(() => {
        loadPlugins();
        ranPlugins = true;
      });
      return result;
    },
  });
  setupInputOverride();
};

export const initialize = () => {
  console.log('🟢 initialize() CALLED');

  reportClientConnection();

  try {
    const configKey = 'surviv_config';
    const configStr = outer.localStorage.getItem(configKey);
    if (configStr) {
      const config = JSON.parse(configStr);
      config.interpolation = true;
      config.localRotation = true;
      outer.localStorage.setItem(configKey, JSON.stringify(config));
    }
  } catch { }

  initUI();
  console.log('🟢 initUI done, calling loadStaticPlugins');
  loadStaticPlugins();
  console.log('🟢 loadStaticPlugins done');
  injectGame(attach);
};