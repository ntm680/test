import { Icons } from '@/ui/components/icons.jsx';
import SectionTitle from '@/ui/components/layout/SectionTitle.jsx';

const WeaponToggle = ({ id, label, checked, onChange }) => (
  <label
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.3rem',
      padding: '0.2rem 0.5rem',
      fontSize: '0.7rem',
      cursor: 'pointer',
      borderRadius: '4px',
      background: checked ? 'rgba(0, 212, 255, 0.15)' : 'rgba(0, 0, 0, 0.3)',
      border: `1px solid ${checked ? '#00d4ff' : '#333'}`,
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
      background: checked ? '#00d4ff' : '#444',
      boxShadow: checked ? '0 0 6px #00d4ff' : 'none',
    }}></span>
    <span style={{ color: checked ? '#fff' : '#888' }}>{label}</span>
  </label>
);

const Category = ({ title, color, children }) => (
  <div style={{ marginBottom: '0.6rem' }}>
    <div style={{
      fontSize: '0.65rem',
      fontWeight: '600',
      color: color,
      textTransform: 'uppercase',
      letterSpacing: '0.05rem',
      marginBottom: '0.3rem',
      paddingLeft: '0.2rem',
      borderLeft: `2px solid ${color}`,
    }}>
      {title}
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {children}
    </div>
  </div>
);

const Weapons = ({ settings, onSettingChange }) => {
  if (!settings?.weaponSwitch_) {
    return (
      <div className="section">
        <p style={{ color: '#888', fontSize: '0.8rem' }}>Loading...</p>
      </div>
    );
  }

  const ws = settings.weaponSwitch_;

  return (
    <div className="section">
      <SectionTitle
        icon={Icons.AutoSwitch_}
        label="Weapon Switch"
        enabled={ws.enabled_ ?? false}
        onEnabledChange={(v) => onSettingChange((s) => (s.weaponSwitch_.enabled_ = v))}
      />

      <div className={`group ${!ws.enabled_ ? 'hidden' : ''}`}>
        <Category title="Shotguns" color="#ff6b6b">
          <WeaponToggle id="ws-mp220" label="MP220" checked={ws.mp220_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.mp220_ = v))} />
          <WeaponToggle id="ws-spas12" label="SPAS" checked={ws.spas12_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.spas12_ = v))} />
          <WeaponToggle id="ws-m870" label="M870" checked={ws.m870_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.m870_ = v))} />
          <WeaponToggle id="ws-saiga" label="Saiga" checked={ws.saiga_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.saiga_ = v))} />
          <WeaponToggle id="ws-super90" label="Super90" checked={ws.super90_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.super90_ = v))} />
          <WeaponToggle id="ws-usas" label="USAS" checked={ws.usas_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.usas_ = v))} />
          <WeaponToggle id="ws-m1100" label="M1100" checked={ws.m1100_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.m1100_ = v))} />
        </Category>

        <Category title="Snipers" color="#00d4ff">
          <WeaponToggle id="ws-mosin" label="Mosin" checked={ws.mosin_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.mosin_ = v))} />
          <WeaponToggle id="ws-sv98" label="SV-98" checked={ws.sv98_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.sv98_ = v))} />
          <WeaponToggle id="ws-awc" label="AWM-S" checked={ws.awc_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.awc_ = v))} />
          <WeaponToggle id="ws-scout" label="Scout" checked={ws.scout_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.scout_ = v))} />
          <WeaponToggle id="ws-model94" label="M94" checked={ws.model94_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.model94_ = v))} />
          <WeaponToggle id="ws-blr" label="BLR" checked={ws.blr_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.blr_ = v))} />
        </Category>

        <Category title="DMRs" color="#ffd93d">
          <WeaponToggle id="ws-mk12" label="Mk12" checked={ws.mk12_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.mk12_ = v))} />
          <WeaponToggle id="ws-mk20" label="Mk20" checked={ws.mk20_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.mk20_ = v))} />
          <WeaponToggle id="ws-m39" label="M39" checked={ws.m39_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.m39_ = v))} />
          <WeaponToggle id="ws-svd" label="SVD" checked={ws.svd_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.svd_ = v))} />
          <WeaponToggle id="ws-garand" label="Garand" checked={ws.garand_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.garand_ = v))} />
        </Category>

        <Category title="Pistols" color="#a29bfe">
          <WeaponToggle id="ws-ot38" label="OT-38" checked={ws.ot38_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.ot38_ = v))} />
          <WeaponToggle id="ws-ots38" label="OTs-38" checked={ws.ots38_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.ots38_ = v))} />
          <WeaponToggle id="ws-deagle" label="DEagle" checked={ws.deagle_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.deagle_ = v))} />
          <WeaponToggle id="ws-m9" label="M9" checked={ws.m9_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.m9_ = v))} />
          <WeaponToggle id="ws-m93r" label="M93R" checked={ws.m93r_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.m93r_ = v))} />
          <WeaponToggle id="ws-m1911" label="M1911" checked={ws.m1911_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.m1911_ = v))} />
          <WeaponToggle id="ws-p30l" label="P30L" checked={ws.p30l_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.p30l_ = v))} />
          <WeaponToggle id="ws-flare" label="Flare" checked={ws.flare_gun_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.flare_gun_ = v))} />
          <WeaponToggle id="ws-peace" label="Peace" checked={ws.peacemaker_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.peacemaker_ = v))} />
        </Category>
      </div>
    </div>
  );
};

export default Weapons;