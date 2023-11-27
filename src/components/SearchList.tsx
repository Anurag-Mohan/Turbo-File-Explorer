import { invoke } from "@tauri-apps/api";
import { useEffect, useState ,useRef } from "react";
import { useMyContext } from '../Context/globalPathContext';
import { useNavigate } from "react-router-dom";
import { FaRegFolder } from "react-icons/fa";

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

    setTableHeight();
    window.addEventListener('resize', setTableHeight);

  
    return () => {
      window.removeEventListener('resize', setTableHeight);
    };
  }, []);

  return (
    <>
      <div className="search-results-count">
        Total Search Results: {searchResultsCount}
      </div>
      <div className="table-container" ref={tableRef}>
      <table className="table  table-hover table-striped table-danger">
      <thead className="custom-table-heading">
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {directoryItem.map((item, index) => (
            <tr style={{ cursor: "pointer" }} key={index}>
              <td onDoubleClick={() => {
                handleTdClick(item);
              }}>
                <span className="me-2"><FaRegFolder color="red" /></span>
                {getFileName(item)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </>
  );
}

export default SearchList;
