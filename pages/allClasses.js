import Layout from '@/components/Layout';
import ProfileStudent from '@/templates/Profile/ProfileStudent';
import RegisterTeacher from '@/templates/Register/RegisterTeacher';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';




function allClasses() {

    const url = 'http://localhost:8000/api/addClass';
    const [data, setData] = useState({
        name: '',
        description: '',

    });
    function handle(e) {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
        console.log(newdata);
    }


    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOffMain, setIsLoadingOffMain] = useState(true);
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [isUserExist, setIsUserExist] = useState(false)

    const [errors, setErrors] = useState({});
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetchClasses();
    }, []);


    const handleDeleteClass = async (classsId) => {
        try {
            await axios.delete(` http://localhost:8000/api/deleteclasses/${classsId}/delete`);
            // Remove the deleted student from the state
            setClasses(classes.filter((classs) => classs.id !== classsId));
        } catch (error) {
            console.error(error);
        }
    };


    const fetchClasses = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/fetchClasses');
            setClasses(response.data.classes);
        } catch (error) {
            console.error(error);
        }
    };




    const addclass = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!data.name.trim()) {
            validationErrors.name = 'Please enter your  name ';
        }
        if (!data.description.trim()) {
            validationErrors.description = 'Please enter your description';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true);
            setIsLoadingOffMain(false);
            setIsErrorMessage(false);
            setIsUserExist(false);

            await axios
                .post(url, {
                    description: data.description,
                    name: data.name,

                })
                .then((res) => {
                    setIsLoading(false);
                    setIsLoadingOffMain(false);
                    setIsErrorMessage(false);
                    setIsUserExist(false);
                })
                .catch((error) => {
                    console.log(error.message);
                    if (error.message === 'Request failed with status code 403') {
                        setIsErrorNetwork(true);
                    }

                    if (error.message === 'Request failed with status code 400') {
                        setIsErrorMessage(true);
                    }

                    if (error.message === 'Network Errortt') {
                        setIsUserExist(true);
                    }

                    setIsLoading(false);
                    setIsLoadingOffMain(true);
                });
        }
    };




    return (
        <Layout>



            <section className="text-gray-600 body-font relative">
                <div className="container px-5 mx-auto">

                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">

                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Class Name</label>
                                    <input value={data.name}
                                        onChange={(e) => handle(e)} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                {errors.name && (
                                    <p className="text-red-500 text-sm mb-3 ">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
                                    <textarea value={data.description}
                                        onChange={(e) => handle(e)} id="description" name="description" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                                {errors.description && (
                                    <p className="text-red-500 text-sm mb-3 ">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                            <div className="p-2 w-full">
                                <button onClick={addclass} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add Class</button>
                            </div>

                        </div>

                        <div className='py-4 text-2xl'> Managing classes</div>
                        <div className='flex flex-wrap -m-2'>


                            {classes && classes.map((classs) => (

                                <div class="p-2 lg:w-1/3 md:w-1/2 w-full" key={classs.id}>
                                    <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                        <div class="flex-grow">
                                            <h2 class="text-gray-900 title-font font-medium" >{classs.name}</h2>
                                            <p class="text-gray-500">{classs.description}</p>
                                        </div>
                                        <button
                                            className="ml-auto px-4 py-2 bg-red-500 text-white rounded"
                                            onClick={() => handleDeleteClass(classs.id)}
                                        >
                                            Delete
                                        </button>


                                    </div>
                                </div>
                            ))}

                        </div>









                    </div>
                </div>
            </section>







        </Layout>
    );
}

export default allClasses;