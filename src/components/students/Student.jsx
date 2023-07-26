import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import InformationTable from "../information table/InformationTable";
import { useContext } from "react";
import { AppContex } from "../../context/schoolcontext";
function Student({ data }) {
  const { isopen } = useContext(AppContex);
  return (
    <div>
      <div
        className={`${isopen ? "pl-[18%]" : "pl-[6%]"}  mt-[80px]
         w-[100%]`}
      >
        <div className="">
          <div className="gradient flex items-center justify-between">
            <div className=" pl-6 text-3xl text-white font-inter capitalize">
              <p className="">student registration</p>
            </div>
            <div className="pr-8  text-3xl font-bold text-black font-inter capitalize"></div>
          </div>
          <InformationTable student={true} data={data} />
        </div>
      </div>
    </div>
  );
}

export default Student;
