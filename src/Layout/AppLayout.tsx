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
import { Route } from "react-router-dom";
import FileList from "./components/FileList";
import React, { useState } from "react";

function AppLayout() {
  const [selectedItemId, setSelectedItemId] = useState(0);

  const handleMenuItemClick = (itemId) => {
    setSelectedItemId(itemId);
  };



  return (
    <>
    

      <div
        style={{
          display: "flex",
          height: "100%",
          minHeight: "89.5vh",
        }}
      >
        <Sidebar backgroundColor="#212529" width="210px">
        <a className="navbar-brand text-white ">
            <h4>
              <center>
              Turbo<h1>X</h1>plorer
              </center>
            </h4>
            <div className="line"></div>
          </a>

          <div className="sidebar-heading mt-3 mb-3">Quick Access</div>
          <Menu>
          <MenuItem
            icon={<FaDesktop />}
            component={<Link to={"List/Desktop"} />}
            onClick={() => handleMenuItemClick(0)}
            className={selectedItemId === 0 ? "selected" : ""}
            data-index={0}
            rootStyles={{
              backgroundColor: selectedItemId === 0 ? "#0dcaf0" : "#212529",
              "&:hover": {
                backgroundColor: selectedItemId === 0 ? "#0dcaf0" : "#212529",
                color: "green", 
              },
              "&.selected": {
                backgroundColor: "#0dcaf0", // Clicked background color
                color: "#000099", // Change this to the text color you prefer when clicked
              },
              color: "white", 
            }}
          >
            Desktop
          </MenuItem>
          <MenuItem
            icon={<FaFile />}
            component={<Link to={"List/Documents"} />}
            onClick={() => handleMenuItemClick(1)}
            className={selectedItemId === 1 ? "selected" : ""}
            data-index={1}
            rootStyles={{
              backgroundColor: selectedItemId === 1 ? "#0dcaf0" : "#212529",
              "&:hover": {
                backgroundColor: selectedItemId === 1 ? "#0dcaf0" : "#212529",
                color: "green", 
              },
               "&.selected": {
                backgroundColor: "#0dcaf0", // Clicked background color
                color: "#000099", // Change this to the text color you prefer when clicked
              },
              color: "white", 
            }}
          >
            Documents
          </MenuItem>
          <MenuItem
            icon={<FaDownload />}
            component={<Link to={"List/Download"} />}
            onClick={() => handleMenuItemClick(2)}
            className={selectedItemId === 2 ? "selected" : ""}
            data-index={2}
            rootStyles={{
              backgroundColor: selectedItemId === 2 ? "#0dcaf0" : "#212529",
              "&:hover": {
                backgroundColor: selectedItemId === 2 ? "#0dcaf0" : "#212529",
                color: "green", 
              },
              "&.selected": {
                backgroundColor: "#0dcaf0", // Clicked background color
                color: "#000099", // Change this to the text color you prefer when clicked
              },
              color: "white", 
            }}
          >
            Download
          </MenuItem>
          <MenuItem
            icon={<FaImages />}
            component={<Link to={"List/Picture"} />}
            onClick={() => handleMenuItemClick(3)}
            className={selectedItemId === 3 ? "selected" : ""}
            data-index={3}
            rootStyles={{
              backgroundColor: selectedItemId === 3 ? "#0dcaf0" : "#212529",
              "&:hover": {
                backgroundColor: selectedItemId === 3 ? "#0dcaf0" : "#212529",
                color: "green", 
              },
              "&.selected": {
                backgroundColor: "#0dcaf0", // Clicked background color
                color: "#000099", // Change this to the text color you prefer when clicked
              },
              color: "white", 
            }}
          >
            Picture
          </MenuItem>
          <MenuItem
            icon={<FaMusic />}
            component={<Link to={"List/Musics"} />}
            onClick={() => handleMenuItemClick(4)}
            className={selectedItemId === 4 ? "selected" : ""}
            data-index={4}
            rootStyles={{
              backgroundColor: selectedItemId === 4 ? "#0dcaf0" : "#212529",
              "&:hover": {
                backgroundColor: selectedItemId === 4 ? "#0dcaf0" : "#212529",
                color: "green", 
              },
              "&.selected": {
                backgroundColor: "#0dcaf0", // Clicked background color
                color: "#000099", // Change this to the text color you prefer when clicked
              },
              color: "white", 
            }}
          >
            Musics
          </MenuItem>
          <MenuItem
            icon={<FaVideo />}
            component={<Link to={"List/Videos"} />}
            onClick={() => handleMenuItemClick(5)}
            className={selectedItemId === 5 ? "selected" : ""}
            data-index={5}
            rootStyles={{
              backgroundColor: selectedItemId === 5 ? "#0dcaf0" : "#212529",
              "&:hover": {
                backgroundColor: selectedItemId === 5 ? "#0dcaf0" : "#212529",
                color: "green", 
              },
              "&.selected": {
                backgroundColor: "#0dcaf0", // Clicked background color
                color: "#000099", // Change this to the text color you prefer when clicked
              },
              color: "white", 
            }}
          >
            Videos
          </MenuItem>
        </Menu>

          <hr />
          <div className="sidebar-heading mt-3 m-3">Drive</div>
          <Drive type={"C:"} color={"primary"} space={"35"} />
          <Drive type={"D:"} color={"success"} space={"50"} />
          <Drive type={"E:"} color={"warning"} space={"75"} />
          <Drive type={"F:"} color={"danger"} space={"90"} />
        </Sidebar>
        <Outlet />
      </div>
    </>
  );
}
export default AppLayout;
