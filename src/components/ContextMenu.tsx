import React, { useState } from 'react';
import { IoCopyOutline } from "react-icons/io5";
import { PiScissors } from "react-icons/pi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { PiPlusSquareLight } from "react-icons/pi";
import { PiFilePlusLight } from "react-icons/pi";
import { PiFolderPlusLight } from "react-icons/pi";
import { CiFileOn } from "react-icons/ci";

const ContextMenu = ({ visible, position, onItemClick }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  

  const handleNewSubMenuEnter = () => {
    setShowSubMenu(true);
  };

  const handleNewSubMenuLeave = () => {
    setShowSubMenu(false);
  };

  const handleSubMenuItemClick = (action) => {
    console.log('Sub-menu item clicked:', action);
    setShowSubMenu(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="context-menu"
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
      }}
    >
      <div className="menu-item" onClick={() => onItemClick('copy')}>
        <div>
          <IoCopyOutline style={{ marginRight: '8px' }}/> Copy
          <span className="shortcut">(Ctrl+C)</span>
        </div>
      </div>
      <div className="menu-item" onClick={() => onItemClick('cut')}>
        <div>
         <CiFileOn style={{ marginRight: '8px' }} /> Paste
          <span className="shortcut">(Ctrl+V)</span>
        </div>
      </div>
      <div className="menu-item" onClick={() => onItemClick('cut')}>
        <div>
          <PiScissors /> Cut
          <span className="shortcut">(Ctrl+X)</span>
        </div>
      </div>
      <div className="menu-item" onClick={() => onItemClick('rename')}>
        <div>
          <HiOutlinePencilSquare /> Rename
          <span className="shortcut">(F2)</span>
        </div>
      </div>
      <div
        className="menu-item"
        onMouseEnter={handleNewSubMenuEnter}
        onMouseLeave={handleNewSubMenuLeave}
      >
        <div>
          <PiPlusSquareLight /> New
          <span className="shortcut">(Ctrl+N)</span>
        </div>
        {showSubMenu && (
          <div className="sub-menu">
            <div className="sub-menu-item" onClick={() => handleSubMenuItemClick('newFile')}>
            <PiFilePlusLight style={{ marginRight: '8px' }}/>New File
            </div>
            <div className="sub-menu-item" onClick={() => handleSubMenuItemClick('newFolder')}>
            <PiFolderPlusLight style={{ marginRight: '8px' }}/>New Folder
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContextMenu;
