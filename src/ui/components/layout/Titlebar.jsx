import React from 'react';
import { Icons } from '@/ui/components/icons.jsx';

const Titlebar = ({ onMouseDown, version }) => {
  const handleMouseDown = (e) => {
    onMouseDown(e);
  };

  const renderVersion = () => {
    if (!version) return null;

    const updateMatch = version.match(/^([\d.]+)\s*update available!$/);
    if (updateMatch) {
      const versionNumber = updateMatch[1];
      return (
        <>
          v{versionNumber}
          <span className="update-available-text"> UPDATE!</span>
        </>
      );
    }

    return 'v' + version;
  };

  return (
    <div className="titlebar" onMouseDown={handleMouseDown}>
      <Icons.Surplus_ className="menu-icon" />
      <div className="title">SurvevHack</div>
      <div className="credit">by pirated.exe</div>
      {version && <div className="version-text">{renderVersion()}</div>}
    </div>
  );
};

export default Titlebar;
