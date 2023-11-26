import { invoke, shell } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { useMyContext } from "../Context/globalPathContext";
import { FaFolder, FaRegFolder } from "react-icons/fa";
import { open } from "@tauri-apps/api/shell";
import { parsePath } from "react-router-dom";

let fileDetails: string[] = [];



function FolderList() {
  const [directoryItem, setDirectoryItem] = useState([]);

  const context = useMyContext();

  const handleTdClick =async (item: string) => {

    const itemType=await invoke('check_file_extension',{path:item});
    if(itemType==null){
      context.setGlobalState(item);
    }else{
      console.log(itemType);
       await invoke('open_file',{path:item})
     
    }
  };

  useEffect(() => {
    const getList = async () => {
      try {
        setDirectoryItem(
          await invoke("get_file_list",{path:context.globalState})
        );
        console.log(fileDetails);
      } catch (error) {
        console.error("error:", error);
      }
    };
    getList();
  }, [context.globalState]);

  return (
    <>
      <table className="table table-striped table-primary mb-0 table-hover">
        <thead className="table-dark">
          <tr>
            
            <th scope="col">Name</th>
          </tr>
        </thead >
        <tbody>
          {directoryItem.map((item) => (
            <tr style={{cursor:"pointer"}} >
              <td key={item}
                onClick={() => {
                  handleTdClick(item);
                }}
              >
               <span className="me-2"><FaRegFolder/></span>
                {item}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function replaceBackslashes(inputPath: string): string {
  console.log( inputPath.replace(/\\/g, '\\'));
  return inputPath.replace(/\\/g, '\\');
}


export default FolderList;