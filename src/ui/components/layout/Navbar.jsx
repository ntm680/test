import { Crosshair, Eye, HelpCircle, Settings, Target } from 'lucide-preact';

const Navbar = ({ activeTab, onTabChange, onClose }) => {
  const tabs = [
    { id: 'main', label: 'COMBAT', icon: Target },
    { id: 'visuals', label: 'VISUAL', icon: Eye },
    { id: 'weapons', label: 'ARMES', icon: Crosshair },
    { id: 'misc', label: 'MISC', icon: Settings },
    { id: 'help', label: 'HELP', icon: HelpCircle },
  ];

  return (
    <div className="navbar">
      <div className="nav-tabs">
        {tabs.map((tab) => {
          const isActiveTab = activeTab === tab.id;
          const Icon = tab.icon;
          const isHelp = tab.id === 'help';

          return (
            <button
              key={tab.id}
              className={`nav-tab ${isActiveTab ? 'active' : ''}`}
              data-tab={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                padding: '0.3rem 0.5rem',
                fontSize: '0.65rem',
                background: isHelp && !isActiveTab ? 'rgba(0, 212, 255, 0.1)' : undefined,
                borderColor: isHelp && !isActiveTab ? '#00d4ff' : undefined,
              }}
            >
              <Icon size={11} style={{ marginRight: '0.2rem' }} />
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