import { Icons } from '@/ui/components/icons.jsx';
import SectionTitle from '@/ui/components/layout/SectionTitle.jsx';

const SliderCompact = ({ label, value, onChange, suffix = '%' }) => (
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
      min="0"
      max="100"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      style={{
        flex: 1,
        height: '4px',
        accentColor: '#00d4ff',
      }}
    />
    <span style={{ color: '#00d4ff', minWidth: '35px', textAlign: 'right' }}>{value}{suffix}</span>
  </div>
);

const Misc = ({ settings, onSettingChange }) => {
  return (
    <div className="section">
      {/* Auto Loot */}
      <SectionTitle
        icon={Icons.AutoLoot_}
        label="Auto Loot"
        enabled={settings.autoLoot_.enabled_}
        onEnabledChange={(v) => onSettingChange((s) => (s.autoLoot_.enabled_ = v))}
      />

      {/* Mobile Movement */}
      <SectionTitle
        icon={Icons.MobileMovement_}
        label="Mobile Movement"
        enabled={settings.mobileMovement_.enabled_}
        onEnabledChange={(v) => onSettingChange((s) => (s.mobileMovement_.enabled_ = v))}
      />
      <div className={`group ${!settings.mobileMovement_.enabled_ ? 'hidden' : ''}`}>
        <SliderCompact
          label="Smoothness"
          value={settings.mobileMovement_.smooth_}
          onChange={(v) => onSettingChange((s) => (s.mobileMovement_.smooth_ = v))}
        />
      </div>
    </div>
  );
};

export default Misc;