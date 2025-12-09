/**
 * =============================================
 * AUTO HEAL - Utilise automatiquement les soins
 * =============================================
 */

import { translations } from '@/core/obfuscatedNameTranslator.js';
import { outer } from '@/core/outer.js';
import { gameManager, inputState, settings } from '@/core/state.js';
import { inputCommands } from '@/utils/constants.js';

let lastHealTime = 0;
const HEAL_COOLDOWN = 1500; // 1.5 seconde entre chaque tentative

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
 * Lit la santé depuis l'UI HTML du jeu
 */
function getHealthFromUI() {
  try {
    const doc = outer.document;
    const healthBar = doc.querySelector("#ui-health-actual");
    if (healthBar) {
      // Essayer style.width d'abord
      let width = healthBar.style.width;
      if (width && width.includes('%')) {
        return Math.round(parseFloat(width));
      }
      // Sinon utiliser getComputedStyle
      const computed = outer.getComputedStyle(healthBar);
      const parent = healthBar.parentElement;
      if (parent && computed.width) {
        const barWidth = parseFloat(computed.width);
        const parentWidth = parseFloat(outer.getComputedStyle(parent).width);
        if (parentWidth > 0) {
          return Math.round((barWidth / parentWidth) * 100);
        }
      }
    }
  } catch (e) {
    console.log('AutoHeal: Error reading health', e);
  }
  return 100;
}

/**
 * Lit le boost depuis l'UI HTML du jeu
 */
function getBoostFromUI() {
  try {
    const doc = outer.document;
    const boostBars = doc.querySelectorAll("#ui-boost-counter .ui-boost-base .ui-bar-inner");
    let totalBoost = 0;
    const weights = [25, 25, 40, 10];

    boostBars.forEach((bar, index) => {
      let width = parseFloat(bar.style.width);
      if (isNaN(width)) {
        const computed = outer.getComputedStyle(bar);
        const parent = bar.parentElement;
        if (parent && computed.width) {
          const barWidth = parseFloat(computed.width);
          const parentWidth = parseFloat(outer.getComputedStyle(parent).width);
          if (parentWidth > 0) {
            width = (barWidth / parentWidth) * 100;
          }
        }
      }
      if (!isNaN(width)) {
        totalBoost += width * (weights[index] / 100);
      }
    });

    return Math.round(totalBoost);
  } catch (e) { }
  return 100;
}

/**
 * Lit l'inventaire depuis l'UI HTML du jeu
 */
function getInventoryFromUI() {
  try {
    const doc = outer.document;
    const inventory = {
      bandage: 0,
      healthkit: 0,
      soda: 0,
      painkiller: 0,
    };

    // Bandage
    const bandageEl = doc.querySelector("#ui-loot-bandage .ui-loot-count");
    if (bandageEl) inventory.bandage = parseInt(bandageEl.textContent) || 0;

    // Healthkit
    const healthkitEl = doc.querySelector("#ui-loot-healthkit .ui-loot-count");
    if (healthkitEl) inventory.healthkit = parseInt(healthkitEl.textContent) || 0;

    // Soda
    const sodaEl = doc.querySelector("#ui-loot-soda .ui-loot-count");
    if (sodaEl) inventory.soda = parseInt(sodaEl.textContent) || 0;

    // Painkiller
    const painkillerEl = doc.querySelector("#ui-loot-painkiller .ui-loot-count");
    if (painkillerEl) inventory.painkiller = parseInt(painkillerEl.textContent) || 0;

    return inventory;
  } catch (e) { }
  return { bandage: 0, healthkit: 0, soda: 0, painkiller: 0 };
}

/**
 * Vérifie si le joueur est en train d'effectuer une action
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
 * Vérifie si le joueur est en combat
 */
function isInCombat() {
  try {
    const game = gameManager.game;
    const inputBinds = game[translations.inputBinds_];

    if (inputBinds && inputBinds.isBindDown && inputBinds.isBindDown(inputCommands.Fire_)) {
      return true;
    }
  } catch (e) { }
  return false;
}

/**
 * Vérifie si le joueur peut se soigner
 */
function canHeal() {
  try {
    const game = gameManager.game;
    const player = game[translations.activePlayer_];

    // Pas de soin si mort ou downed
    if (player.dead || player.downed) return false;

    // Pas de soin si déjà en action
    if (isDoingAction()) return false;

    // Cooldown
    const now = Date.now();
    if (now - lastHealTime < HEAL_COOLDOWN) return false;

    // Option: pas de soin en combat
    if (settings.autoHeal_.notInCombat_ && isInCombat()) return false;

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Utilise un item de soin
 */
function useHealItem(itemType) {
  lastHealTime = Date.now();

  console.log(`🩹 AutoHeal: Using ${itemType}`);

  switch (itemType) {
    case 'bandage':
      inputState.queuedInputs_.push(inputCommands.UseBandage_);
      break;
    case 'healthkit':
      inputState.queuedInputs_.push(inputCommands.UseHealthKit_);
      break;
    case 'soda':
      inputState.queuedInputs_.push(inputCommands.UseSoda_);
      break;
    case 'painkiller':
      inputState.queuedInputs_.push(inputCommands.UsePainkiller_);
      break;
  }
}

/**
 * Logique principale d'auto-heal
 */
function autoHealTick() {
  try {
    // Vérifier si activé
    if (!settings.autoHeal_?.enabled_) return;

    // Vérifier si le jeu est prêt
    if (!isGameReady()) return;

    // Vérifier si on peut se soigner
    if (!canHeal()) return;

    const health = getHealthFromUI();
    const boost = getBoostFromUI();
    const inventory = getInventoryFromUI();

    // Seuils configurables
    const healthThreshold = settings.autoHeal_.healthThreshold_ ?? 75;
    const boostThreshold = settings.autoHeal_.boostThreshold_ ?? 50;

    // === PRIORITÉ 1: SANTÉ CRITIQUE (< 25%) ===
    if (health < 25) {
      if (inventory.healthkit > 0) {
        useHealItem('healthkit');
        return;
      }
      if (inventory.bandage > 0) {
        useHealItem('bandage');
        return;
      }
    }

    // === PRIORITÉ 2: SANTÉ BASSE (< seuil configuré) ===
    if (health < healthThreshold) {
      // Healthkit si HP très bas
      if (health < 50 && inventory.healthkit > 0) {
        useHealItem('healthkit');
        return;
      }
      // Bandage pour les dégâts légers
      if (inventory.bandage > 0) {
        useHealItem('bandage');
        return;
      }
      // Healthkit en dernier recours
      if (inventory.healthkit > 0) {
        useHealItem('healthkit');
        return;
      }
    }

    // === PRIORITÉ 3: BOOST (adrénaline) ===
    if (settings.autoHeal_.autoBoost_ && boost < boostThreshold && health >= healthThreshold) {
      // Painkiller d'abord (plus de boost)
      if (inventory.painkiller > 0) {
        useHealItem('painkiller');
        return;
      }
      // Soda ensuite
      if (inventory.soda > 0) {
        useHealItem('soda');
        return;
      }
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

  // Lancer le tick toutes les 300ms
  setInterval(autoHealTick, 300);

  console.log('🟢 AutoHeal initialized');
}