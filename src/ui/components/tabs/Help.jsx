import React from 'react';
import KeybindSlot from '@/ui/components/interaction/KeybindSlot.jsx';
import { Icons } from '@/ui/components/icons.jsx';
import { Keyboard, Zap, Users } from 'lucide-preact';

const Help = ({ settings, onSettingChange }) => {
  return (
    <div className="section help-section">
      <div className="help-title">
        <Keyboard size={16} />
        <span>Controls</span>
      </div>

      <div className="help-panel" style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <KeybindSlot keybind={settings?.keybinds_?.toggleMenu_ || 'ShiftRight'} />
          <span className="keybind-description">Toggle Menu</span>
        </div>
        <p className="keybind-help-text">
          Show or hide the cheat menu at any time.
        </p>
      </div>

      <div className="section-subtitle">Quick Toggles</div>
      <div className="help-panel">
        <div className="features-container">
          <div className="feature-item">
            <span className="feature-name">Aimbot</span>
            <KeybindSlot keybind={settings?.keybinds_?.toggleAimbot_ || 'KeyB'} />
          </div>
          <div className="feature-item">
            <span className="feature-name">Sticky</span>
            <KeybindSlot keybind={settings?.keybinds_?.toggleStickyTarget_ || 'KeyN'} />
          </div>
          <div className="feature-item">
            <span className="feature-name">Layer</span>
            <KeybindSlot keybind={settings?.keybinds_?.toggleLayerSpoof_ || 'KeyT'} />
          </div>
        </div>
      </div>

      <div className="help-title">
        <Zap size={16} />
        <span>Features</span>
      </div>
      <div className="help-panel">
        <p className="keybind-help-text" style={{ lineHeight: '1.8' }}>
          🎯 <strong style={{ color: '#00d4ff' }}>Aimbot</strong> - Auto aim at enemies<br />
          👁️ <strong style={{ color: '#00d4ff' }}>ESP</strong> - See players through walls<br />
          🔫 <strong style={{ color: '#00d4ff' }}>Auto Fire</strong> - Automatic shooting<br />
          🔄 <strong style={{ color: '#00d4ff' }}>Auto Switch</strong> - Quick weapon swap<br />
          📦 <strong style={{ color: '#00d4ff' }}>Auto Loot</strong> - Pick up items automatically<br />
          🔍 <strong style={{ color: '#00d4ff' }}>X-Ray</strong> - See through smoke & objects
        </p>
      </div>

      <div className="help-title">
        <Users size={16} />
        <span>Credits</span>
      </div>
      <div className="credits-panel">
        <div className="credits-container">
          <div className="credit-item">
            <div className="credit-name">pirated.exe</div>
            <div>Lead Developer</div>
          </div>
          <div className="credit-item">
            <div className="credit-name">SurvevHack</div>
            <div>Team</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
