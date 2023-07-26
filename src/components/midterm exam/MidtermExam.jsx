import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContex } from "../../context/schoolcontext";
import InformationTable from "../information table/InformationTable";

function MidtermExam() {
  const { isopen, getMidtermExam, midtermData } = useContext(AppContex);
  useEffect(() => {
    getMidtermExam();
  }, []);

  const midterExam_columns = useMemo(
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
        accessorKey: "cilmigaBulshada",
        header: "C/B",
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
            <p className="">midterm examinations</p>
          </div>
          <div className="pr-8 text-3xl font-bold text-black font-inter capitalize"></div>
        </div>
        <InformationTable
          midterm={true}
          midterExam_columns={midterExam_columns}
          midtermData={midtermData}
        />
      </div>
    </div>
  );
}

export default MidtermExam;
