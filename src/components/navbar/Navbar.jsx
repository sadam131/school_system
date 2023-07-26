import React, { useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppContex } from "../../context/schoolcontext";
import { useMatch } from "react-router-dom";
function Navbar() {
  const { user } = useContext(AppContex);
  const match = useMatch("/login");
  console.log("navbar running");
  const { isopen, setIsOpen } = useContext(AppContex);
  if (!match) {
    return (
      <div className="navbar fixed top-0 left-0 right-0 z-20 font-inter capitalize bg-black text-white p-5 h-[80px]">
        <div className="w-[98%] mx-auto flex items-center justify-between">
          <div className="text-lg font-medium md:text-2xl">
            <span
              onClick={() => setIsOpen(!isopen)}
              className="mr-4 cursor-pointer"
            >
              <MenuIcon className="text-green-400" />
            </span>
            <span>school system</span>
          </div>
          <div className="flex items-center">
            <IconButton>
              <PersonIcon className="text-green-400" />
            </IconButton>
            <span className="text-lg font-medium md:text-2xl">{user}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
