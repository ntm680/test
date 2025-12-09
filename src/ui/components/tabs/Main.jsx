import { Icons } from '@/ui/components/icons.jsx';
import KeybindSlot from '@/ui/components/interaction/KeybindSlot.jsx';
import SectionTitle from '@/ui/components/layout/SectionTitle.jsx';

const Toggle = ({ id, label, checked, onChange, warning = false }) => (
  <label
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.3rem',
      padding: '0.2rem 0.5rem',
      fontSize: '0.7rem',
      cursor: 'pointer',
      borderRadius: '4px',
      background: checked
        ? (warning ? 'rgba(255, 107, 107, 0.15)' : 'rgba(0, 212, 255, 0.15)')
        : 'rgba(0, 0, 0, 0.3)',
      border: `1px solid ${checked ? (warning ? '#ff6b6b' : '#00d4ff') : '#333'}`,
      transition: 'all 0.15s ease',
      margin: '0.15rem',
    }}
  >
    <input
      type="checkbox"
      id={id}
      checked={checked || false}
      onChange={(e) => onChange(e.target.checked)}
      style={{ display: 'none' }}
    />
    <span style={{
      width: '8px',
      height: '8px',
      borderRadius: '2px',
      background: checked ? (warning ? '#ff6b6b' : '#00d4ff') : '#444',
      boxShadow: checked ? `0 0 6px ${warning ? '#ff6b6b' : '#00d4ff'}` : 'none',
    }}></span>
    <span style={{ color: checked ? '#fff' : '#888' }}>{label}</span>
  </label>
);

const SliderCompact = ({ label, value, onChange, warning = false, min = 0, max = 100, suffix = '%' }) => {
  const isWarning = warning && value <= 20;
  const color = isWarning ? '#ff6b6b' : '#00d4ff';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.2rem 0',
      fontSize: '0.7rem',
    }}>
      <span style={{ color: '#888', minWidth: '70px' }}>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        style={{
          flex: 1,
          height: '4px',
          accentColor: color,
        }}
      />
      <span style={{ color: color, minWidth: '35px', textAlign: 'right' }}>{value}{suffix}</span>
    </div>
  );
};

const Main = ({ settings, onSettingChange }) => {
  return (
    <div className="section">
      {/* Aimbot */}
      <SectionTitle
        icon={Icons.Aimbot_}
        label="Aimbot"
        keybind={settings.keybinds_.toggleAimbot_}
        keybindEditable={true}
        onKeybindChange={(newKey) => onSettingChange((s) => (s.keybinds_.toggleAimbot_ = newKey))}
        enabled={settings.aimbot_.enabled_}
        onEnabledChange={(v) => onSettingChange((s) => (s.aimbot_.enabled_ = v))}
      />
      <div className={`group ${!settings.aimbot_.enabled_ ? 'hidden' : ''}`}>
        <SliderCompact
          label="Smoothness"
          value={settings.aimbot_.smooth_}
          onChange={(v) => onSettingChange((s) => (s.aimbot_.smooth_ = v))}
          warning={true}
        />
        <SliderCompact
          label="FOV"
          value={settings.aimbot_.fov_}
          onChange={(v) => onSettingChange((s) => (s.aimbot_.fov_ = v))}
          min={10}
          max={500}
          suffix="px"
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '0.3rem' }}>
          <Toggle
            id="target-knocked"
            label="Target Knocked"
            checked={settings.aimbot_.targetKnocked_}
            onChange={(v) => onSettingChange((s) => (s.aimbot_.targetKnocked_ = v))}
          />
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <Toggle
              id="sticky-target"
              label="Sticky Target"
              checked={settings.aimbot_.stickyTarget_}
              onChange={(v) => onSettingChange((s) => (s.aimbot_.stickyTarget_ = v))}
            />
            <KeybindSlot
              keybind={settings.keybinds_.toggleStickyTarget_}
              editable={true}
              onClick={(newKey) => onSettingChange((s) => (s.keybinds_.toggleStickyTarget_ = newKey))}
            />
          </div>
          <Toggle
            id="aimbot-show-dot"
            label="Show Dot"
            checked={settings.aimbot_.showDot_}
            onChange={(v) => onSettingChange((s) => (s.aimbot_.showDot_ = v))}
          />
          <Toggle
            id="aimbot-wallcheck"
            label="Wall Check"
            checked={settings.aimbot_.wallcheck_}
            onChange={(v) => onSettingChange((s) => (s.aimbot_.wallcheck_ = v))}
            warning={!settings.aimbot_.wallcheck_}
          />
          <Toggle
            id="aimbot-fov-enabled"
            label="FOV Limit"
            checked={settings.aimbot_.fovEnabled_}
            onChange={(v) => onSettingChange((s) => (s.aimbot_.fovEnabled_ = v))}
          />
        </div>
      </div>

      {/* Melee Lock */}
      <SectionTitle
        icon={Icons.MeleeLock_}
        label="Melee Lock"
        enabled={settings.meleeLock_.enabled_}
        onEnabledChange={(v) => onSettingChange((s) => (s.meleeLock_.enabled_ = v))}
        warning={true}
      />
      <div className={`group ${!settings.meleeLock_.enabled_ ? 'hidden' : ''}`}>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '0.3rem' }}>
          <Toggle
            id="melee-auto-switch"
            label="Auto Melee"
            checked={settings.meleeLock_.autoMelee_}
            onChange={(v) => onSettingChange((s) => (s.meleeLock_.autoMelee_ = v))}
          />
        </div>
      </div>

      {/* Auto Fire */}
      <SectionTitle
        icon={Icons.AutoFire_}
        label="Auto Fire"
        enabled={settings.autoFire_.enabled_}
        onEnabledChange={(v) => onSettingChange((s) => (s.autoFire_.enabled_ = v))}
      />

      {/* Spinbot */}
      <SectionTitle
        icon={Icons.Aimbot_}
        label="Spinbot"
        enabled={settings.spinbot_?.enabled_}
        onEnabledChange={(v) => onSettingChange((s) => (s.spinbot_.enabled_ = v))}
      />
      <div className={`group ${!settings.spinbot_?.enabled_ ? 'hidden' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem' }}>
          <span style={{ color: '#888', minWidth: '70px' }}>Spin Angle</span>
          <input
            type="range"
            min="1"
            max="360"
            value={settings.spinbot_?.speed_ ?? 120}
            onChange={(e) => onSettingChange((s) => (s.spinbot_.speed_ = parseInt(e.target.value)))}
            style={{ flex: 1, height: '4px', accentColor: '#00d4ff' }}
          />
          <span style={{ color: '#00d4ff', minWidth: '35px', textAlign: 'right' }}>
            {settings.spinbot_?.speed_ ?? 120}°
          </span>
        </div>
      </div>
    </div>
  );
};

export default Main;