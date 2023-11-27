import { Menu, MenuItem, Sidebar, menuClasses } from "react-pro-sidebar";
import SearchBar from "../components/SearchBar";
import { Link, Outlet } from "react-router-dom";
import {
  FaDownload,
  FaDesktop,
  FaFile,
  FaVideo,
  FaMusic,
  FaImages,
} from "react-icons/fa";
import Drive from "../components/Drive";
import { audioDir, desktopDir, documentDir, downloadDir, pictureDir, videoDir } from '@tauri-apps/api/path';
import { useMyContext } from "../Context/globalPathContext";
import { useState } from "react";
import React, { useEffect } from 'react';
import { invoke } from "@tauri-apps/api";



const desktopPath=await desktopDir();
const downloadPath=await downloadDir();
const documentPath=await documentDir();
const picturePath=await pictureDir();
const musicPath=await audioDir();
const videoPath=await videoDir();


function AppLayout() {
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [drives, setDrives] = useState([]);

  const handleMenuItemClick = (itemId) => {
    setSelectedItemId(itemId);
  };
  
    const context=useMyContext();

   

     function handlePath(path:string){ 
      context.setGlobalState(path);
    }
    useEffect(() => {
      
      const fetchDriveData = async () => {
        try {
          const response = await invoke<DriveProps[]>('get_drive_data');
          setDrives(response || []);
        } catch (error) {
          console.error('Error fetching drive data:', error);
        }
      };
    
      fetchDriveData();
    }, []);
  return (
    <>
    
      <SearchBar />
      <div
        style={{
          display: "flex",
          height: "100%",
          minHeight: "89.5vh",
        }}
      >
        <Sidebar backgroundColor="#052545" width="210px"
       
        >
          <div className="sidebar-heading mt-3 mb-3">Quick Access</div>
          <Menu>
  <MenuItem
    icon={<FaDesktop />}
    component={<Link to={"List"} />}
    onClick={() => {
      handlePath(desktopPath);
      handleMenuItemClick(0);
    }}
    className={selectedItemId === 0 ? "selected" : ""}
    data-index={0}
    rootStyles={{
      backgroundColor: selectedItemId === 0 ? "#0dcaf0" : "#052545",
      "&:hover": {
        backgroundColor: selectedItemId === 0 ? "#0dcaf0" : "#052545",
        color: "#065d6d", 
      },
      "&.selected": {
        backgroundColor: "#0dcaf0", 
        color: "#000099",
      },
      color: "white", 
    }}
  >
    Desktop
  </MenuItem>
  <MenuItem
    icon={<FaFile />}
    component={<Link to={"List"} />}
    onClick={() => {
      handlePath(documentPath);
      handleMenuItemClick(1);
    }}
    className={selectedItemId === 1 ? "selected" : ""}
    data-index={1}
    rootStyles={{
      backgroundColor: selectedItemId === 1 ? "#0dcaf0" : "#052545",
      "&:hover": {
        backgroundColor: selectedItemId === 1 ? "#0dcaf0" : "#052545",
        color: "#065d6d", 
      },
      "&.selected": {
        backgroundColor: "#0dcaf0", 
        color: "#000099", 
      },
      color: "white", 
    }}
  >
    Documents
  </MenuItem>
  <MenuItem
    icon={<FaDownload />}
    component={<Link to={"List"} />}
    onClick={() => {
      handlePath(downloadPath);
      handleMenuItemClick(2);
    }}
    className={selectedItemId === 2 ? "selected" : ""}
    data-index={2}
    rootStyles={{
      backgroundColor: selectedItemId === 2 ? "#0dcaf0" : "#052545",
      "&:hover": {
        backgroundColor: selectedItemId === 2 ? "#0dcaf0" : "#052545",
        color: "#065d6d", 
      },
      "&.selected": {
        backgroundColor: "#0dcaf0", 
        color: "#000099", 
      },
      color: "white", 
    }}
  >
    Download
  </MenuItem>
  <MenuItem
    icon={<FaImages />}
    component={<Link to={"List"} />}
    onClick={() => {
      handlePath(picturePath);
      handleMenuItemClick(3);
    }}
    className={selectedItemId === 3 ? "selected" : ""}
    data-index={3}
    rootStyles={{
      backgroundColor: selectedItemId === 3 ? "#0dcaf0" : "#052545",
      "&:hover": {
        backgroundColor: selectedItemId === 3 ? "#0dcaf0" : "#052545",
        color: "#065d6d", 
      },
      "&.selected": {
        backgroundColor: "#0dcaf0", 
        color: "#000099", 
      },
      color: "white", 
    }}
  >
    Picture
  </MenuItem>
  <MenuItem
    icon={<FaMusic />}
    component={<Link to={"List"} />}
    onClick={() => {
      handlePath(musicPath);
      handleMenuItemClick(4);
    }}
    className={selectedItemId === 4 ? "selected" : ""}
    data-index={4}
    rootStyles={{
      backgroundColor: selectedItemId === 4 ? "#0dcaf0" : "#052545",
      "&:hover": {
        backgroundColor: selectedItemId === 4 ? "#0dcaf0" : "#052545",
        color: "#065d6d", 
      },
      "&.selected": {
        backgroundColor: "#0dcaf0",
        color: "#000099", 
      },
      color: "white", 
    }}
  >
    Music
  </MenuItem>
  <MenuItem
    icon={<FaVideo />}
    component={<Link to={"List"} />}
    onClick={() => {
      handlePath(videoPath);
      handleMenuItemClick(5);
    }}
    className={selectedItemId === 5 ? "selected" : ""}
    data-index={5}
    rootStyles={{
      backgroundColor: selectedItemId === 5 ? "#0dcaf0" : "#052545",
      "&:hover": {
        backgroundColor: selectedItemId === 5 ? "#0dcaf0" : "#052545",
        color: "#065d6d", 
      },
      "&.selected": {
        backgroundColor: "#0dcaf0", 
        color: "#000099", 
      },
      color: "white", 
    }}
  >
    Videos
  </MenuItem>
</Menu>

<hr />
        <div className="sidebar-heading mt-3 m-3">Drive</div>
        {drives.map((drive, index) => (
          <Drive key={index} name={drive.name} color={drive.color} space={drive.space} />
        ))}
        </Sidebar>
        <div style={{
          width:"100vw",
          height:"inherit"
        }}>
        <Outlet  />
        </div>
      </div>
      
    </>
  );
}
export default AppLayout;