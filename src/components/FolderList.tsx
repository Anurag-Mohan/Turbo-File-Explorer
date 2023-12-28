import { invoke } from "@tauri-apps/api";
import { useEffect, useState, useRef } from "react";
import { useMyContext } from "../Context/globalPathContext";
import { FaRegFolder } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import ContextMenu from "./ContextMenu";
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
import svgIcon from "../assets/svg.png"
import { IoMdRefresh } from "react-icons/io";

interface FolderListProps {}

interface FileDetails {
  [key: string]: {
    extension?: string;
    file_type?: string;
    size?: string;
    modified_date?: string;
  };
}
const FolderList: React.FC<FolderListProps> = () => {
  const [directoryItem, setDirectoryItem] = useState([]);
  const context = useMyContext();
  const tableRef = useRef(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });
  const [refresh, setRefresh] = useState(false);
  const [fileDetails, setFileDetails] = useState({});
  const [selectedSizeOption, setSelectedSizeOption] = useState("default");

  const handleSizeOptionChange = (event) => {
    setSelectedSizeOption(event.target.value);
  };
  const handleRefreshClick = () => {
    setRefresh(!refresh);
  };
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

  const handleTdClick = async (item) => {
    const itemType = await invoke("check_file_extension", { path: item });
    if (itemType == null) {
      context.setGlobalState(item);
    } else {
      console.log(itemType);
      await invoke("open_file", { path: item });
    }
  };

  const getFileName = (filePath) => {
    const pathParts = filePath.split("\\");
    let filename = pathParts[pathParts.length - 1];
    if (filename === "") {
      filename = "..";
    }
    return filename;
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const items = await invoke("get_file_list", { path: context.globalState });
  
        const detailsPromises = items.map(async (item) => {
          const fileInfo = await invoke("get_file_info", { path: item });
          return { [item]: fileInfo };
        });
  
        const fileDetailsArray = await Promise.all(detailsPromises);
        const combinedFileDetails = Object.assign({}, ...fileDetailsArray);
  
        
        items.sort((a, b) => {
        const getSizeValue = (size) => {
          const sizeParts = size.split(' ');
          const numericValue = parseFloat(sizeParts[0]) || 0;
          const unit = sizeParts[1] || '';
          const units = ['B', 'KB', 'MB', 'GB', 'TB'];

          const unitIndex = units.indexOf(unit.toUpperCase());
          return numericValue * Math.pow(1024, unitIndex);
        };

        const sizeA = getSizeValue(combinedFileDetails[a]?.size);
        const sizeB = getSizeValue(combinedFileDetails[b]?.size);

        if (selectedSizeOption === "largest") {
          return sizeB - sizeA;
        } else if (selectedSizeOption === "smallest") {
          return sizeA - sizeB;
        }

        const dateA = new Date(combinedFileDetails[a]?.modified_date || 0);
        const dateB = new Date(combinedFileDetails[b]?.modified_date || 0);

        if (selectedSizeOption === "newest") {
          return dateB - dateA;
        } else if (selectedSizeOption === "oldest") {
          return dateA - dateB;
        }
         return dateB - dateA;
      });
  
        setDirectoryItem(items);
        setFileDetails(combinedFileDetails);
      } catch (error) {
        console.error("error:", error);
      }
    };
    getList();
  },  [context.globalState, refresh, selectedSizeOption]);
  

  useEffect(() => {
    const setTableHeight = () => {
      if (tableRef.current) {
        const availableHeight = window.innerHeight;
        tableRef.current.style.maxHeight = `${availableHeight}px`;
      }
    };

    setTableHeight();
    window.addEventListener("resize", setTableHeight);

    return () => {
      window.removeEventListener("resize", setTableHeight);
    };
  }, []);

  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (tableRef.current) {
      setShowScrollButton(tableRef.current.scrollTop > 0);
    }
  };

  const scrollToTop = () => {
    if (tableRef.current) {
      tableRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (tableRef.current) {
        tableRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
      case 'svg':
        return <img src={svgIcon} alt="SVG" className="icon" />;
      default:
        return <img src={folderIcon} alt="DIR" className="icon" />;
    }
  };
  return (
    <div className="table-container" ref={tableRef}>
   
      <table className="table table-striped table-primary mb-0 table-hover">
        <thead className="custom-table-heading">
          <tr>
            
            <th scope="col"> <button className="refresh-button" onClick={handleRefreshClick}>
            <IoMdRefresh />
            </button>
             <select
             value={selectedSizeOption}
             onChange={handleSizeOptionChange}>
             <option value="newest">Newest</option>
             <option value="oldest">Oldest</option>
             <option value="largest">Biggest</option>
             <option value="smallest">Smallest</option>
             </select>
             Name</th>
            <th scope="col">Type</th>
            <th scope="col">Size</th>
            <th scope="col">Modified Date</th>
            <th scope="col">Extension</th>
          </tr>
        </thead>
        <tbody>
          {directoryItem.map((item) => (
            <tr
              key={item}
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
        {showScrollButton && (
          <button className="scroll-to-top-button" onClick={scrollToTop}>
            <MdOutlineKeyboardDoubleArrowUp />
          </button>
          
        )}
        
      </table>
      <ContextMenu
        visible={contextMenuVisible}
        position={contextMenuPosition}
        onItemClick={handleMenuItemClick}
      />
    </div>
  );
}

export default FolderList;
