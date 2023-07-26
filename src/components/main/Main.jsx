import React, { useContext } from "react";
import Sidebar from "../sidebar/Sidebar";
import Home from "../home/Home";
import Navbar from "../navbar/Navbar";
import { AppContex } from "../../context/schoolcontext";

function Main() {
  const { isopen } = useContext(AppContex);
  return (
    <div className="flex">
      <div className={`${isopen ? "pl-[18%]" : "pl-[7%]"}  mt-[80px] w-[100%]`}>
        <Home />
      </div>
    </div>
  );
}

export default Main;
