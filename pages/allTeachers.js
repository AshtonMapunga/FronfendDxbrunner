import Layout from '@/components/Layout';
import LoginStudent from '@/templates/Login/LoginStudent';
import RegisterTeacher from '@/templates/Register/RegisterTeacher';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function allTeachers() {




    //ddd

    const [open, setOpen] = React.useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [students, setStudents] = useState([]);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);


    const handleUpdateStudent = async (updatedStudent) => {
        try {
            await axios.put(`http://localhost:8000/api/updatestudents/${updatedStudent.id}`, updatedStudent);
            // Update the student in the state
            setStudents(students.map((student) => (student.id === updatedStudent.id ? updatedStudent : student)));
            handleCloseUpdateDialog();
        } catch (error) {
            console.error(error);
        }
    };


    const handleDeleteStudent = async (studentId) => {
        try {
            await axios.delete(` http://localhost:8000/api/deleteteachers/${studentId}/delete`);
            // Remove the deleted student from the state
            setStudents(students.filter((student) => student.id !== studentId));
        } catch (error) {
            console.error(error);
        }
    };


    const handleOpenUpdateDialog = (student) => {
        setSelectedStudent(student);
        setIsUpdateDialogOpen(true);
    };

    // Handle closing the update dialog
    const handleCloseUpdateDialog = () => {
        setSelectedStudent(null);
        setIsUpdateDialogOpen(false);
    };




    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        setOpen(true);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/fetchTeachers');
            setStudents(response.data.students);
        } catch (error) {
            console.error(error);
        }
    };






    return (


        <Layout>


            <section class="text-gray-600 body-font mb-20">
                <div class="container px-5  mx-auto">
                    <div class="flex flex-col text-center w-full mb-8">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Our Teacher</h1>
                    </div>
                    <div class="flex flex-wrap -m-2">



                        {students.map((student) => (

                            <div class="p-2 lg:w-1/3 md:w-1/2 w-full" key={student.id}>
                                <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">
                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </div>
                                    <div class="flex-grow">
                                        <h2 class="text-gray-900 title-font font-medium" onClick={() => handleSelectStudent(student)}>{student.name}</h2>
                                        <p class="text-gray-500">{student.email}</p>
                                    </div>
                                    <button
                                        className="ml-auto px-4 py-2 bg-red-500 text-white rounded"
                                        onClick={() => handleDeleteStudent(student.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                        onClick={() => handleOpenUpdateDialog(student.id)}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

//update






















                    {selectedStudent && (
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Use Google's location service?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <h2 className="text-gray-900 title-font font-medium">{selectedStudent.name}</h2>
                                    <p className="text-gray-500">{selectedStudent.email}</p>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button onClick={handleClose} autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    )}













                </div>
            </section>
        </Layout>

    );
}

export default allTeachers;