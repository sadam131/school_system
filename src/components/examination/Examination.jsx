import React, { useContext } from "react";
import { AppContex } from "../../context/schoolcontext";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Examination() {
  const { isopen } = useContext(AppContex);
  return (
    <div
      className={`${isopen ? "pl-[18%]" : "pl-[6%]"}  mt-[80px]
         w-[100%]`}
    >
      <div className="">
        <div className="gradient flex items-center justify-between">
          <div className=" pl-6 text-3xl text-white font-inter capitalize">
            <p className="">examinations</p>
          </div>
          <div className="pr-8 text-3xl font-bold text-black font-inter capitalize"></div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-[98%] mx-auto mt-6">
          <div className="flex bg-slate-200 rounded-md shadow-md">
            <div className="w-[50%]">
              <img
                className="w-full aspect-video"
                src={`https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=600`}
                alt=""
              />
            </div>
            <div className="font-inter text-2xl font-medium capitalize p-2">
              <p className="ml-2">mid term examination</p>
              <Link to='midtermExam'>
                <Button
                  sx={{
                    marginTop: "16px",
                    width: "100%",
                    padding: "8px",
                  }}
                  variant="contained"
                  color="success"
                >
                  get started
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex bg-slate-200 rounded-md shadow-md">
            <div className="w-[50%]">
              <img
                className="w-full aspect-video"
                src={`https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=600`}
                alt=""
              />
            </div>
            <div className="font-inter text-2xl font-medium capitalize p-2">
              <p className="ml-2">final examination</p>
              <Link to="final examination">
                <Button
                  sx={{
                    marginTop: "16px",
                    width: "100%",
                    padding: "8px",
                  }}
                  variant="contained"
                  color="success"
                >
                  get started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Examination;
