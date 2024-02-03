import Layout from '@/components/Layout';
import Link from 'next/link';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';


function RegisterTeacher() {




    const url = 'http://localhost:8000/api/registerTeacher';


    const [data, setData] = useState({

        name: '',
        address: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
    });
    function handle(e) {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
        console.log(newdata);
    }

    const router = useRouter();

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOffMain, setIsLoadingOffMain] = useState(true);
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [isUserExist, setIsUserExist] = useState(false);
    const [isErrorNetwork, setIsErrorNetwork] = useState(false);




    const rigisterTeacherr = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!data.name.trim()) {
            validationErrors.name = 'Please enter your name ';
        }
        if (!data.address.trim()) {
            validationErrors.address = 'Please enter your address';
        }

        if (!data.email.trim()) {
            validationErrors.email = 'Please enter your email';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            validationErrors.email = 'Email is Invalid';
        }

        if (data.phone === '') {
            validationErrors.phone = 'Please enter your phone number';
        } else if (!/[0-9]{10}/i.test(data.phone)) {
            validationErrors.phone = 'Phone Number is Invalid';
        }


        if (data.password === '') {
            validationErrors.password = 'Please enter your password';
        } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-]).{6,}/.test(data.password)
        ) {
            validationErrors.password =
                'At least 6 characters, one uppercase and 1 special character ';
        }

        if (data.password_confirmation === '') {
            validationErrors.password_confirmation = 'Please enter your confirm password';
        } else if (data.password_confirmation !== data.password) {
            validationErrors.password_confirmation = ' Passwords  are  not matching';
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true);
            setIsErrorMessage(false);
            setIsUserExist(false);

            await axios
                .post(url, {

                    name: data.name,
                    address: data.address,
                    email: data.email,
                    password: data.password,
                    phone: data.phone,
                    password_confirmation: data.password_confirmation,

                })
                .then((res) => {
                    router.push('/loginTeacher');
                    setIsLoading(false);
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
        <section className="text-gray-600 body-font px-14">
            <div className="container px-5  mx-auto flex flex-wrap items-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <div className="flex justify-center items-center mb-8">
                        <img
                            alt="ecommerce"
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src="/images/registerImage.jpg"
                            style={{ width: "75%", height: "75%" }}
                        />
                    </div>

                </div>
                <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
                    <div className="relative mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Full Name</label>
                        <input type="text" id="name" onChange={(e) => handle(e)} value={data.name}

                            name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        {errors.name && (
                            <p className="text-red-500 text-sm mb-3 ">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" value={data.email}
                            onChange={(e) => handle(e)} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        {errors.email && (
                            <p className="text-red-500 text-sm mb-3 ">
                                {errors.email}
                            </p>
                        )}
                    </div>



                    <div className="relative mb-4">
                        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Adress</label>
                        <input type="text" value={data.address}
                            onChange={(e) => handle(e)} id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        {errors.address && (
                            <p className="text-red-500 text-sm mb-3 ">
                                {errors.address}
                            </p>
                        )}
                    </div>









                    <div className="relative mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input type="text" value={data.password}
                            onChange={(e) => handle(e)} id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        {errors.password && (
                            <p className="text-red-500 text-sm mb-3 ">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="relative mb-4">
                        <label htmlFor="password_confirmation" className="leading-7 text-sm text-gray-600">Confirm Password</label>
                        <input type="text" value={data.password_confirmation}
                            onChange={(e) => handle(e)} id="password_confirmation" name="password_confirmation" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        {errors.password_confirmation && (
                            <p className="text-red-500 text-sm mb-3 ">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    <div className="relative mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="text" value={data.phone}
                            onChange={(e) => handle(e)} id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mb-3 ">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <button onClick={rigisterTeacherr} className="text-white bg-gray-900 border-0 py-2 px-8 focus:outline-none hover:bg-gray-700 rounded text-lg">
                        Register
                    </button>
                    <div className='flex'>
                        <div className="text-ms text-gray-500 mt-3">Do you have an account?  </div>
                        <Link href="/loginTeacher">
                            <div className="text-sm text-indigo-500 mt-3">

                                Login

                            </div>

                        </Link>



                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegisterTeacher;