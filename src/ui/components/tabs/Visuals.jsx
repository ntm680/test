import { Icons } from '@/ui/components/icons.jsx';
import Slider from '@/ui/components/interaction/Slider.jsx';
import SectionTitle from '@/ui/components/layout/SectionTitle.jsx';

// Sous-section compacte
const SubSection = ({ title, color, children }) => (
  <div style={{ marginTop: '0.4rem', marginBottom: '0.4rem' }}>
    <div style={{
      fontSize: '0.65rem',
      fontWeight: '600',
      color: color,
      textTransform: 'uppercase',
      letterSpacing: '0.03rem',
      marginBottom: '0.25rem',
      paddingLeft: '0.3rem',
      borderLeft: `2px solid ${color}`,
    }}>
      {title}
    </div>
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.3rem',
      paddingLeft: '0.3rem',
    }}>
      {children}
    </div>
  </div>
);

// Checkbox compact inline
const MiniCheck = ({ id, label, checked, onChange }) => (
  <label style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.7rem',
    cursor: 'pointer',
    padding: '0.15rem 0.4rem',
    borderRadius: '3px',
    background: checked ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
  }}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      style={{
        width: '10px',
        height: '10px',
        accentColor: '#00d4ff',
      }}
    />
    <span style={{ color: checked ? '#fff' : '#888' }}>{label}</span>
  </label>
);

