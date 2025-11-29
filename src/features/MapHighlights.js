import { gameManager } from '@/core/state.js';

console.log('🎯 MapHighlights module loading...');

const MOSIN_TREES = [
  'tree_03',
  'tree_03sv',
  'tree_03sp',
  'tree_03w',
  'tree_03h',
  'tree_03d',
  'tree_03f',
  'tree_03su',
  'tree_03cb',
];

let initialized = false;

function highlightMosinTrees() {
  try {
    if (!gameManager?.game?.initialized) return;

    const game = gameManager.game;
    const camera = game.camera;

    if (!camera || !camera.mapRender) return;

    if (!initialized) {
      console.log('🗺️ Initializing map highlights...');
      initialized = true;
    }

    const mapObjs = camera.mapRender?.mapObjects || [];

    let mosinCount = 0;

    mapObjs.forEach((obj) => {
      if (!obj?.obj?.type) return;

      const objType = obj.obj.type;

      // Vérifie si c'est un arbre Mosin
      if (MOSIN_TREES.includes(objType)) {
        mosinCount++;

        // Modifie la couleur et la taille
        obj.shapes?.forEach((shape) => {
          shape.color = 0xff0000; // ROUGE
          shape.scale = 20; // ÉNORME
        });
        obj.zIdx = 999;
      }
    });

    if (mosinCount > 0 && !initialized) {
      console.log(`🌲 ${mosinCount} Mosin trees highlighted!`);
    }
  } catch (e) {
    console.error('❌ MapHighlights error:', e);
  }
}

export default function () {
  console.log('✅ MapHighlights started');

  // Exécute toutes les 100ms
  setInterval(highlightMosinTrees, 100);
}