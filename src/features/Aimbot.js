import { gameManager, getUIRoot, inputState, settings } from '@/core/state.js';

import {
  aimOverlays,
  AimState,
  getPing,
  setAimState
} from '@/core/aimController.js';
import { ref_addEventListener } from '@/core/hook.js';
import { translations } from '@/core/obfuscatedNameTranslator.js';
import { outer } from '@/core/outer.js';
import { isLayerSpoofActive, originalLayerValue } from '@/features/LayerSpoofer.js';
import { findBullet, findTeam, findWeapon, inputCommands } from '@/utils/constants.js';
import { collisionHelpers, sameLayer, v2 } from '@/utils/math.js';

const isBypassLayer = (layer) => layer === 2 || layer === 3;

const state = {
  focusedEnemy_: null,
  previousEnemies_: {},
  currentEnemy_: null,
  meleeLockEnemy_: null,
  lastTargetScreenPos_: null,
  lastPredictionTime_: 0,
};

const MELEE_ENGAGE_DISTANCE = 5.5;

const getLocalLayer = (player) => {
  if (isBypassLayer(player.layer)) return player.layer;
  if (isLayerSpoofActive && originalLayerValue !== undefined) return originalLayerValue;
  return player.layer;
};

const meetsLayerCriteria = (targetLayer, localLayer, isLocalOnBypass) => {
  if (isBypassLayer(targetLayer) || isLocalOnBypass) return true;
  return targetLayer === localLayer;
};

// ============================================
// OBSTACLE DETECTION
// ============================================

const BLOCKING_OBSTACLE_PATTERNS = [
  'metal_wall_', 'brick_wall_', 'concrete_wall_', 'stone_wall_',
  'container_wall_', '_wall_int_', 'bank_wall_', 'barn_wall_',
  'cabin_wall_', 'hut_wall_', 'house_wall_', 'mansion_wall_',
  'police_wall_', 'shack_wall_', 'outhouse_wall_', 'teahouse_wall_',
  'warehouse_wall_', 'silo_', 'bollard_', 'sandbags_', 'hedgehog',
];

const NON_BLOCKING_OBSTACLE_PATTERNS = [
  'tree_', 'bush_', 'brush_', 'crate_', 'barrel_', 'refrigerator_',
  'control_panel_', 'chest_', 'case_', 'oven_', 'bed_', 'bookshelf_',
  'couch_', 'table_', 'drawers_', 'window', 'glass_wall_', 'locker_',
  'deposit_box_', 'toilet_', 'pot_', 'planter_', 'pumpkin_', 'potato_',
  'egg_', 'woodpile_', 'decal', 'stone_0',
];

const isObstacleBlocking = (obstacle) => {
  if (obstacle.collidable === false) return false;
  const obstacleType = obstacle.type || '';
  if (obstacle.isWall === true) return true;
  if (obstacle.destructible === false) return true;
  for (const pattern of BLOCKING_OBSTACLE_PATTERNS) {
    if (obstacleType.includes(pattern)) return true;
  }
  for (const pattern of NON_BLOCKING_OBSTACLE_PATTERNS) {
    if (obstacleType.includes(pattern)) return false;
  }
  if (obstacle.health !== undefined && obstacle.health > 200) return true;
  return false;
};

