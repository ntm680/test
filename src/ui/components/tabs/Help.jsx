import React from 'react';
import KeybindSlot from '@/ui/components/interaction/KeybindSlot.jsx';
import { Icons } from '@/ui/components/icons.jsx';

const Help = ({ settings, onSettingChange }) => {
  return (
    <div className="section help-section">
      <div className="help-title">
        <Icons.Help_ size={16} />
        <span>Controls & Information</span>
      </div>

      <div className="help-panel" style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.375rem' }}>
          <KeybindSlot keybind={settings?.keybinds_?.toggleMenu_ || 'ShiftRight'} />
          <span className="keybind-description">Show/Hide Menu</span>
        </div>
        <p className="keybind-help-text">
          Toggle the menu visibility at any time using this keybind.
        </p>
      </div>

      <div className="section-subtitle">Feature Keybinds</div>
      <div className="help-panel">
        <p className="keybind-help-text" style={{ marginBottom: '0.5rem' }}>
          Keybinds can be customized next to each feature in their respective tabs:
        </p>
        <div className="features-container">
          <div className="feature-item">
            <span className="feature-name">Aimbot</span>
            <KeybindSlot keybind={settings?.keybinds_?.toggleAimbot_ || 'KeyB'} />
          </div>
          <div className="feature-item">
            <span className="feature-name">Sticky Target</span>
            <KeybindSlot keybind={settings?.keybinds_?.toggleStickyTarget_ || 'KeyN'} />
          </div>
          <div className="feature-item">
            <span className="feature-name">Layer Spoofer</span>
            <KeybindSlot keybind={settings?.keybinds_?.toggleLayerSpoof_ || 'KeyT'} />
          </div>
        </div>
      </div>

      {/* SECTION DISCORD & WEBSITE SUPPRIMÉE */}

      <div className="help-title">
        <Icons.Credits_ size={16} />
        <span>Credits</span>
      </div>
      <div className="credits-panel">
        <div className="credits-container">
          <div className="credit-item">
            <div className="credit-name">pirate.exe</div>
            <div>Cheat Developer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;