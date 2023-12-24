import React, { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api";
import { useMyContext } from '../Context/globalPathContext';
import { useNavigate } from "react-router-dom";
import { FaRegFolder } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import ContextMenu from './ContextMenu';
import pdfIcon from "../assets/pdf1.png"
import jpgIcon from "../assets/picture (1).png"
import pngIcon from "../assets/image-.png"
import vidIcon from "../assets/clapboard.png"
import txtIcon from "../assets/document.png"
import folderIcon from "../assets/folder.png"
import exeIcon from "../assets/gear.png"
import docIcon from "../assets/google-docs.png"
import musIcon from "../assets/music.png"
import zipIcon from "../assets/rar-format.png"
import pptIcon from "../assets/screen.png"
import gifIcon from "../assets/gif.png"
import dllIcon from "../assets/dll.png"
import logIcon from "../assets/log.png"
import lnkIcon from "../assets/link.png"
import ttfIcon from "../assets/ttf.png"
import svgIcon from "../assets/svg.png"
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
  const [fileDetails, setFileDetails] = useState({});

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
  useEffect(() => {
    const fetchFileDetails = async () => {
      const detailsPromises = context.globalSearchState.map(async (item) => {
        const fileInfo = await invoke("get_file_info", { path: item });
        return { [item]: fileInfo };
      });
  
      const fileDetailsArray = await Promise.all(detailsPromises);
      const combinedFileDetails = Object.assign({}, ...fileDetailsArray);
      setFileDetails(combinedFileDetails);
    };
  
    fetchFileDetails();
  }, [context.globalSearchState]);
  const getIcon = (extension) => {
    switch (extension.toLowerCase()) {
      case 'pdf':
        return <img src={pdfIcon} alt="PDF" className="icon" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <img src={jpgIcon} alt="JPG" className="icon" />;
      case 'mp4':
        return <img src={vidIcon} alt="VID" className="icon" />;
      case 'txt':
        return <img src={txtIcon} alt="TXT" className="icon" />;
      case 'gif':
        return <img src={gifIcon} alt="GIF" className="icon" />;
      case 'docx':
        return <img src={docIcon} alt="DOC" className="icon" />;
      case 'mp3':
      case 'aac':
        return <img src={musIcon} alt="MUS" className="icon" />;
      case 'exe':
        return <img src={exeIcon} alt="EXE" className="icon" />;
      case 'zip':
        return <img src={zipIcon} alt="ZIP" className="icon" />;
      case 'pptx':
      case 'ppt':
        return <img src={pptIcon} alt="PPT" className="icon" />;
      case 'log':
        return <img src={logIcon} alt="LOG" className="icon" />;
      case 'lnk':
        return <img src={lnkIcon} alt="LNK" className="icon" />;
      case 'dll':
        return <img src={dllIcon} alt="DLL" className="icon" />;
      case 'ttf':
        return <img src={ttfIcon} alt="TTF" className="icon" />;
      case 'svg':
        return <img src={svgIcon} alt="SVG" className="icon" />;
      default:
        return <img src={folderIcon} alt="DIR" className="icon" />;
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
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Size</th>
              <th scope="col">Modified Date</th>
              <th scope="col">Extension</th>
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
               {getIcon(fileDetails[item]?.extension || "")} 
               </span>
               {getFileName(item)}
             </td>
             <td>{fileDetails[item]?.file_type || "-"}</td>
             <td>{fileDetails[item]?.size || "-"}</td>
             <td>{fileDetails[item]?.modified_date || "-"}</td>
             <td>{fileDetails[item]?.extension || "-"}</td>
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