const canCastToPlayer = (localPlayer, targetPlayer, weapon, bullet) => {
  if (!weapon || !bullet) return true;

  const game = gameManager.game;
  const idToObj = game?.[translations.objectCreator_]?.[translations.idToObj_];
  if (!idToObj) return true;

  const BULLET_HEIGHT = 0.25;
  const trueLayer = isLayerSpoofActive && originalLayerValue !== undefined
    ? originalLayerValue
    : localPlayer.layer;

  const playerPos = localPlayer[translations.visualPos_];
  const targetPos = targetPlayer[translations.visualPos_];

  const dx = targetPos.x - playerPos.x;
  const dy = targetPos.y - playerPos.y;
  const aimAngle = Math.atan2(dy, dx);
  const maxDistance = Math.hypot(dx, dy);

  const allObstacles = Object.values(idToObj).filter((obj) => {
    if (!obj.collider) return false;
    if (obj.dead) return false;
    if (obj.height !== undefined && obj.height < BULLET_HEIGHT) return false;
    if (obj.layer !== undefined && !sameLayer(obj.layer, trueLayer)) return false;
    return true;
  });

  const blockingObstacles = allObstacles.filter(isObstacleBlocking);
  if (blockingObstacles.length === 0) return true;

  const baseSpread = (weapon.shotSpread || 0) * (Math.PI / 180);
  const generousSpread = baseSpread * 1.5;
  const rayCount = Math.max(15, Math.ceil((weapon.shotSpread || 0) * 1.5));

  for (let i = 0; i < rayCount; i++) {
    const t = rayCount === 1 ? 0.5 : i / (rayCount - 1);
    const rayAngle = aimAngle - generousSpread / 2 + generousSpread * t;
    const rayDir = v2.create_(Math.cos(rayAngle), Math.sin(rayAngle));
    const endPos = v2.add_(playerPos, v2.mul_(rayDir, maxDistance));

    let blocked = false;
    for (const obstacle of blockingObstacles) {
      const collision = collisionHelpers.intersectSegment_(obstacle.collider, playerPos, endPos);
      if (collision) {
        const distToCollision = v2.length_(v2.sub_(collision.point, playerPos));
        if (distToCollision < maxDistance - 0.5) {
          blocked = true;
          break;
        }
      }
    }
    if (!blocked) return true;
  }
  return false;
};

// ============================================
// KEYBOARD HANDLER
// ============================================

const handleKeydown = (event) => {
  if (event.code !== settings.keybinds_.toggleStickyTarget_) return;
  if (state.focusedEnemy_) {
    state.focusedEnemy_ = null;
    setAimState(new AimState('idle', null, null, true));
    return;
  }
  if (settings.aimbot_.stickyTarget_) {
    state.focusedEnemy_ = state.currentEnemy_;
  }
};

Reflect.apply(ref_addEventListener, outer, ['keydown', handleKeydown]);

let tickerAttached = false;

// ============================================
// UTILS
// ============================================

function getDistance(x1, y1, x2, y2) {
  return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}

