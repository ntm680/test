import React from 'react';
import Checkbox from '@/ui/components/interaction/Checkbox.jsx';
import KeybindSlot from '@/ui/components/interaction/KeybindSlot.jsx';

const SectionTitle = ({
  icon: Icon,
  label,
  keybind,
  keybindMode,
  keybindEditable,
  onKeybindChange,
  enabled,
  onEnabledChange,
  warning = false,
}) => {
  return (
    <div className="section-title">
      {Icon && <Icon size={14} />}
      <div className="section-title-container">
        {label}
        {warning && (
          <span className="risky-label">
            RISKY
          </span>
        )}
      </div>
      {keybind && (
        <KeybindSlot
          keybind={keybind}
          mode={keybindMode}
          editable={keybindEditable}
          onClick={onKeybindChange}
        />
      )}
      <Checkbox
        id={`${label.toLowerCase().replace(/\s+/g, '-')}-enable`}
        label=""
        checked={enabled}
        onChange={onEnabledChange}
        style={{ border: 'none', background: 'none', padding: '0', margin: 0 }}
      />
    </div>
  );
};

export default SectionTitle;
