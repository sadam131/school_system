import {
  Box,
  Button,
  Fade,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Backdrop from "@mui/material/Backdrop";
import { AppContex } from "../../context/schoolcontext";
import { ToastContainer, toast } from "react-toastify";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Business } from "@mui/icons-material";

function PopupModel({
  open,
  setOpen,
  teacher,
  payment,
  student,
  finalExam,
  midterm,
}) {
  //the code below belongs to student table
  const [fullName, setFullName] = useState("");
  const [parentName, setparentName] = useState("");
  const [parentPhone, setparentPhone] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [address, setaddress] = useState("");
  const [description,setdescription]=useState('')
  const {
    classes,
    loading,
    getYearMonthDay,
    setLoading,
    studentClassName,
    getStudentClasses,
  } = useContext(AppContex);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //the code below belongs to teachers table
  const [teacherName, setteacherName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [title, settitle] = useState("");
  const [registerDate, setregisterDate] = useState("");
  //this code below belongs to the payment table
  const [studentClass, setstudentClass] = useState("");
  const [studentName, setstudentName] = useState([]);
  const [selectedName, setselectedName] = useState("");
  const [studentFee, setstudentFee] = useState("$");
  const [datePayed, setdatePayed] = useState("");
  //this state below belongs to the final exam table
  const [sname, setsname] = useState("");
  const [arabic, setarabic] = useState("");
  const [tarbiyo, settarbiyo] = useState("");
  const [english, setenglish] = useState("");
  const [somali, setsomali] = useState("");
  const [math, setmath] = useState("");
  const [physics, setphysics] = useState("");
  const [bio, setbio] = useState("");
  const [geo, setgeo] = useState("");
  const [chem, setchem] = useState("");
  const [tech, settech] = useState("");
  const [taariiq, settaariiq] = useState("");
  const [bus, setbus] = useState("");
  //this code below belongs to the midterm exam
  const [cilmigaBulshada, setcilmigaBulshada] = useState('')

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const addStudent = async () => {
    if (finalExam) {
      if (
        sname == "" ||
        studentClass == "" ||
        arabic == "" ||
        tarbiyo == "" ||
        somali == "" ||
        english == "" ||
        physics == "" ||
        chem == "" ||
        bio == "" ||
        taariiq == "" ||
        tech == "" ||
        bus == "" ||
        math == "" ||
        geo == ""
      ) {
        toast.error("please fill all...");
      } else {
        let total = 0;
        let subjects = [
          arabic,
          tarbiyo,
          somali,
          english,
          math,
          physics,
          chem,
          geo,
          bio,
          tech,
          bus,
          taariiq,
        ];
        subjects.forEach((sub) => {
          const a = Number(sub);
          total += a;
        });
        let percentage = total / 12;
        let per = Math.floor(percentage * 10) / 10;
        try {
          setLoading(true);
          const docRef = await addDoc(collection(db, "finalExam"), {
            name: sname,
            class: studentClass,
            arabic: arabic,
            tarbiyo: tarbiyo,
            somali: somali,
            english: english,
            math: math,
            physics: physics,
            geography: geo,
            chemistery: chem,
            biology: bio,
            taariiq: taariiq,
            technology: tech,
            business: bus,
            total: total,
            stdPercentage: per,
          });
          setLoading(false);
          toast.success("exam registered successfuly");
        } catch (error) {
          toast.error(error);
        }
      }
    }
    if (midterm) {
      if (
        sname == "" ||
        studentClass == "" ||
        arabic == "" ||
        tarbiyo == "" ||
        somali == "" ||
        english == "" ||
        cilmigaBulshada == "" ||
        tech == "" ||
        bus == "" ||
        math == "" 
      ) {
        toast.error("please fill all...");
      } else {
        let total = 0;
        let subjects = [
          arabic,
          tarbiyo,
          somali,
          english,
          math,
          tech,
          bus,
          cilmigaBulshada,
        ];
        subjects.forEach((sub) => {
          const a = Number(sub);
          total += a;
        });
        let percentage = total / 8;
        let per = Math.floor(percentage * 10) / 10;
        try {
          setLoading(true);
          const docRef = await addDoc(collection(db, "midterExam"), {
            name: sname,
            class: studentClass,
            arabic: arabic,
            tarbiyo: tarbiyo,
            somali: somali,
            english: english,
            math: math,
            cilmigaBulshada: cilmigaBulshada,
            technology: tech,
            business: bus,
            total: total,
            stdPercentage: per,
          });
          setLoading(false);
          toast.success("exam registered successfuly");
        } catch (error) {
          toast.error(error);
        }
      }
    }
    if (payment == true) {
      if (
        studentClass == "" ||
        selectedName == "" ||
        studentFee == "" ||
        datePayed == ""||
        description==''
      ) {
        return toast.error("please fill all...");
      } else {
        try {
          setLoading(true);
          const docRef = await addDoc(collection(db, "payments"), {
            studentName: selectedName,
            studentClass: studentClass,
            studentFee: studentFee,
            datePayed: datePayed,
            description:description
          });
          setLoading(false);
          toast.success("payment registered successfuly");
        } catch (error) {
          toast.error(error);
        }
      }
    }
    if (student) {
      if (
        (fullName == "" || selectedClass == "" || parentName == "",
        parentPhone == "" || address == "")
      ) {
        return toast.error("please fill all...");
      } else {
        try {
          setLoading(true);
          const docRef = await addDoc(collection(db, "students"), {
            fullName: fullName,
            stdClass: selectedClass,
            parentName: parentName,
            parentPhone: parentPhone,
            address: address,
            timeCreated: getYearMonthDay(),
          });
          setLoading(false);
          toast.success("student registered successfuly");
        } catch (error) {
          toast.error(error);
        }
      }
    }
    if (teacher) {
      if (teacherName == "" || PhoneNumber == "" || title == "") {
        return toast.error("please fill all...");
      } else {
        try {
          setLoading(true);
          const docRef = await addDoc(collection(db, "teachers"), {
            TeacherName: teacherName,
            PhoneNumber: PhoneNumber,
            Title: title,
            RegisteredDate: getYearMonthDay(),
          });
          setLoading(false);
          toast.success("teacher registered successfuly");
        } catch (error) {
          toast.error(error);
        }
      }
    }
    //console.log(fullName,selectedClass,parentName,parentPhone,address)
  };
  useEffect(() => {
    getStudentClasses();
    //console.log(studentClass)
  }, [studentClass]);

  const getStudentNames = async () => {
    const q = query(
      collection(db, "students"),
      where("stdClass", "==", `${studentClass}`)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ studentName: doc.data().fullName });
      });
      setstudentName(list);
    });
  };
  useEffect(() => {
    getStudentNames();
  }, [studentClass]);
  if (teacher) {
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                className="font-inter"
                id="transition-modal-title"
                variant="h4"
              >
                Register new teacher
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Teacher Name
                  </InputLabel>
                  <TextField
                    onChange={(e) => setteacherName(e.target.value)}
                    label="teacherName"
                    sx={{ width: "100%" }}
                    placeholder="student full name..."
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Phone Number
                  </InputLabel>
                  <TextField
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    label="phoneNumber"
                    sx={{ width: "100%" }}
                    placeholder="parent name..."
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Title
                  </InputLabel>
                  <TextField
                    onChange={(e) => settitle(e.target.value)}
                    label="title"
                    sx={{ width: "100%" }}
                    placeholder="parent phone..."
                  />
                </Box>
              </Box>
              <Box className="mt-4">
                <Button
                  onClick={() => setOpen(false)}
                  sx={{ marginRight: "8px" }}
                  variant="contained"
                  color="success"
                >
                  close
                </Button>
                <Button
                  onClick={addStudent}
                  variant="contained"
                  color="success"
                >{`${loading ? "please wait..." : "Register"}`}</Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
        <ToastContainer theme="dark" />
      </div>
    );
  }
  if (finalExam) {
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                className="font-inter"
                id="transition-modal-title"
                variant="h4"
              >
                Register new final exam
              </Typography>
              <Box
                className="h-[420px] overflow-y-auto"
                sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
              >
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    class
                  </InputLabel>
                  <select
                    onChange={(e) => setstudentClass(e.target.value)}
                    className="w-full p-4 border border-slate-400 outline-none capitalize"
                  >
                    {studentClassName?.map((stdClass) => {
                      return (
                        <option value={stdClass.stdClass}>
                          {stdClass.stdClass}
                        </option>
                      );
                    })}
                  </select>
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    student names
                  </InputLabel>
                  <select
                    onChange={(e) => setsname(e.target.value)}
                    className="w-full p-4 border border-slate-400 capitalize outline-none"
                  >
                    <option>Student Names</option>
                    {studentName.map((stdName) => {
                      const name = stdName.studentName;
                      return <option value={name}>{name}</option>;
                    })}
                  </select>
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    tarbiyo
                  </InputLabel>
                  <TextField
                    onChange={(e) => settarbiyo(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Arabic
                  </InputLabel>
                  <TextField
                    onChange={(e) => setarabic(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Somali
                  </InputLabel>
                  <TextField
                    onChange={(e) => setsomali(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    English
                  </InputLabel>
                  <TextField
                    onChange={(e) => setenglish(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Math
                  </InputLabel>
                  <TextField
                    onChange={(e) => setmath(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    physics
                  </InputLabel>
                  <TextField
                    onChange={(e) => setphysics(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Bio
                  </InputLabel>
                  <TextField
                    onChange={(e) => setbio(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Geo
                  </InputLabel>
                  <TextField
                    onChange={(e) => setgeo(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Chemistery
                  </InputLabel>
                  <TextField
                    onChange={(e) => setchem(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Technology
                  </InputLabel>
                  <TextField
                    onChange={(e) => settech(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Taariiq
                  </InputLabel>
                  <TextField
                    onChange={(e) => settaariiq(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Business
                  </InputLabel>
                  <TextField
                    onChange={(e) => setbus(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Box>
              <Box className="mt-4">
                <Button
                  onClick={() => setOpen(false)}
                  sx={{ marginRight: "8px" }}
                  variant="contained"
                  color="success"
                >
                  close
                </Button>
                <Button
                  onClick={addStudent}
                  variant="contained"
                  color="success"
                >{`${loading ? "please wait..." : "Register"}`}</Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
        <ToastContainer theme="dark" />
      </div>
    );
  }
  if (midterm) {
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                className="font-inter"
                id="transition-modal-title"
                variant="h4"
              >
                Register new midterm exam
              </Typography>
              <Box
                className="h-[420px] overflow-y-auto"
                sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
              >
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    class
                  </InputLabel>
                  <select
                    onChange={(e) => setstudentClass(e.target.value)}
                    className="w-full p-4 border border-slate-400 outline-none capitalize"
                  >
                    {studentClassName?.map((stdClass) => {
                      return (
                        <option value={stdClass.stdClass}>
                          {stdClass.stdClass}
                        </option>
                      );
                    })}
                  </select>
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    student names
                  </InputLabel>
                  <select
                    onChange={(e) => setsname(e.target.value)}
                    className="w-full p-4 border border-slate-400 capitalize outline-none"
                  >
                    <option>Student Names</option>
                    {studentName.map((stdName) => {
                      const name = stdName.studentName;
                      return <option value={name}>{name}</option>;
                    })}
                  </select>
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    tarbiyo
                  </InputLabel>
                  <TextField
                    onChange={(e) => settarbiyo(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Arabic
                  </InputLabel>
                  <TextField
                    onChange={(e) => setarabic(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Somali
                  </InputLabel>
                  <TextField
                    onChange={(e) => setsomali(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    English
                  </InputLabel>
                  <TextField
                    onChange={(e) => setenglish(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Math
                  </InputLabel>
                  <TextField
                    onChange={(e) => setmath(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Technology
                  </InputLabel>
                  <TextField
                    onChange={(e) => settech(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    CilmigaBulshada
                  </InputLabel>
                  <TextField
                    onChange={(e) => setcilmigaBulshada(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Business
                  </InputLabel>
                  <TextField
                    onChange={(e) => setbus(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Box>
              <Box className="mt-4">
                <Button
                  onClick={() => setOpen(false)}
                  sx={{ marginRight: "8px" }}
                  variant="contained"
                  color="success"
                >
                  close
                </Button>
                <Button
                  onClick={addStudent}
                  variant="contained"
                  color="success"
                >{`${loading ? "please wait..." : "Register"}`}</Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
        <ToastContainer theme="dark" />
      </div>
    );
  }
  if (payment) {
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                className="font-inter"
                id="transition-modal-title"
                variant="h4"
              >
                Register new payment
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Student Class
                  </InputLabel>
                  <select
                    onChange={(e) => setstudentClass(e.target.value)}
                    className="w-full p-4 border border-slate-400 outline-none capitalize"
                  >
                    {studentClassName?.map((stdClass) => {
                      return (
                        <option value={stdClass.stdClass}>
                          {stdClass.stdClass}
                        </option>
                      );
                    })}
                  </select>
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Student Name
                  </InputLabel>
                  <select
                    onChange={(e) => setselectedName(e.target.value)}
                    className="w-full p-4 border border-slate-400 capitalize outline-none"
                  >
                    <option>Student Names</option>
                    {studentName.map((stdName) => {
                      const name = stdName.studentName;
                      return <option value={name}>{name}</option>;
                    })}
                  </select>
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Amount
                  </InputLabel>
                  <TextField
                    className="w-full"
                    value={`${studentFee}`}
                    onChange={(e) => setstudentFee(e.target.value)}
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Date Payed
                  </InputLabel>
                  <input
                    onChange={(e) => setdatePayed(e.target.value)}
                    className="w-full border border-slate-400 p-3 outline-none"
                    type="date"
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Description
                  </InputLabel>
                  <input
                    onChange={(e) => setdescription(e.target.value)}
                    className="w-full border border-slate-400 p-3 outline-none"
                  />
                </Box>
              </Box>
              <Box className="mt-4">
                <Button
                  onClick={() => setOpen(false)}
                  sx={{ marginRight: "8px" }}
                  variant="contained"
                  color="success"
                >
                  close
                </Button>
                <Button
                  onClick={addStudent}
                  variant="contained"
                  color="success"
                >{`${loading ? "please wait..." : "Register"}`}</Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
        <ToastContainer theme="dark" />
      </div>
    );
  }
  if (student) {
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                className="font-inter"
                id="transition-modal-title"
                variant="h4"
              >
                Register new student
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    FullName
                  </InputLabel>
                  <TextField
                    onChange={(e) => setFullName(e.target.value)}
                    sx={{ width: "100%" }}
                    placeholder="student full name..."
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Class
                  </InputLabel>
                  <Select
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full"
                  >
                    {classes.map((stdClass) => {
                      return <MenuItem value={stdClass}>{stdClass}</MenuItem>;
                    })}
                  </Select>
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Parent Name
                  </InputLabel>
                  <TextField
                    onChange={(e) => setparentName(e.target.value)}
                    sx={{ width: "100%" }}
                    placeholder="parent name..."
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Parent Phone
                  </InputLabel>
                  <TextField
                    onChange={(e) => setparentPhone(e.target.value)}
                    type="number"
                    sx={{ width: "100%" }}
                    placeholder="parent phone..."
                  />
                </Box>
                <Box className="mt-4 w-[48%]">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Address
                  </InputLabel>
                  <TextField
                    onChange={(e) => setaddress(e.target.value)}
                    sx={{ width: "100%" }}
                    placeholder="address..."
                  />
                </Box>
              </Box>
              <Box className="mt-4">
                <Button
                  onClick={() => setOpen(false)}
                  sx={{ marginRight: "8px" }}
                  variant="contained"
                  color="success"
                >
                  close
                </Button>
                <Button
                  onClick={addStudent}
                  variant="contained"
                  color="success"
                >{`${loading ? "please wait..." : "Register"}`}</Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
        <ToastContainer theme="dark" />
      </div>
    );
  }
}

export default PopupModel;
