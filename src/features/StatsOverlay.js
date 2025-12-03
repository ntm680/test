import { gameManager, settings } from '@/core/state.js';
import { translations } from '@/core/obfuscatedNameTranslator.js';
import { outer } from '@/core/outer.js';

let overlayDiv = null;
let initialized = false;
let lastFrameTime = performance.now();
let frameCount = 0;
let currentFPS = 0;
let debugCount = 0;

function createOverlay() {
  if (overlayDiv) return;

  overlayDiv = outer.document.createElement('div');
  overlayDiv.id = 'surplus-stats-overlay';
  overlayDiv.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-family: 'Consolas', monospace;
    font-size: 14px;
    padding: 8px 12px;
    border-radius: 5px;
    z-index: 999999;
    pointer-events: none;
  `;

  outer.document.body.appendChild(overlayDiv);
}

function calculateFPS() {
  frameCount++;
  const now = performance.now();
  const delta = now - lastFrameTime;

  if (delta >= 1000) {
    currentFPS = Math.round((frameCount * 1000) / delta);
    frameCount = 0;
    lastFrameTime = now;
  }

  return currentFPS;
}

function getPing() {
  try {
    const pings = gameManager.game?.pings;
    if (pings && pings.length > 0) {
      return Math.round(pings[pings.length - 1]);
    }
  } catch { }
  return '?';
}

function getTeamData() {
  try {
    const game = gameManager.game;
    if (!game) return null;

    const playerBarn = game[translations.playerBarn_];
    const activePlayer = game[translations.activePlayer_];

    if (!playerBarn || !activePlayer) return null;

    const myId = activePlayer.__id;
    const myInfo = playerBarn.getPlayerInfo(myId);
    const groupId = myInfo?.groupId;

    if (!groupId) return null;

    const groupInfo = playerBarn.getGroupInfo(groupId);
    if (!groupInfo) return null;

    const teammates = [];
    let totalKills = 0;

    for (const playerId of groupInfo.playerIds) {
      const info = playerBarn.getPlayerInfo(playerId);
      const status = playerBarn.getPlayerStatus(playerId);

      const kills = status?.kills || 0;
      totalKills += kills;

      teammates.push({
        playerId: playerId,
        name: info?.name || 'Unknown',
        kills: kills,
        isMe: playerId === myId,
      });
    }

    return { teammates, totalKills };
  } catch (e) {
    return null;
  }
}

function updateOverlay() {
  debugCount++;

  // Debug toutes les 30 updates (3 secondes)
  if (debugCount % 30 === 0) {
    const game = gameManager.game;
    const playerBarn = game?.[translations.playerBarn_];
    const activePlayer = game?.[translations.activePlayer_];

    console.log('🔵 === StatsOverlay Debug ===');
    console.log('🔵 game:', !!game);
    console.log('🔵 playerBarn:', !!playerBarn);
    console.log('🔵 activePlayer:', !!activePlayer);

    if (activePlayer && playerBarn) {
      const myId = activePlayer.__id;
      const myInfo = playerBarn.getPlayerInfo(myId);
      console.log('🔵 myId:', myId);
      console.log('🔵 myInfo:', myInfo);
      console.log('🔵 groupId:', myInfo?.groupId);

      if (myInfo?.groupId) {
        const groupInfo = playerBarn.getGroupInfo(myInfo.groupId);
        console.log('🔵 groupInfo:', groupInfo);

        if (groupInfo?.playerIds) {
          for (const playerId of groupInfo.playerIds) {
            const info = playerBarn.getPlayerInfo(playerId);
            const status = playerBarn.getPlayerStatus(playerId);
            console.log(`🔵 Player ${playerId}:`, { name: info?.name, status: status });
          }
        }
      }
    }
  }

  if (!settings.statsOverlay_?.enabled_) {
    if (overlayDiv) overlayDiv.style.display = 'none';
    return;
  }

  if (overlayDiv) overlayDiv.style.display = 'block';

  const fps = calculateFPS();
  const ping = getPing();
  const teamData = getTeamData();

  let html = `<span style="color: #00ff00;">FPS:</span> ${fps} | <span style="color: #ffff00;">MS:</span> ${ping}`;

  if (teamData && teamData.teammates.length > 1) {
    html += ` | <span style="color: #ff8800;">Total:</span> ${teamData.totalKills}`;
  }

  if (overlayDiv) overlayDiv.innerHTML = html;
}

function init() {
  if (initialized) return;
  initialized = true;

  createOverlay();
  setInterval(updateOverlay, 100);

  console.log('🟢 StatsOverlay initialized');
}

export default init;