import { translations } from '@/core/obfuscatedNameTranslator.js';
import { outer } from '@/core/outer.js';
import { gameManager, settings } from '@/core/state.js';
import { isLayerSpoofActive, originalLayerValue } from '@/features/LayerSpoofer.js';
import { findTeam } from '@/utils/constants.js';

const isBypassLayer = (layer) => layer === 2 || layer === 3;

const getLocalLayer = (player) => {
  if (isBypassLayer(player.layer)) return player.layer;
  if (isLayerSpoofActive && originalLayerValue !== undefined) return originalLayerValue;
  return player.layer;
};

const meetsLayerCriteria = (targetLayer, localLayer, isLocalOnBypass) => {
  if (isBypassLayer(targetLayer) || isLocalOnBypass) return true;
  return targetLayer === localLayer;
};

// Radar container and canvas
let radarContainer = null;
let radarCanvas = null;
let radarCtx = null;

const COLORS = {
  BACKGROUND: 'rgba(0, 0, 0, 0.6)',
  BORDER: 'rgba(0, 212, 255, 0.8)',
  PLAYER: '#00d4ff',
  ENEMY: '#ff2828',
  TEAMMATE: '#3a88f4',
  DOWNED: '#888888',
  GRID: 'rgba(255, 255, 255, 0.1)',
};

const createRadarUI = () => {
  if (radarContainer) return;

  // Create container
  radarContainer = outer.document.createElement('div');
  radarContainer.id = 'radar-container';
  radarContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    border: 2px solid ${COLORS.BORDER};
    transition: opacity 0.2s ease;
    pointer-events: none;
  `;

  // Create canvas
  radarCanvas = outer.document.createElement('canvas');
  radarCanvas.style.cssText = `
    display: block;
    background: ${COLORS.BACKGROUND};
  `;

  radarContainer.appendChild(radarCanvas);
  outer.document.body.appendChild(radarContainer);

  radarCtx = radarCanvas.getContext('2d');
};

const updateRadarSize = () => {
  if (!radarCanvas || !settings.radar_.enabled_) return;

  const size = settings.radar_.size_;
  radarCanvas.width = size;
  radarCanvas.height = size;
};

const removeRadarUI = () => {
  if (radarContainer && radarContainer.parentNode) {
    radarContainer.parentNode.removeChild(radarContainer);
  }
  radarContainer = null;
  radarCanvas = null;
  radarCtx = null;
};

const drawGrid = (ctx, size) => {
  if (!settings.radar_.showGrid_) return;

  ctx.strokeStyle = COLORS.GRID;
  ctx.lineWidth = 1;

  // Draw cross lines
  ctx.beginPath();
  ctx.moveTo(size / 2, 0);
  ctx.lineTo(size / 2, size);
  ctx.moveTo(0, size / 2);
  ctx.lineTo(size, size / 2);
  ctx.stroke();

  // Draw circles
  const numCircles = 3;
  for (let i = 1; i <= numCircles; i++) {
    const radius = (size / 2) * (i / numCircles);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
};

const drawPlayer = (ctx, x, y, color, isLocal = false, isDowned = false) => {
  const size = isLocal ? 6 : 4;
  const displayColor = isDowned ? COLORS.DOWNED : color;

  ctx.fillStyle = displayColor;
  ctx.shadowColor = displayColor;
  ctx.shadowBlur = isLocal ? 10 : 6;

  if (isLocal) {
    // Draw local player as triangle pointing up
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x - size, y + size);
    ctx.lineTo(x + size, y + size);
    ctx.closePath();
    ctx.fill();
  } else {
    // Draw other players as circles
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    // Add outer ring for visibility
    ctx.strokeStyle = displayColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.shadowBlur = 0;
};

const renderRadar = () => {
  try {
    if (!settings.radar_.enabled_) {
      if (radarContainer && radarContainer.style.display !== 'none') {
        radarContainer.style.display = 'none';
      }
      return;
    }

    if (!radarContainer) {
      createRadarUI();
      updateRadarSize();
    }

    if (radarContainer.style.display === 'none') {
      radarContainer.style.display = 'block';
    }

    const game = gameManager.game;
    const localPlayer = game?.[translations.activePlayer_];
    const players = game?.[translations.playerBarn_]?.playerPool?.[translations.pool_];

    if (!game?.initialized || !localPlayer || !players || !radarCtx) return;

    const radarSize = settings.radar_.size_;
    const radarRange = settings.radar_.range_;
    const opacity = settings.radar_.opacity_ / 100;

    // Update container opacity
    radarContainer.style.opacity = opacity;

    // Clear canvas
    radarCtx.clearRect(0, 0, radarSize, radarSize);

    // Draw grid
    drawGrid(radarCtx, radarSize);

    const localPos = localPlayer[translations.pos_];
    const localTeam = findTeam(localPlayer);
    const isLocalOnBypassLayer = isBypassLayer(localPlayer.layer);
    const localLayer = getLocalLayer(localPlayer);

    const center = radarSize / 2;
    const scale = radarSize / (2 * radarRange);

    // Draw local player at center
    drawPlayer(radarCtx, center, center, COLORS.PLAYER, true, false);

    // Draw other players
    for (const player of players) {
      if (!player.active) continue;
      if (player.__id === localPlayer.__id) continue;
      if (player[translations.netData_][translations.dead_]) continue;

      const playerPos = player[translations.pos_];
      const dx = playerPos.x - localPos.x;
      const dy = playerPos.y - localPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Skip if out of radar range
      if (distance > radarRange) continue;

      // Check layer visibility
      const isOnEffectiveLayer = meetsLayerCriteria(player.layer, localLayer, isLocalOnBypassLayer);
      if (!isOnEffectiveLayer && !settings.radar_.showAllLayers_) continue;

      // Calculate screen position on radar
      const radarX = center + dx * scale;
      const radarY = center - dy * scale; // Invert Y for screen coordinates

      // Determine color
      const playerTeam = findTeam(player);
      const isDowned = player.downed;
      let color;

      if (playerTeam === localTeam) {
        color = COLORS.TEAMMATE;
      } else {
        color = COLORS.ENEMY;
      }

      // Draw player
      drawPlayer(radarCtx, radarX, radarY, color, false, isDowned);
    }

    // Draw range indicator text
    if (settings.radar_.showRange_) {
      radarCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      radarCtx.font = '10px monospace';
      radarCtx.textAlign = 'center';
      radarCtx.fillText(`${radarRange}m`, center, radarSize - 5);
    }
  } catch (error) {
    // Silently handle errors
  }
};

export default function () {
  // Check if size changed and update
  let lastSize = settings.radar_.size_;

  gameManager.pixi._ticker.add(() => {
    if (settings.radar_.size_ !== lastSize) {
      updateRadarSize();
      lastSize = settings.radar_.size_;
    }
    renderRadar();
  });

  // Cleanup on page unload
  outer.addEventListener('beforeunload', () => {
    removeRadarUI();
  });
}
