import { desktopDir } from '@tauri-apps/api/path';
import { downloadDir } from '@tauri-apps/api/path';
import { pictureDir } from '@tauri-apps/api/path';
import { videoDir } from '@tauri-apps/api/path';
import { audioDir } from '@tauri-apps/api/path';
import { documentDir } from '@tauri-apps/api/path';
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar"; // Adjust the import path as needed

function FileList() {
  const { menu } = useParams();
  const [fileDetails, setFileDetails] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPathForMenuItem = async (menu) => {
    const getPaths = async () => {
      const desktopPath = await desktopDir();
      const downloadPath = await downloadDir(); 
      const picturePath = await pictureDir(); 
      const videoPath = await videoDir(); 
      const musicPath = await audioDir();
      const documentPath = await documentDir();  
      
      switch (menu) {
        case "Desktop":
          return desktopPath;
        case "Download":
          return downloadPath;
        case "Picture":
          return picturePath;
        case "Videos":
          return videoPath;
        case "Musics":
          return musicPath;
        case "Documents":
          return documentPath;
        default:
          return desktopPath; 
      }
    };

    return getPaths();
  };

  const searchFiles = async (searchQuery) => {
    try {
      const path = await getPathForMenuItem(menu); 
      const searchResults = await invoke('search_files', { query: searchQuery, path });
      setSearchResults(searchResults);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const path = await getPathForMenuItem(menu); 
        const fileList = await invoke('get_file_list', { path });
        setFileDetails(fileList);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getList();
  }, [menu]);

  return (
    <div style={{ width: '100%' }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <SearchBar onSearch={searchFiles} />
          {searchResults.length > 0 && (
            <center><p style={{ backgroundColor: '#6600ff', color: '#66ffcc' }}>
              Total - Results: {searchResults.length}</p></center>
          )}
          
          <table className="table table-hover table-success">
            <thead className="table-dark">
              <tr>
                <th className="p-2 mb-2 bg-info text-dark">Name</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.length > 0
                ? searchResults.map((item, index) => (
                    <tr key={index}>
                      <td>{item}</td>
                    </tr>
                  ))
                : (
                  <>
                    
                    {fileDetails.map((item, index) => (
                      <tr key={index}>
                        <td>{item}</td>
                      </tr>
                    ))}
                  </>
                )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default FileList;
