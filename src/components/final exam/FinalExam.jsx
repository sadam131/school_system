import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContex } from "../../context/schoolcontext";
import InformationTable from "../information table/InformationTable";

function FinalExam() {
  const { isopen, getFinalExam,finalExamData } = useContext(AppContex);
  useEffect( ()=>{
    getFinalExam()
  },[])

  const finalExam_columns = useMemo(
    () => [
      { accessorKey: "class", header: "class", align: "center", size: 50 },
      {
        accessorKey: "name",
        header: "name",

        muiTableHeadCellProps: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "left",
        },
      },
      {
        accessorKey: "tarbiyo",
        header: "tarbiyo",
        size: 40,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "arabic",
        header: "arabic",
        size: 40,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "somali",
        header: "somali",
        size: 40,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "english",
        header: "english",
        size: 40,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "math",
        header: "math",
        size: 40,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "biology",
        header: "bio",
        size: 40,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "physics",
        header: "physics",
        size: 40,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "geography",
        header: "geo",
        size: 40,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "chemistery",
        header: "chem",
        size: 40,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "taariiq",
        header: "taariiq",
        size: 40,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "technology",
        header: "tech",
        size: 40,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "business",
        header: "business",
        size: 40,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "total",
        header: "total",
        size: 40,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "stdPercentage",
        header: "per",
        size: 40,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
    ],
    []
  );
  return (
    <div
      className={`${isopen ? "pl-[18%]" : "pl-[6%]"}  mt-[80px]
         w-[100%]`}
    >
      <div>
        <div className="gradient flex items-center justify-between">
          <div className=" pl-6 text-3xl text-white font-inter capitalize">
            <p className="">final examinations</p>
          </div>
          <div className="pr-8 text-3xl font-bold text-black font-inter capitalize"></div>
        </div>
        <InformationTable
          finalExam={true}
          finalExamData={finalExamData}
          finalExam_columns={finalExam_columns}
        />
      </div>
    </div>
  );
}

export default FinalExam;
