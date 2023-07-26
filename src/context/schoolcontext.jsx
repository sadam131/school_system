import {
  QuerySnapshot,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { Children, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  format,
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
} from "date-fns";
import { toast } from "react-toastify";

export const AppContex = React.createContext();
export const AppProvider = ({ children }) => {
  const [classes, setClasses] = useState([
    "Form one",
    "Form two",
    "Form three",
    "Form four",
    "8aad",
    "7aad",
    "6aad",
    "5aad",
    "4aad",
    "3aad",
    "2aad",
    "1aad",
  ]);
  const [isopen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState();
  const [studentData, setStudentData] = useState([]);
  const [teachersData, setTeachersData] = useState([]);
  const [studentClassName, setStudentClassName] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [finalExamData,setFinalExamData]=useState([])
  const [midtermData, setmidtermData] = useState([]);
  const [user, setuser] = useState('')

  const getYearMonthDay = () => {
    const currentDate = new Date();
    const currentMonth = getMonth(currentDate) + 1;
    const currentDay = getDate(currentDate);
    const currentYear = getYear(currentDate);
    const fullDate = `${currentMonth} ${currentDay} ${currentYear}`;
    return fullDate;
  };

  // const getHourMinuteSecond = () => {
  //     setInterval(() => {
  //         setCurrentDate(new Date())
  //     }, 1000);
  //     const hour = getHours(currentDate)
  //     const minutes = getMinutes(currentDate)
  //     let seconds = getSeconds(currentDate)
  //     if(seconds<10){
  //         seconds=`0${seconds}`
  //     }

  //     const fullTime = `${hour}:${minutes}:${seconds}`
  //     return fullTime
  // }

  const getStudents = async () => {
    const q = query(collection(db, "students"), orderBy("timeCreated", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          stdClass: doc.data().stdClass,
          fullName: doc.data().fullName,
          parentName: doc.data().parentName,
          parentPhone: doc.data().parentPhone,
          address: doc.data().address,
          timeCreated: doc.data().timeCreated,
        });
      });
      setStudentData(list);
    });
  };

  const getStudentClasses = async () => {
    const q = query(collection(db, "students"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ stdClass: doc.data().stdClass });
      });
      setStudentClassName(list);
    });
  };

  const getFinalExam = async () => {
    const q = query(collection(db, "finalExam"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          id:doc.id,
          name: doc.data().name,
          class: doc.data().class,
          arabic: doc.data().arabic,
          tarbiyo: doc.data().tarbiyo,
          somali: doc.data().somali,
          english: doc.data().english,
          physics: doc.data().physics,
          geography: doc.data().geography,
          chemistery: doc.data().chemistery,
          biology: doc.data().biology,
          math: doc.data().math,
          technology: doc.data().technology,
          business:doc.data().business,
          taariiq:doc.data().taariiq,
          total:doc.data().total,
          stdPercentage: doc.data().stdPercentage,
        });
      });
      setFinalExamData(list)
    });
  };
  const getMidtermExam = async () => {
    const q = query(collection(db, "midterExam"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          class: doc.data().class,
          arabic: doc.data().arabic,
          tarbiyo: doc.data().tarbiyo,
          somali: doc.data().somali,
          english: doc.data().english,
          math: doc.data().math,
          technology: doc.data().technology,
          business: doc.data().business,
          cilmigaBulshada: doc.data().cilmigaBulshada,
          total: doc.data().total,
          stdPercentage: doc.data().stdPercentage,
        });
      });
      setmidtermData(list)
    });
  };

  const getTeachers = async () => {
    const q = query(
      collection(db, "teachers"),
      orderBy("RegisteredDate", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          TeacherName: doc.data().TeacherName,
          PhoneNumber: doc.data().PhoneNumber,
          Title: doc.data().Title,
          RegisteredDate: doc.data().RegisteredDate,
        });
      });
      setTeachersData(list);
    });
  };

  const getPayments = async () => {
    const q = query(collection(db, "payments"), orderBy("datePayed", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          studentName: doc.data().studentName,
          studentClass: doc.data().studentClass,
          studentFee: doc.data().studentFee,
          datePayed: doc.data().datePayed,
          description:doc.data().description
        });
      });
      setPaymentData(list);
    });
  };

  return (
    <AppContex.Provider
      value={{
        classes,
        loading,
        studentData,
        setStudentData,
        getStudents,
        getYearMonthDay,
        setLoading,
        isopen,
        setIsOpen,
        teachersData,
        setTeachersData,
        getTeachers,
        studentClassName,
        getStudentClasses,
        getPayments,
        paymentData,
        getFinalExam,
        finalExamData,
        getMidtermExam,
        midtermData,
        user,
        setuser
      }}
    >
      {children}
    </AppContex.Provider>
  );
};
