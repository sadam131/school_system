import React, { useContext, useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import Student from "./components/students/Student";
import "react-toastify/dist/ReactToastify.css";
import Teachers from "./components/teachers/Teachers";
import Payments from "./components/payments/Payments";
import Examination from "./components/examination/Examination";
import Sidebar from "./components/sidebar/Sidebar";
import FinalExam from "./components/final exam/FinalExam";
import MidtermExam from "./components/midterm exam/MidtermExam";
import Login from "./components/login/Login";
import { auth } from "./firebase/firebase";
function App() {
  const appRef = useRef(null);
  const ProtectedRoute = ({ children }) => {
    return auth.currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <div ref={appRef} className="">
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            />
            <Route
              path="students"
              element={
                <ProtectedRoute>
                  <Student />
                </ProtectedRoute>
              }
            />
            <Route
              path="teachers"
              element={
                <ProtectedRoute>
                  <Teachers />
                </ProtectedRoute>
              }
            />
            <Route
              path="payments"
              element={
                <ProtectedRoute>
                  <Payments />
                </ProtectedRoute>
              }
            />
            <Route path="examination">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Examination />
                  </ProtectedRoute>
                }
              />
              <Route
                path="final examination"
                element={
                  <ProtectedRoute>
                    <FinalExam />
                  </ProtectedRoute>
                }
              />
              <Route
                path="midtermExam"
                element={
                  <ProtectedRoute>
                    <MidtermExam />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
