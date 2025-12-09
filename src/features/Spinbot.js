// src/features/Spinbot.js

import { ref_addEventListener } from '@/core/hook.js';
import { translations } from '@/core/obfuscatedNameTranslator.js';
import { outer } from '@/core/outer.js';
import { gameManager, settings } from '@/core/state.js';

class SpinbotManager {
  constructor() {
    this.angle = 0;
    this.intervalId = null;
    this.isShooting = false;
  }

  start() {
    if (this.intervalId) return;

    console.log('🔵 Spinbot initialized');

    this.intervalId = setInterval(() => {
      this.update();
    }, 16);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  rad(degrees) {
    return degrees * (Math.PI / 180);
  }

  update() {
    if (!settings.spinbot_?.enabled_) return;

    // Ne pas spinner si on tire
    if (this.isShooting) return;

    const game = gameManager?.game;
    if (!game?.initialized) return;

    const input = game[translations.input_];
    if (!input?.mousePos) return;

    // Angle de spin (1-360)
    const spinAngle = settings.spinbot_?.speed_ || 120;

    // Incrémenter l'angle
    this.angle += spinAngle;

    // Calculer la position
    const newX = Math.cos(this.rad(this.angle)) * 100 + outer.innerWidth / 2;
    const newY = Math.sin(this.rad(this.angle)) * 100 + outer.innerHeight / 2;

    // Modifier mousePos
    input.mousePos._x = newX;
    input.mousePos._y = newY;
  }

  toggle() {
    settings.spinbot_.enabled_ = !settings.spinbot_.enabled_;
    console.log('🔵 Spinbot toggled:', settings.spinbot_.enabled_);
  }
}

export const spinbot = new SpinbotManager();

// Gestion des événements souris
const handleMouseDown = (e) => {
  if (e.button === 0) {
    spinbot.isShooting = true;
  }
};

const handleMouseUp = (e) => {
  if (e.button === 0) {
    spinbot.isShooting = false;
  }
};

const handleMouseMove = (e) => {
  if (settings.spinbot_?.enabled_ && !spinbot.isShooting) {
    e.stopPropagation();
    e.preventDefault();
  }
};

// Gestion raccourci clavier
const handleKeyDown = (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  // Utilise keybinds_ comme les autres features
  if (e.code === settings.keybinds_.toggleSpinbot_) {
    e.preventDefault();
    spinbot.toggle();
  }
};

// Export de la fonction d'initialisation (comme les autres features)
export default function () {
  Reflect.apply(ref_addEventListener, outer, ['keydown', handleKeyDown]);
  Reflect.apply(ref_addEventListener, outer, ['mousedown', handleMouseDown]);
  Reflect.apply(ref_addEventListener, outer, ['mouseup', handleMouseUp]);
  Reflect.apply(ref_addEventListener, outer, ['mousemove', handleMouseMove, true]);

  spinbot.start();
}