function getDistanceReal(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function calcAngle(playerPos, mePos) {
  const dx = mePos.x - playerPos.x;
  const dy = mePos.y - playerPos.y;
  return Math.atan2(dy, dx);
}

// ============================================
// PRÉDICTION AMÉLIORÉE V2
// ============================================

function predictPosition(enemy, currentPlayer) {
  if (!enemy || !currentPlayer) return null;

  const enemyPos = enemy[translations.visualPos_];
  const playerPos = currentPlayer[translations.visualPos_];
  const now = performance.now();
  const enemyId = enemy.__id;

  // Récupérer l'arme et la balle
  const weapon = findWeapon(currentPlayer);
  const bullet = findBullet(weapon);
  const bulletSpeed = bullet?.speed || 100;

  // Initialiser l'historique si nécessaire
  if (!state.previousEnemies_[enemyId]) {
    state.previousEnemies_[enemyId] = { positions: [] };
  }

  const history = state.previousEnemies_[enemyId];

  // Ajouter position actuelle
  history.positions.push({ time: now, x: enemyPos.x, y: enemyPos.y });

  // Garder 6 positions max
  while (history.positions.length > 6) {
    history.positions.shift();
  }

  // Pas assez d'historique = viser position actuelle
  if (history.positions.length < 2) {
    return gameManager.game[translations.camera_][translations.pointToScreen_](enemyPos);
  }

  // Calculer vélocité moyenne sur les dernières positions
  const positions = history.positions;
  let totalVelX = 0;
  let totalVelY = 0;
  let count = 0;

  for (let i = 1; i < positions.length; i++) {
    const dt = (positions[i].time - positions[i - 1].time) / 1000;
    if (dt > 0.001 && dt < 0.5) { // Ignorer les deltas trop grands ou trop petits
      totalVelX += (positions[i].x - positions[i - 1].x) / dt;
      totalVelY += (positions[i].y - positions[i - 1].y) / dt;
      count++;
    }
  }

  if (count === 0) {
    return gameManager.game[translations.camera_][translations.pointToScreen_](enemyPos);
  }

  const enemyVelX = totalVelX / count;
  const enemyVelY = totalVelY / count;

  // Distance entre joueur et ennemi
  const diffX = enemyPos.x - playerPos.x;
  const diffY = enemyPos.y - playerPos.y;
  const distance = Math.hypot(diffX, diffY);

  // Vitesse de l'ennemi
  const enemySpeed = Math.hypot(enemyVelX, enemyVelY);

  // Si l'ennemi ne bouge presque pas, viser directement
  if (enemySpeed < 0.3) {
    return gameManager.game[translations.camera_][translations.pointToScreen_](enemyPos);
  }

  // Temps de vol de base
  let t = distance / bulletSpeed;

  // Compensation ping
  const ping = getPing();
  t += ping * 0.5;

  // Ajustement selon la vitesse de balle (armes lentes = moins de prédiction)
  if (bulletSpeed < 80) {
    // Shotguns - balles lentes, courte distance, moins de prédiction
    t *= 0.5;
  } else if (bulletSpeed > 150) {
    // Snipers - balles rapides, garder prédiction normale
    t *= 0.95;
  } else if (bulletSpeed > 100) {
    // AR/DMR - ajustement moyen
    t *= 0.85;
  } else {
    // SMG/Pistols
    t *= 0.75;
  }

  // Réduire la prédiction pour les très longues distances
  if (distance > 40) {
    t *= 0.6;
  } else if (distance > 25) {
    t *= 0.8;
  }

  // Limiter le temps de prédiction max
  t = Math.max(0, Math.min(t, 0.35));

  // Position prédite
  const predictedPos = {
    x: enemyPos.x + enemyVelX * t,
    y: enemyPos.y + enemyVelY * t,
  };

  return gameManager.game[translations.camera_][translations.pointToScreen_](predictedPos);
}

// ============================================
// FIND TARGET - FOV CENTRÉ SUR LE JOUEUR
// ============================================

function findTarget(players, me) {
  const meTeam = findTeam(me);
  const isLocalOnBypassLayer = isBypassLayer(me.layer);
  const localLayer = getLocalLayer(me);
  let enemy = null;
  let minDistance = Infinity;

  const mePos = me[translations.visualPos_];
  const meScreenPos = gameManager.game[translations.camera_][translations.pointToScreen_](mePos);

  const fovEnabled = settings.aimbot_.fovEnabled_;
  const fovRadius = settings.aimbot_.fov_;
  const fovRadiusSquared = fovRadius * fovRadius;

  for (const player of players) {
    if (!player.active) continue;
    if (player[translations.netData_][translations.dead_]) continue;
    if (!settings.aimbot_.targetKnocked_ && player.downed) continue;
    if (me.__id === player.__id) continue;
    if (!meetsLayerCriteria(player.layer, localLayer, isLocalOnBypassLayer)) continue;
    if (findTeam(player) === meTeam) continue;

    const playerPos = player[translations.visualPos_];
    const screenPos = gameManager.game[translations.camera_][translations.pointToScreen_](playerPos);

    const screenDistance = getDistance(screenPos.x, screenPos.y, meScreenPos.x, meScreenPos.y);

    if (fovEnabled && screenDistance > fovRadiusSquared) continue;

    if (screenDistance < minDistance) {
      minDistance = screenDistance;
      enemy = player;
    }
  }

  return enemy;
}

function findClosestTarget(players, me) {
  const meTeam = findTeam(me);
  const isLocalOnBypassLayer = isBypassLayer(me.layer);
  const localLayer = getLocalLayer(me);
  let enemy = null;
  let minDistance = Infinity;

  for (const player of players) {
    if (!player.active) continue;
    if (player[translations.netData_][translations.dead_]) continue;
    if (!settings.aimbot_.targetKnocked_ && player.downed) continue;
    if (me.__id === player.__id) continue;
    if (!meetsLayerCriteria(player.layer, localLayer, isLocalOnBypassLayer)) continue;
    if (findTeam(player) === meTeam) continue;

    const mePos = me[translations.visualPos_];
    const playerPos = player[translations.visualPos_];
    const distance = getDistance(mePos.x, mePos.y, playerPos.x, playerPos.y);

    if (distance < minDistance) {
      minDistance = distance;
      enemy = player;
    }
  }

  return enemy;
}

// ============================================
// MAIN TICKER
// ============================================

function aimbotTicker() {
  try {
    const game = gameManager.game;
    if (
      !game.initialized ||
      !(settings.aimbot_.enabled_ || settings.meleeLock_.enabled_) ||
      game[translations.uiManager_].spectating
    ) {
      setAimState(new AimState('idle'));
      aimOverlays.hideAll();
      state.lastTargetScreenPos_ = null;
      return;
    }

    const players = game[translations.playerBarn_].playerPool[translations.pool_];
    const me = game[translations.activePlayer_];
    const isLocalOnBypassLayer = isBypassLayer(me.layer);
    let aimUpdated = false;
    let dotTargetPos = null;
    let previewTargetPos = null;
    let isDotTargetShootable = false;

    aimOverlays.updateFovCircle();

    try {
      const currentWeaponIndex = me[translations.localData_][translations.curWeapIdx_];
      const isMeleeEquipped = currentWeaponIndex === 2;
      const isGrenadeEquipped = currentWeaponIndex === 3;
      const isAiming = game[translations.inputBinds_].isBindDown(inputCommands.Fire_);

      // === MELEE LOCK AUTO-SWITCH ===
      const MELEE_AUTO_DISTANCE = 3;

      if (settings.meleeLock_.enabled_) {
        // Trouver l'ennemi le plus proche
        const closestEnemy = findClosestTarget(players, me);

        if (closestEnemy) {
          const mePos = me[translations.visualPos_];
          const enemyPos = closestEnemy[translations.visualPos_];
          const distanceToEnemy = Math.hypot(mePos.x - enemyPos.x, mePos.y - enemyPos.y);

          // Si ennemi à distance <= 3, activer melee lock
          if (distanceToEnemy <= MELEE_AUTO_DISTANCE) {
            state.meleeLockEnemy_ = closestEnemy;

            // Auto-switch vers melee si option activée ET pas déjà équipée
            if (settings.meleeLock_.autoMelee_ && !isMeleeEquipped) {
              inputState.queuedInputs_.push(inputCommands.EquipMelee_);
            }

            // Lock seulement si melee équipée
            if (isMeleeEquipped) {
              const weapon = findWeapon(me);
              const bullet = findBullet(weapon);
              const isMeleeTargetShootable = !settings.aimbot_.wallcheck_ || canCastToPlayer(me, closestEnemy, weapon, bullet);

              if (isMeleeTargetShootable) {
                const moveAngle = calcAngle(enemyPos, mePos) + Math.PI;
                const moveDir = {
                  touchMoveActive: true,
                  touchMoveLen: 255,
                  x: Math.cos(moveAngle),
                  y: Math.sin(moveAngle),
                };
                const screenPos = game[translations.camera_][translations.pointToScreen_](enemyPos);
                setAimState(new AimState('meleeLock', { x: screenPos.x, y: screenPos.y }, moveDir, true));
                aimUpdated = true;
                aimOverlays.hideAll();
                state.lastTargetScreenPos_ = null;
                return;
              }
            }
          } else {
            state.meleeLockEnemy_ = null;
          }
        } else {
          state.meleeLockEnemy_ = null;
        }
      } else {
        state.meleeLockEnemy_ = null;
      }

      // === AIMBOT ===
      if (!settings.aimbot_.enabled_ || isMeleeEquipped || isGrenadeEquipped) {
        setAimState(new AimState('idle'));
        aimOverlays.hideAll();
        state.lastTargetScreenPos_ = null;
        return;
      }

      const canEngageAimbot = isAiming;

      let enemy = state.focusedEnemy_?.active && !state.focusedEnemy_[translations.netData_][translations.dead_]
        ? state.focusedEnemy_
        : null;

      if (enemy) {
        const localLayer = getLocalLayer(me);
        if (!meetsLayerCriteria(enemy.layer, localLayer, isLocalOnBypassLayer)) {
          enemy = null;
          state.focusedEnemy_ = null;
          setAimState(new AimState('idle', null, null, true));
        }
      }

      if (!enemy) {
        if (state.focusedEnemy_) {
          state.focusedEnemy_ = null;
          setAimState(new AimState('idle', null, null, true));
        }
        enemy = findTarget(players, me);
        state.currentEnemy_ = enemy;
      }

      if (enemy) {
        if (enemy !== state.currentEnemy_ && !state.focusedEnemy_) {
          state.currentEnemy_ = enemy;
          delete state.previousEnemies_[enemy.__id];
        }

        const predictedPos = predictPosition(enemy, me);
        if (!predictedPos) {
          setAimState(new AimState('idle'));
          aimOverlays.hideAll();
          state.lastTargetScreenPos_ = null;
          return;
        }

        previewTargetPos = { x: predictedPos.x, y: predictedPos.y };

        const weapon = findWeapon(me);
        const bullet = findBullet(weapon);
        const isTargetShootable = !settings.aimbot_.wallcheck_ || canCastToPlayer(me, enemy, weapon, bullet);

        if (canEngageAimbot && settings.aimbot_.enabled_) {
          if (isTargetShootable) {
            setAimState(
              new AimState('aimbot', { x: predictedPos.x, y: predictedPos.y }, null, true)
            );
            state.lastTargetScreenPos_ = { x: predictedPos.x, y: predictedPos.y };
            aimUpdated = true;

            dotTargetPos = { x: predictedPos.x, y: predictedPos.y };
            isDotTargetShootable = true;
          } else {
            dotTargetPos = { x: predictedPos.x, y: predictedPos.y };
            isDotTargetShootable = false;
          }
        } else {
          dotTargetPos = { x: predictedPos.x, y: predictedPos.y };
          isDotTargetShootable = isTargetShootable;
        }
      } else {
        previewTargetPos = null;
        dotTargetPos = null;
        state.lastTargetScreenPos_ = null;
      }

      if (!aimUpdated) {
        setAimState(new AimState('idle'));
        state.lastTargetScreenPos_ = previewTargetPos
          ? { x: previewTargetPos.x, y: previewTargetPos.y }
          : null;
      }

      let displayPos = dotTargetPos;
      if (!displayPos && previewTargetPos) {
        displayPos = { x: previewTargetPos.x, y: previewTargetPos.y };
      }
      aimOverlays.updateDot(displayPos, isDotTargetShootable, !!state.focusedEnemy_);

    } catch (error) {
      aimOverlays.hideAll();
      setAimState(new AimState('idle', null, null, true));
      state.meleeLockEnemy_ = null;
      state.focusedEnemy_ = null;
      state.currentEnemy_ = null;
      state.lastTargetScreenPos_ = null;
    }
  } catch (error) {
    setAimState(new AimState('idle', null, null, true));
    state.lastTargetScreenPos_ = null;
  }
}

// ============================================
// EXPORT
// ============================================

export default function () {
  const startTicker = () => {
    const uiRoot = getUIRoot();
    if (aimOverlays.ensureInitialized(uiRoot)) {
      if (!tickerAttached) {
        gameManager.pixi._ticker.add(aimbotTicker);
        tickerAttached = true;
      }
    } else {
      requestAnimationFrame(startTicker);
    }
  };

  startTicker();
}