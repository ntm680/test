import React from 'react';
import Checkbox from '@/ui/components/interaction/Checkbox.jsx';
import Slider from '@/ui/components/interaction/Slider.jsx';
import SectionTitle from '@/ui/components/layout/SectionTitle.jsx';
import { Icons } from '@/ui/components/icons.jsx';

const WeaponCategory = ({ title, color, children }) => (
  <div style={{ marginBottom: '0.75rem' }}>
    <div style={{ 
      fontSize: '0.7rem', 
      fontWeight: '700', 
      color: color,
      textTransform: 'uppercase',
      letterSpacing: '0.05rem',
      marginBottom: '0.4rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem'
    }}>
      <span style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 8px ${color}50`
      }}></span>
      {title}
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
      {children}
    </div>
  </div>
);

const Misc = ({ settings, onSettingChange }) => {
  return (
    <div className="section">
      <SectionTitle
        icon={Icons.Map_}
        label="Map Highlights"
        enabled={settings.mapHighlights_.enabled_}
        onEnabledChange={(v) => onSettingChange((s) => (s.mapHighlights_.enabled_ = v))}
      />
      <div className={`group ${!settings.mapHighlights_.enabled_ ? 'hidden' : ''}`}>
        <Checkbox
          id="smaller-trees"
          label="Smaller Trees on Map"
          checked={settings.mapHighlights_.smallerTrees_}
          onChange={(v) => onSettingChange((s) => (s.mapHighlights_.smallerTrees_ = v))}
        />
      </div>

      <SectionTitle
        icon={Icons.AutoLoot_}
        label="Auto Loot"
        enabled={settings.autoLoot_.enabled_}
        onEnabledChange={(v) => onSettingChange((s) => (s.autoLoot_.enabled_ = v))}
      />

      <SectionTitle
        icon={Icons.MobileMovement_}
        label="Mobile Movement"
        enabled={settings.mobileMovement_.enabled_}
        onEnabledChange={(v) => onSettingChange((s) => (s.mobileMovement_.enabled_ = v))}
      />
      <div className={`group ${!settings.mobileMovement_.enabled_ ? 'hidden' : ''}`}>
        <Slider
          id="mobile-movement-smooth"
          label="Smoothness"
          value={settings.mobileMovement_.smooth_}
          onChange={(v) => onSettingChange((s) => (s.mobileMovement_.smooth_ = v))}
        />
      </div>

      <SectionTitle
        icon={Icons.AutoSwitch_}
        label="Weapon Switch"
        enabled={settings.weaponSwitch_.enabled_}
        onEnabledChange={(v) => onSettingChange((s) => (s.weaponSwitch_.enabled_ = v))}
      />
      <div 
        className={`group ${!settings.weaponSwitch_.enabled_ ? 'hidden' : ''}`}
        style={{ maxHeight: '280px', overflowY: 'auto' }}
      >
        <WeaponCategory title="Shotguns" color="#ff6b6b">
          <Checkbox id="ws-mp220" label="MP220" checked={settings.weaponSwitch_.mp220_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.mp220_ = v))} />
          <Checkbox id="ws-spas12" label="SPAS-12" checked={settings.weaponSwitch_.spas12_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.spas12_ = v))} />
          <Checkbox id="ws-m870" label="M870" checked={settings.weaponSwitch_.m870_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.m870_ = v))} />
          <Checkbox id="ws-saiga" label="Saiga-12" checked={settings.weaponSwitch_.saiga_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.saiga_ = v))} />
          <Checkbox id="ws-super90" label="Super 90" checked={settings.weaponSwitch_.super90_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.super90_ = v))} />
          <Checkbox id="ws-usas" label="USAS-12" checked={settings.weaponSwitch_.usas_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.usas_ = v))} />
          <Checkbox id="ws-m1100" label="M1100" checked={settings.weaponSwitch_.m1100_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.m1100_ = v))} />
        </WeaponCategory>

        <WeaponCategory title="Snipers" color="#00d4ff">
          <Checkbox id="ws-mosin" label="Mosin" checked={settings.weaponSwitch_.mosin_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.mosin_ = v))} />
          <Checkbox id="ws-sv98" label="SV-98" checked={settings.weaponSwitch_.sv98_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.sv98_ = v))} />
          <Checkbox id="ws-awc" label="AWM-S" checked={settings.weaponSwitch_.awc_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.awc_ = v))} />
          <Checkbox id="ws-scout" label="Scout" checked={settings.weaponSwitch_.scout_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.scout_ = v))} />
          <Checkbox id="ws-model94" label="Model 94" checked={settings.weaponSwitch_.model94_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.model94_ = v))} />
          <Checkbox id="ws-blr" label="BLR 81" checked={settings.weaponSwitch_.blr_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.blr_ = v))} />
        </WeaponCategory>

        <WeaponCategory title="DMRs" color="#ffd93d">
          <Checkbox id="ws-mk12" label="Mk 12" checked={settings.weaponSwitch_.mk12_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.mk12_ = v))} />
          <Checkbox id="ws-mk20" label="Mk 20" checked={settings.weaponSwitch_.mk20_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.mk20_ = v))} />
          <Checkbox id="ws-m39" label="M39 EMR" checked={settings.weaponSwitch_.m39_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.m39_ = v))} />
          <Checkbox id="ws-svd" label="SVD-63" checked={settings.weaponSwitch_.svd_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.svd_ = v))} />
          <Checkbox id="ws-garand" label="Garand" checked={settings.weaponSwitch_.garand_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.garand_ = v))} />
        </WeaponCategory>

        <WeaponCategory title="Pistols" color="#a29bfe">
          <Checkbox id="ws-ot38" label="OT-38" checked={settings.weaponSwitch_.ot38_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.ot38_ = v))} />
          <Checkbox id="ws-ots38" label="OTS-38" checked={settings.weaponSwitch_.ots38_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.ots38_ = v))} />
          <Checkbox id="ws-deagle" label="Deagle" checked={settings.weaponSwitch_.deagle_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.deagle_ = v))} />
          <Checkbox id="ws-m9" label="M9" checked={settings.weaponSwitch_.m9_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.m9_ = v))} />
          <Checkbox id="ws-m93r" label="M93R" checked={settings.weaponSwitch_.m93r_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.m93r_ = v))} />
          <Checkbox id="ws-m1911" label="M1911" checked={settings.weaponSwitch_.m1911_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.m1911_ = v))} />
          <Checkbox id="ws-p30l" label="P30L" checked={settings.weaponSwitch_.p30l_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.p30l_ = v))} />
          <Checkbox id="ws-flare" label="Flare" checked={settings.weaponSwitch_.flare_gun_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.flare_gun_ = v))} />
          <Checkbox id="ws-peace" label="Peacemaker" checked={settings.weaponSwitch_.peacemaker_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.peacemaker_ = v))} />
        </WeaponCategory>

        <WeaponCategory title="Other" color="#fd79a8">
          <Checkbox id="ws-groza" label="Groza" checked={settings.weaponSwitch_.groza_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.groza_ = v))} />
          <Checkbox id="ws-grozas" label="Groza-S" checked={settings.weaponSwitch_.grozas_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.grozas_ = v))} />
          <Checkbox id="ws-an94" label="AN-94" checked={settings.weaponSwitch_.an94_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.an94_ = v))} />
          <Checkbox id="ws-m1a1" label="M1A1" checked={settings.weaponSwitch_.m1a1_} onChange={(v) => onSettingChange((s) => (s.weaponSwitch_.m1a1_ = v))} />
        </WeaponCategory>
      </div>
    </div>
  );
};

export default Misc;
