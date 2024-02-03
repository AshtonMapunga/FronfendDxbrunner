import Layout from '@/components/Layout';
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';





function LoginTeacher() {
    const url = 'http://localhost:8000/api/loginTeacher';
    const [data, setData] = useState({

        email: '',
        password: '',

    });
    function handle(e) {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
        console.log(newdata);
    }

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOffMain, setIsLoadingOffMain] = useState(true);
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [errors, setErrors] = useState({});

    const loginTeacherr = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!data.email.trim()) {
            validationErrors.email = 'Please enter your email';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            validationErrors.email = 'Email is Invalid';
        }




        if (data.password === '') {
            validationErrors.password = 'Please enter your password';
        } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-]).{6,}/.test(data.password)
        ) {
            validationErrors.password =
                'At least 6 characters, one uppercase and 1 special character ';
        }


        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true);
            setIsLoadingOffMain(false);
            setIsErrorMessage(false);

            await axios
                .post(url, {

                    email: data.email,
                    password: data.password,

                })
                .then((res) => {

                    const token = res.token;
                    console.log(token);

                    router.push('/profileTeacher');
                    localStorage.setItem('token', token);
                    setIsLoading(false);
                    setIsLoadingOffMain(false);
                    setIsErrorMessage(false);
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
        <section class="text-gray-600 body-font px-14">
            <div class="container px-5  mx-auto flex flex-wrap items-center">
                <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <div className="flex justify-center items-center mb-8">
                        <img
                            alt="ecommerce"
                            class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src="/images/registerImage.jpg"
                            style={{ width: "75%", height: "75%" }}
                        />
                    </div>
                </div>
                <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                    <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>

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
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input type="text" value={data.password}
                            onChange={(e) => handle(e)} id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        {errors.password && (
                            <p className="text-red-500 text-sm mb-3 ">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <button onClick={loginTeacherr} class="text-white bg-gray-900 border-0 py-2 px-8 focus:outline-none hover:bg-gray-700 rounded text-lg">
                        Login
                    </button>
                    <div className='flex'>
                        <div class="text-ms text-gray-500 mt-3">Create an account?  </div>
                        <Link href="/registerTeacher">
                            <div class="text-sm text-indigo-500 mt-3">

                                Register

                            </div>

                        </Link>



                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginTeacher;