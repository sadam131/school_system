import { Box, Button, InputLabel, TextField } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useRouteMatch } from "react";
import { AppContex } from "../../context/schoolcontext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Login() {
  const {setuser}=useContext(AppContex)
  const [email,setEmail]=useState('')
  const [password, setpassword] = useState('')
  const [loading, setloading] = useState(false)
  const navigate=useNavigate()
  const handleLogin=async()=>{
    setloading(true)
      signInWithEmailAndPassword(auth, email,password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setuser(user.email)
          navigate('/')
          setloading(false);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage)
        });
  }
  return (
    <div className=" bg-slate-300 w-full h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white w-[500px] p-8 rounded-md shadow-md">
          <p className="mb-4 font-inter font-bold text-4xl capitalize text-blue-700">
            login
          </p>
          <p className="font-inter text-2xl capitalize mb-4 text-gray-500">
            school manegment system
          </p>
          <div>
            <InputLabel className="mb-2" htmlFor="outlined-adornment-amount">
              Email
            </InputLabel>
            <TextField onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full" />
          </div>
          <div>
            <InputLabel className="mt-4" htmlFor="outlined-adornment-amount">
              Password
            </InputLabel>
            <TextField onChange={(e)=>setpassword(e.target.value)} type="password" className="w-full" />
          </div>
          <div className="mt-8 mb-2">
            <Button onClick={handleLogin} variant='contained' fullWidth sx={{padding:'10px'}}>{loading ? 'loading...':'login'}</Button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Login;
