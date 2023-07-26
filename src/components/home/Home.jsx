import { Person } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useContext, useEffect } from "react";
import ShowChart from "../chart/ShowChart";
import { AppContex } from "../../context/schoolcontext";
import BorderColorIcon from "@mui/icons-material/BorderColor";

function Home() {
  const { isopen, studentData, getStudents, getTeachers, teachersData } =
    useContext(AppContex);
  useEffect(() => {
    getStudents();
    getTeachers()
  }, []);

  return (
    <div className="mt-6 w-[98%] mx-auto">
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-slate-200 shadow-md capitalize rounded-md font-inter font-bold p-10 border-t-8 border-green-500 flex justify-between items-center">
          <IconButton size="large" className="icons">
            <Person />
          </IconButton>
          <div className="text-center">
            <p>students</p>
            <span>{studentData.length}</span>
          </div>
        </div>
        <div className="bg-slate-200 shadow-md capitalize rounded-md font-inter font-bold p-10 border-t-8 border-green-500 flex justify-between items-center">
          <IconButton size="large" className="icons">
            <BorderColorIcon />
          </IconButton>
          <div className="text-center">
            <p>teachers</p>
            <span>{teachersData.length}</span>
          </div>
        </div>
        <div className="bg-slate-200 shadow-md capitalize rounded-md font-inter font-bold p-10 border-t-8 border-green-500 flex justify-between items-center">
          <IconButton size="large" className="icons">
            <Person />
          </IconButton>
          <div className="text-center">
            <p>students</p>
            <span>100</span>
          </div>
        </div>
      </div>
      <ShowChart />
    </div>
  );
}

export default Home;
