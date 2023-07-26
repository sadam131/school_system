import React, { useContext, useMemo, useState } from "react";
import Student from "../students/Student";
import { AppContex } from "../../context/schoolcontext";
import InformationTable from "../information table/InformationTable";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

function Teachers() {
  const { isopen } = useContext(AppContex);
  const [data, setData] = useState([
    {
      TeacherName: "mohamed ali ahmed",
      PhoneNumber: "0617658988",
      Title: "master",
      RegisteredDate: "5 5 2023",
    },
    {
      TeacherName: "mohamed ali ahmed",
      PhoneNumber: "0617658988",
      Title: "master",
      RegisteredDate: "5 5 2023",
    },
    {
      TeacherName: "mohamed ali ahmed",
      PhoneNumber: "0617658988",
      Title: "master",
      RegisteredDate: "5 5 2023",
    },
    {
      TeacherName: "mohamed ali ahmed",
      PhoneNumber: "0617658988",
      Title: "master",
      RegisteredDate: "5 5 2023",
    },
    {
      TeacherName: "mohamed ali ahmed",
      PhoneNumber: "0617658988",
      Title: "master",
      RegisteredDate: "5 5 2023",
    },
  ]);
  const teacher_columns = useMemo(
    () => [
      { accessorKey: "TeacherName", header: "TeacherName" },
      { accessorKey: "PhoneNumber", header: "PhoneNumber" },
      { accessorKey: "Title", header: "Title", size: 80 },
      { accessorKey: "RegisteredDate", header: "RegisteredDate" },
    ],
    []
  );
  return (
    <div>
      <div className={`${isopen ? "pl-[18%]" : "pl-[6%]"}  mt-[80px] w-[100%]`}>
        {/* <Student teacher={true} data={data} teacher_columns={teacher_columns}/> */}
        <div className="">
          <div className="gradient_1 flex items-center justify-between">
            <div className=" pl-6 text-3xl text-white font-inter capitalize">
              <p className="">teachers registeration</p>
            </div>
            <div className="pr-8  text-3xl font-bold text-black font-inter capitalize"></div>
          </div>
          <InformationTable teacher={true} teacher_columns={teacher_columns} />
        </div>
      </div>
    </div>
  );
}

export default Teachers;