const Visuals = ({ settings, onSettingChange }) => {
  return (
    <div className="section">
      {/* X-Ray */}
      <SectionTitle
        icon={Icons.XRay_}
        label="X-Ray Vision"
        enabled={settings.xray_.enabled_}
        onEnabledChange={(v) => onSettingChange((s) => (s.xray_.enabled_ = v))}
      />
      <div className={`group ${!settings.xray_.enabled_ ? 'hidden' : ''}`}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', marginBottom: '0.4rem' }}>
          <MiniCheck
            id="remove-ceilings"
            label="No Ceilings"
            checked={settings.xray_.removeCeilings_}
            onChange={(v) => onSettingChange((s) => (s.xray_.removeCeilings_ = v))}
          />
          <MiniCheck
            id="darker-smokes"
            label="Dark Smoke"
            checked={settings.xray_.darkerSmokes_}
            onChange={(v) => onSettingChange((s) => (s.xray_.darkerSmokes_ = v))}
          />
        </div>
        <Slider
          id="smoke-opacity"
          label="Smoke"
          value={settings.xray_.smokeOpacity_}
          onChange={(v) => onSettingChange((s) => (s.xray_.smokeOpacity_ = v))}
          suffix="%"
        />
        <Slider
          id="tree-opacity"
          label="Trees"
          value={settings.xray_.treeOpacity_}
          onChange={(v) => onSettingChange((s) => (s.xray_.treeOpacity_ = v))}
          suffix="%"
        />
      </div>

      {/* Layer Spoofer */}
      <SectionTitle
        icon={Icons.LayerSpoof_}
        label="Layer Spoofer"
        keybind={settings.keybinds_.toggleLayerSpoof_}
        keybindEditable={true}
        onKeybindChange={(newKey) => onSettingChange((s) => (s.keybinds_.toggleLayerSpoof_ = newKey))}
        enabled={settings.layerSpoof_.enabled_}
        onEnabledChange={(v) => onSettingChange((s) => (s.layerSpoof_.enabled_ = v))}
      />

      {/* ESP */}
      <SectionTitle
        icon={Icons.ESP_}
        label="ESP"
        enabled={settings.esp_.enabled_}
        onEnabledChange={(v) => onSettingChange((s) => (s.esp_.enabled_ = v))}
      />
      <div className={`group ${!settings.esp_.enabled_ ? 'hidden' : ''}`}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', marginBottom: '0.3rem' }}>
          <MiniCheck
            id="visible-nametags"
            label="Names"
            checked={settings.esp_.visibleNametags_}
            onChange={(v) => onSettingChange((s) => (s.esp_.visibleNametags_ = v))}
          />
          <MiniCheck
            id="player-esp"
            label="Lines"
            checked={settings.esp_.players_}
            onChange={(v) => onSettingChange((s) => (s.esp_.players_ = v))}
          />
        </div>

        <SubSection title="Grenades" color="#ff6b6b">
          <MiniCheck
            id="grenade-esp"
            label="Zones"
            checked={settings.esp_.grenades_.explosions_}
            onChange={(v) => onSettingChange((s) => (s.esp_.grenades_.explosions_ = v))}
          />
          <MiniCheck
            id="grenade-trajectory"
            label="Trajectory"
            checked={settings.esp_.grenades_.trajectory_}
            onChange={(v) => onSettingChange((s) => (s.esp_.grenades_.trajectory_ = v))}
          />
        </SubSection>

        <SubSection title="Flashlights" color="#ffd93d">
          <MiniCheck
            id="own-flashlight"
            label="Own"
            checked={settings.esp_.flashlights_.own_}
            onChange={(v) => onSettingChange((s) => (s.esp_.flashlights_.own_ = v))}
          />
          <MiniCheck
            id="others-flashlight"
            label="Others"
            checked={settings.esp_.flashlights_.others_}
            onChange={(v) => onSettingChange((s) => (s.esp_.flashlights_.others_ = v))}
          />
          <MiniCheck
            id="flashlight-trajectory"
            label="Trajectory"
            checked={settings.esp_.flashlights_.trajectory_}
            onChange={(v) => onSettingChange((s) => (s.esp_.flashlights_.trajectory_ = v))}
          />
        </SubSection>
      </div>

      {/* Radar */}
      <SectionTitle
        icon={Icons.Radar_}
        label="Radar"
        enabled={settings.radar_.enabled_}
        onEnabledChange={(v) => onSettingChange((s) => (s.radar_.enabled_ = v))}
      />
      <div className={`group ${!settings.radar_.enabled_ ? 'hidden' : ''}`}>
        <Slider
          id="radar-size"
          label="Size"
          value={settings.radar_.size_}
          onChange={(v) => onSettingChange((s) => (s.radar_.size_ = v))}
          min={100}
          max={300}
          suffix="px"
        />
        <Slider
          id="radar-range"
          label="Range"
          value={settings.radar_.range_}
          onChange={(v) => onSettingChange((s) => (s.radar_.range_ = v))}
          min={20}
          max={100}
          suffix="m"
        />
        <Slider
          id="radar-opacity"
          label="Opacity"
          value={settings.radar_.opacity_}
          onChange={(v) => onSettingChange((s) => (s.radar_.opacity_ = v))}
          suffix="%"
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', marginTop: '0.3rem' }}>
          <MiniCheck
            id="radar-show-grid"
            label="Grid"
            checked={settings.radar_.showGrid_}
            onChange={(v) => onSettingChange((s) => (s.radar_.showGrid_ = v))}
          />
          <MiniCheck
            id="radar-show-range"
            label="Range"
            checked={settings.radar_.showRange_}
            onChange={(v) => onSettingChange((s) => (s.radar_.showRange_ = v))}
          />
          <MiniCheck
            id="radar-show-all-layers"
            label="All Layers"
            checked={settings.radar_.showAllLayers_}
            onChange={(v) => onSettingChange((s) => (s.radar_.showAllLayers_ = v))}
          />
        </div>
      </div>

      {/* Infinite Zoom */}
      <SectionTitle
        icon={Icons.InfiniteZoom_}
        label="Infinite Zoom"
        keybind={['Shift', 'Scroll']}
        keybindMode="multiple"
        enabled={settings.infiniteZoom_.enabled_}
        onEnabledChange={(v) => onSettingChange((s) => (s.infiniteZoom_.enabled_ = v))}
      />
      <div className={`group ${!settings.mapHighlights_.enabled_ ? 'hidden' : ''}`}>
        <MiniCheck
          id="smaller-trees"
          label="Smaller Trees"
          checked={settings.mapHighlights_.smallerTrees_}
          onChange={(v) => onSettingChange((s) => (s.mapHighlights_.smallerTrees_ = v))}
        />
      </div>
    </div>
  );
};

export default Visuals;