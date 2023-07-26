import { Home } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import { Button } from "@mui/material";
import { AppContex } from "../../context/schoolcontext";
import { Link, useMatch } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import BorderColorIcon from "@mui/icons-material/BorderColor";

function Sidebar() {
  const match=useMatch('/login')
  const { isopen } = useContext(AppContex);
  const [selectedNav, setSelectedNav] = useState("home");
  const handleColor = (name) => {
    setSelectedNav((prev) => {
      return (prev = name);
    });
  };
  if(!match){
    return (
      <div
        className={`${
          isopen ? "w-[18%]" : "w-[6%]"
        } bg-black sideBar fixed top-[80px] font-inter  capitalize text-lg text-gray-300 h-[90vh]`}
      >
        <div className="w-[95%] mx-auto p-4 flex flex-col justify-center ">
          {navigations.map((nav, index) => {
            return (
              <Link key={index} to={`${nav.path}`}>
                <div
                  onClick={() => handleColor(nav.name)}
                  className={`${
                    selectedNav == nav.name ? "bg-slate-400 text-black" : ""
                  } mb-3 hover:bg-slate-400 hover:text-black p-2 flex items-center cursor-pointer rounded-md`}
                >
                  <span className="mr-4 text-3xl  text-green-500">
                    {nav.icon}
                  </span>
                  <span className={`font-medium`}>{`${
                    isopen ? `${nav.name}` : ``
                  } `}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="w-[95%] m-auto">
          {isopen && (
            <Button
              className="w-[100%] p-4"
              variant="contained"
              color="success"
            >
              logout
            </Button>
          )}
        </div>
      </div>
    );
  }
}

const navigations = [
  { name: "home", icon: <Home />, path: "/" },
  { name: "students", icon: <GroupIcon />, path: "/students" },
  { name: "teachers", icon: <BorderColorIcon />, path: "/teachers" },
  { name: "examination", icon: <LocalLibraryIcon />, path: "/examination" },
  { name: "payments", icon: <PaymentIcon />, path: "/payments" },
];

export default Sidebar;
