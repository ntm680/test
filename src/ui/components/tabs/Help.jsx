import KeybindSlot from '@/ui/components/interaction/KeybindSlot.jsx';
import { Keyboard, Users, Zap } from 'lucide-preact';

const Help = ({ settings, onSettingChange }) => {
  return (
    <div className="section help-section">
      <div className="help-title">
        <Keyboard size={16} />
        <span>Controls</span>
      </div>

      <div className="help-panel" style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <KeybindSlot
            keybind={settings?.keybinds_?.toggleMenu_ || 'ShiftRight'}
            editable={true}
            onClick={(key) => onSettingChange((s) => (s.keybinds_.toggleMenu_ = key))}
          />
          <span className="keybind-description">Toggle Menu</span>
        </div>
        <p className="keybind-help-text">
          Show or hide the cheat menu at any time.
        </p>
      </div>

      <div className="section-subtitle">Quick Toggles</div>
      <div className="help-panel">
        <div className="features-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <div className="feature-item">
            <span className="feature-name">Aimbot</span>
            <KeybindSlot
              keybind={settings?.keybinds_?.toggleAimbot_ || 'KeyB'}
              editable={true}
              onClick={(key) => onSettingChange((s) => (s.keybinds_.toggleAimbot_ = key))}
            />
          </div>
          <div className="feature-item">
            <span className="feature-name">Sticky</span>
            <KeybindSlot
              keybind={settings?.keybinds_?.toggleStickyTarget_ || 'KeyN'}
              editable={true}
              onClick={(key) => onSettingChange((s) => (s.keybinds_.toggleStickyTarget_ = key))}
            />
          </div>
          <div className="feature-item">
            <span className="feature-name">Layer</span>
            <KeybindSlot
              keybind={settings?.keybinds_?.toggleLayerSpoof_ || 'KeyT'}
              editable={true}
              onClick={(key) => onSettingChange((s) => (s.keybinds_.toggleLayerSpoof_ = key))}
            />
          </div>
          <div className="feature-item">
            <span className="feature-name">X-Ray</span>
            <KeybindSlot
              keybind={settings?.keybinds_?.toggleXray_ || 'KeyX'}
              editable={true}
              onClick={(key) => onSettingChange((s) => (s.keybinds_.toggleXray_ = key))}
            />
          </div>
          <div className="feature-item">
            <span className="feature-name">ESP</span>
            <KeybindSlot
              keybind={settings?.keybinds_?.toggleESP_ || 'KeyE'}
              editable={true}
              onClick={(key) => onSettingChange((s) => (s.keybinds_.toggleESP_ = key))}
            />
          </div>
          <div className="feature-item">
            <span className="feature-name">Grenade</span>
            <KeybindSlot
              keybind={settings?.keybinds_?.toggleGrenadeTimer_ || 'KeyG'}
              editable={true}
              onClick={(key) => onSettingChange((s) => (s.keybinds_.toggleGrenadeTimer_ = key))}
            />
          </div>
          <div className="feature-item">
            <span className="feature-name">Spinbot</span>
            <KeybindSlot
              keybind={settings?.keybinds_?.toggleSpinbot_ || 'KeyY'}
              editable={true}
              onClick={(key) => onSettingChange((s) => (s.keybinds_.toggleSpinbot_ = key))}
            />
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
          🔄 <strong style={{ color: '#00d4ff' }}>Weapon Switch</strong> - Quick weapon swap<br />
          📦 <strong style={{ color: '#00d4ff' }}>Auto Loot</strong> - Pick up items automatically<br />
          🔍 <strong style={{ color: '#00d4ff' }}>X-Ray</strong> - See through smoke & objects<br />
          💣 <strong style={{ color: '#00d4ff' }}>Grenade Timer</strong> - Shows cook time<br />
          🌀 <strong style={{ color: '#00d4ff' }}>Spinbot</strong> - Spin to avoid headshots
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