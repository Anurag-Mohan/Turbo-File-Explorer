import { invoke } from "@tauri-apps/api";
import { useEffect, useState, useRef } from "react";
import { useMyContext } from "../Context/globalPathContext";
import { FaRegFolder } from "react-icons/fa";

let fileDetails: string[] = [];

function FolderList() {
  const [directoryItem, setDirectoryItem] = useState([]);
  const context = useMyContext();
  const tableRef = useRef(null);

  const handleTdClick = async (item: string) => {
    const itemType = await invoke('check_file_extension', { path: item });
    if (itemType == null) {
      context.setGlobalState(item);
    } else {
      console.log(itemType);
      await invoke('open_file', { path: item });
    }
  };

  const getFileName = (filePath: string): string => {
    const pathParts = filePath.split("\\");
    return pathParts[pathParts.length - 1];
  };

  useEffect(() => {
    const getList = async () => {
      try {
        setDirectoryItem(
          await invoke("get_file_list", { path: context.globalState })
        );
      } catch (error) {
        console.error("error:", error);
      }
    };
    getList();
  }, [context.globalState]);

  useEffect(() => {
    const setTableHeight = () => {
      if (tableRef.current) {
        const availableHeight = window.innerHeight;
        tableRef.current.style.maxHeight = `${availableHeight}px`;
      }
    };

    
    setTableHeight();
    window.addEventListener('resize', setTableHeight);

   
    return () => {
      window.removeEventListener('resize', setTableHeight);
    };
  }, []);

  return (
    <div className="table-container" ref={tableRef}>
      <table className="table table-striped table-primary mb-0 table-hover">
        <thead className="custom-table-heading">
          <tr>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {directoryItem.map((item) => (
            <tr style={{ cursor: "pointer" }} key={item}>
              <td
                onDoubleClick={() => {
                  handleTdClick(item);
                }}
              >
                <span className="me-2"><FaRegFolder color="green"/></span>
                {getFileName(item)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FolderList;
