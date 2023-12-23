import React, { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api";
import { useMyContext } from '../Context/globalPathContext';
import { useNavigate } from "react-router-dom";
import { FaRegFolder } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import ContextMenu from './ContextMenu';

function getFileName(filePath: string): string {
  const pathParts = filePath.split("\\");
  return pathParts[pathParts.length - 1];
}

function SearchList() {
  const context = useMyContext();
  const navigate = useNavigate();
  const [directoryItem, setDirectoryItem] = useState([" "]);
  const [searchResultsCount, setSearchResultsCount] = useState(0);
  const tableRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    const menuHeight = 250;
    const adjustedTop = Math.min(e.clientY, window.innerHeight - menuHeight);

    setContextMenuVisible(true);
    setContextMenuPosition({ top: adjustedTop, left: e.clientX });
  };

  const handleMenuItemClick = async (action) => {
    setContextMenuVisible(false);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      
      if (contextMenuVisible && !e.target.closest(".context-menu")) {
        setContextMenuVisible(false);
      }
    };
      window.addEventListener("click", handleClickOutside);

    
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenuVisible]);

  async function handleTdClick(item: string) {
    const itemType = await invoke('check_file_extension', { path: item });

    if (itemType == null) {
      context.setGlobalState(item);
      navigate(-1);
    } else {
      await invoke('open_file', { path: item });
    }
  }

  useEffect(() => {
    setDirectoryItem(context.globalSearchState);
    setSearchResultsCount(context.globalSearchState.length);
  }, [context.globalSearchState]);

  useEffect(() => {
    const setTableHeight = () => {
      if (tableRef.current) {
        const availableHeight = window.innerHeight;
        tableRef.current.style.maxHeight = `${availableHeight}px`;
      }
    };

    const handleScroll = () => {
      if (tableRef.current) {
        setShowScrollButton(tableRef.current.scrollTop > 0);
      }
    };

    setTableHeight();
    window.addEventListener('resize', setTableHeight);
    tableRef.current.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', setTableHeight);
    };
  }, []);

  const scrollToTop = () => {
    if (tableRef.current) {
      tableRef.current.scrollTop = 0;
    }
  };

  return (
    <>
      <div className="table-container" ref={tableRef}>
        {searchResultsCount === 0 ? (
          <p className="no-results-message">No results found</p>
        ) : (
          <table className="table table-hover table-striped table-danger">
            <thead className="custom-table-heading">
              <tr>
                <th>
                  <span className="name-header">Name</span>
                  <span className="results-count-header">
                    (Total Results:{" "}
                    <span className="total-results-color">{searchResultsCount}</span>)
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {directoryItem.map((item, index) => (
                <tr
                  style={{ cursor: "pointer" }}
                  key={index}
                  onDoubleClick={() => {
                    handleTdClick(item);
                  }}
                  onContextMenu={(e) => handleContextMenu(e)}
                >
                  <td>
                    <span className="me-2">
                      <FaRegFolder color="red" />
                    </span>
                    {getFileName(item)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showScrollButton && (
        <button className="scroll-to-top-button-search" onClick={scrollToTop}>
          <MdOutlineKeyboardDoubleArrowUp />
        </button>
      )}
      <ContextMenu
        visible={contextMenuVisible}
        position={contextMenuPosition}
        onItemClick={handleMenuItemClick}
      />
    </>
  );
}

export default SearchList;
