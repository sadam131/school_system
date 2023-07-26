import React, { useContext, useEffect, useMemo, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { AppContex } from "../../context/schoolcontext";
import InformationTable from "../information table/InformationTable";

function Payments() {
  const { isopen, getPayments, paymentData } = useContext(AppContex);

  useEffect(() => {
    getPayments();
  }, []);

  const payment_columns = useMemo(
    () => [
      { accessorKey: "studentName", header: "StudentName" },
      { accessorKey: "studentClass", header: "StudentClass" },
      { accessorKey: "studentFee", header: "StudentFee", size: 80 },
      { accessorKey: "datePayed", header: "DatePayed" },
      { accessorKey: "description", header: "Description" },
    ],
    []
  );
  return (
    <div>
      <div className={`${isopen ? "pl-[18%]" : "pl-[6%]"}  mt-[80px] w-[100%]`}>
        <div className="gradient_2 flex items-center justify-between">
          <div className=" pl-6 text-3xl text-white font-inter capitalize">
            <p className="">payment registeration</p>
          </div>
          <div className="pr-8  text-3xl font-bold text-black font-inter capitalize"></div>
        </div>
        <InformationTable
          paymentData={paymentData}
          payment={true}
          payment_columns={payment_columns}
        />
      </div>
    </div>
  );
}

export default Payments;
