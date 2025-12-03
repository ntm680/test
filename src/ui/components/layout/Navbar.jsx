import React from 'react';
import { Target, Eye, Settings, HelpCircle } from 'lucide-preact';

const Navbar = ({ activeTab, onTabChange, onClose }) => {
  const tabs = [
    { id: 'main', label: 'Combat', icon: Target },
    { id: 'visuals', label: 'Visuals', icon: Eye },
    { id: 'misc', label: 'Misc', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="navbar">
      <div className="nav-tabs">
        {tabs.map((tab) => {
          const isActiveTab = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              className={`nav-tab ${isActiveTab ? 'active' : ''}`}
              data-tab={tab.id}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon size={12} style={{ marginRight: '0.25rem' }} />
              {tab.label}
            </button>
          );
        })}
      </div>
      <button className="close-btn" onClick={onClose}>
        ✕
      </button>
    </div>
  );
};

export default Navbar;
