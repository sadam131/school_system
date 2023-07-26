import React, { useContext, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { useMemo } from "react";
import {
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Delete, Edit, Update } from "@mui/icons-material";
import { useCallback } from "react";
import PopupModel from "../model/PopupModel";
import { AppContex } from "../../context/schoolcontext";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";

function InformationTable({
  teacher,
  teacher_columns,
  data,
  payment,
  payment_columns,
  paymentData,
  student,
  finalExam,
  finalExamData,
  finalExam_columns,
  midterm,
  midterExam_columns,
  midtermData
}) {
  const {
    studentData,
    setStudentData,
    getStudents,
    getTeachers,
    teachersData,
    setPaymentData,
  } = useContext(AppContex);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getStudents();
  }, []);

  useEffect(() => {
    getTeachers();
  }, [teacher]);

  //const [createModalOpen, setCreateModalOpen] = useState(false);

  const columns = useMemo(
    () => [
      { accessorKey: "fullName", header: "fullName" },
      { accessorKey: "stdClass", header: "class" },
      { accessorKey: "parentName", header: "parentName", size: 80 },
      { accessorKey: "parentPhone", header: "parentphone" },
      { accessorKey: "address", header: "address", size: 80 },
      { accessorKey: "timeCreated", header: "registered time", size: 80 },
    ],
    []
  );

  const handleDeleteRow = useCallback((row) => {
    if (finalExam) {
      if (!confirm(`Are you sure you want to delete ${row.getValue("name")}`)) {
        return;
      }
      deleteDoc(doc(db, "finalExam", row.original.id));
      toast.success("Exam deleted successfuly");
    }
    if (midterm) {
      if (!confirm(`Are you sure you want to delete ${row.getValue("name")}`)) {
        return;
      }
      deleteDoc(doc(db, "midterExam", row.original.id));
      toast.success("midterm exam deleted successfuly");
    }
    if (student) {
      //delete student
      if (
        !confirm(`Are you sure you want to delete ${row.getValue("fullName")}`)
      ) {
        return;
      }
      deleteDoc(doc(db, "students", row.original.id));
      toast.success("student deleted successfuly");
    }

    if (teacher) {
      //delete student
      if (
        !confirm(
          `Are you sure you want to delete ${row.getValue("TeacherName")}`
        )
      ) {
        return;
      }
      deleteDoc(doc(db, "teachers", row.original.id));
      toast.success("teacher deleted successfuly");
    }
    if (payment) {
      //delete student
      if (
        !confirm(
          `Are you sure you want to delete ${row.getValue("studentName")}`
        )
      ) {
        return;
      }
      deleteDoc(doc(db, "payments", row.original.id));
      toast.success("payment deleted successfuly");
    }
  }, []);

  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    if (finalExam) {
      let updatedStudent = (setStudentData[row.index] = values);
      const subarr = [
        updatedStudent.arabic,
        updatedStudent.tarbiyo,
        updatedStudent.somali,
        updatedStudent.math,
        updatedStudent.geography,
        updatedStudent.physics,
        updatedStudent.chemistery,
        updatedStudent.biology,
        updatedStudent.taariiq,
        updatedStudent.technology,
        updatedStudent.business,
        updatedStudent.english,
      ];
      let total = 0;
      subarr.map((sub) => {
        let subNumber = Number(sub);
        return (total += subNumber);
      });
      let percentage = total / 12;
      let per = Math.floor(percentage * 10) / 10;

      const studentRef = doc(db, "finalExam", row.original.id);
      await updateDoc(studentRef, {
        name: updatedStudent.name,
        class: updatedStudent.class,
        arabic: updatedStudent.arabic,
        tarbiyo: updatedStudent.tarbiyo,
        somali: updatedStudent.somali,
        english: updatedStudent.english,
        math: updatedStudent.math,
        geography: updatedStudent.geography,
        physics: updatedStudent.physics,
        chemistery: updatedStudent.chemistery,
        biology: updatedStudent.biology,
        technology: updatedStudent.technology,
        business: updatedStudent.business,
        taariiq: updatedStudent.taariiq,
        total: total,
        stdPercentage: per,
      });
      toast.success("exam updated successfuly");
      exitEditingMode();
    }
    if (midterm) {
      let updatedStudent = (setStudentData[row.index] = values);
      const subarr = [
        updatedStudent.arabic,
        updatedStudent.tarbiyo,
        updatedStudent.somali,
        updatedStudent.math,
        updatedStudent.cilmigaBulshada,
        updatedStudent.technology,
        updatedStudent.business,
        updatedStudent.english,
      ];
      let total = 0;
      subarr.map((sub) => {
        let subNumber = Number(sub);
        return (total += subNumber);
      });
      let percentage = total / 8;
      let per = Math.floor(percentage * 10) / 10;

      const studentRef = doc(db, "midterExam", row.original.id);
      await updateDoc(studentRef, {
        name: updatedStudent.name,
        class: updatedStudent.class,
        arabic: updatedStudent.arabic,
        tarbiyo: updatedStudent.tarbiyo,
        somali: updatedStudent.somali,
        english: updatedStudent.english,
        math: updatedStudent.math,
        technology: updatedStudent.technology,
        business: updatedStudent.business,
        cilmigaBulshada: updatedStudent.cilmigaBulshada,
        total: total,
        stdPercentage: per,
      });
      toast.success("exam updated successfuly");
      exitEditingMode();
    }
    if (student) {
      const updatedStudent = (setStudentData[row.index] = values);
      const studentRef = doc(db, "students", row.original.id);
      await updateDoc(studentRef, {
        fullName: updatedStudent.fullName,
        stdClass: updatedStudent.stdClass,
        parentName: updatedStudent.parentName,
        parentPhone: updatedStudent.parentPhone,
        address: updatedStudent.address,
        timeCreated: updatedStudent.timeCreated,
      });
      toast.success("student updated successfuly");
      exitEditingMode();
    }

    if (teacher) {
      const updatedTeacher = (setStudentData[row.index] = values);
      console.log(updatedTeacher);
      const studentRef = doc(db, "teachers", row.original.id);
      await updateDoc(studentRef, {
        TeacherName: updatedTeacher.TeacherName,
        PhoneNumber: updatedTeacher.PhoneNumber,
        Title: updatedTeacher.Title,
        RegisteredDate: updatedTeacher.RegisteredDate,
      });
      toast.success("Teacher updated successfuly");
      exitEditingMode();
    }

    if (payment) {
      const updatedPayment = (setStudentData[row.index] = values);
      console.log(updatedPayment);
      const studentRef = doc(db, "payments", row.original.id);
      await updateDoc(studentRef, {
        studentName: updatedPayment.studentName,
        studentClass: updatedPayment.studentClass,
        studentFee: updatedPayment.studentFee,
        datePayed: updatedPayment.datePayed,
      });
      toast.success("Teacher updated successfuly");
      exitEditingMode();
    }
  };

  if (teacher) {
    return (
      <div className="w-[98%] mx-auto mt-6">
        <MaterialReactTable
          columns={teacher_columns}
          data={teachersData}
          enableEditing
          onEditingRowSave={handleSaveRow}
          enableRowSelection
          positionActionsColumn="last"
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="right" title="update">
                <IconButton
                  color="success"
                  onClick={() => table.setEditingRow(row)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              color="success"
              onClick={() => setOpen(true)}
              variant="contained"
            >
              register new teacher
            </Button>
          )}
        />
        <PopupModel teacher={teacher} open={open} setOpen={setOpen} />
      </div>
    );
  }
  if (finalExam) {
    return (
      <div className="w-[98%] mx-auto mt-6">
        <MaterialReactTable
          columns={finalExam_columns}
          data={finalExamData}
          enableEditing
          onEditingRowSave={handleSaveRow}
          enableRowSelection
          positionActionsColumn="last"
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="right" title="update">
                <IconButton
                  color="success"
                  onClick={() => table.setEditingRow(row)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              color="success"
              onClick={() => setOpen(true)}
              variant="contained"
            >
              register final exams
            </Button>
          )}
        />
        <PopupModel finalExam={finalExam} open={open} setOpen={setOpen} />
      </div>
    );
  }
  if (midterm) {
    return (
      <div className="w-[98%] mx-auto mt-6">
        <MaterialReactTable
          columns={midterExam_columns}
          data={midtermData}
          enableEditing
          onEditingRowSave={handleSaveRow}
          enableRowSelection
          positionActionsColumn="last"
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="right" title="update">
                <IconButton
                  color="success"
                  onClick={() => table.setEditingRow(row)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              color="success"
              onClick={() => setOpen(true)}
              variant="contained"
            >
              register midterm exams
            </Button>
          )}
        />
        <PopupModel midterm={midterm} open={open} setOpen={setOpen} />
      </div>
    );
  }
  if (payment) {
    return (
      <div className="w-[98%] mx-auto mt-6">
        <MaterialReactTable
          columns={payment_columns}
          data={paymentData}
          enableEditing
          onEditingRowSave={handleSaveRow}
          enableRowSelection
          positionActionsColumn="last"
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="right" title="update">
                <IconButton
                  color="success"
                  onClick={() => table.setEditingRow(row)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              color="success"
              onClick={() => setOpen(true)}
              variant="contained"
            >
              register new payment
            </Button>
          )}
        />
        <PopupModel payment={payment} open={open} setOpen={setOpen} />
      </div>
    );
  }
  if (student) {
    return (
      <div className="w-[98%] mx-auto mt-6">
        <MaterialReactTable
          columns={columns}
          data={studentData}
          enableEditing
          onEditingRowSave={handleSaveRow}
          enableRowSelection
          positionActionsColumn="last"
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="right" title="update">
                <IconButton
                  color="success"
                  onClick={() => table.setEditingRow(row)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              color="success"
              onClick={() => setOpen(true)}
              variant="contained"
            >
              register new student
            </Button>
          )}
        />
        <PopupModel student={student} open={open} setOpen={setOpen} />
      </div>
    );
  }
}

export default InformationTable;
