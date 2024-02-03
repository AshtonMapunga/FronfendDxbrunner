import Layout from '@/components/Layout';
import Link from 'next/link';
import React from 'react';

function ProfileTeacher() {
    return (


        <section className="text-gray-600 body-font pb-24">
            <div className="container px-5 py-14 mx-auto">

                <p className="leading-relaxed text-base text-3xl">Management on the system.</p>

                <div className="flex flex-wrap -m-4">
                    <div className="xl:w-1/3 md:w-1/2 p-4">
                        <div className="border border-gray-200 p-6 rounded-lg">
                            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                                <Link href="/allTeachers">
                                    Teachers
                                </Link>
                            </h2>
                            <p className="leading-relaxed text-base">Manage the teachers of the school.</p>
                        </div>
                    </div>
                    <div className="xl:w-1/3 md:w-1/2 p-4">
                        <div className="border border-gray-200 p-6 rounded-lg">
                            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                                <Link href="/allClasses">
                                    Classes
                                </Link>
                            </h2>
                            <p className="leading-relaxed text-base">Manage the classes of the school.</p>
                        </div>
                    </div>
                    <div className="xl:w-1/3 md:w-1/2 p-4">
                        <div className="border border-gray-200 p-6 rounded-lg">
                            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                                <Link href="/allStudents">
                                    Students
                                </Link>
                            </h2>
                            <p className="leading-relaxed text-base">Manage the students of the school.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>



    );
}

export default ProfileTeacher;