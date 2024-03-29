import Link from 'next/link';
import React from 'react';

function HomePage() {
  return (
    <div className='bg-white pb-16'>
      <section class="text-gray-600 body-font">
        <div class="container px-5 mx-auto">

          <div className="flex justify-center items-center mb-8">
            <img
              alt="ecommerce"
              class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="/images/login-security.svg"
              style={{ width: "20%", height: "20%" }}
            />
          </div>


          <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">

            <div class="p-2 sm:w-1/2 w-full">
              <Link href="/registerStudent">
                <div class="bg-gray-900 rounded flex p-4 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font font-medium text-white text-xl">Welcome As A Student</span>
                </div>

              </Link>

            </div>



            <div class="p-2 sm:w-1/2 w-full">
              <Link href="/registerTeacher">
                <div class="bg-gray-900 rounded flex p-4 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font font-medium text-white text-xl">Welcome As A Teacher</span>
                </div>

              </Link>



            </div>



          </div>
        </div>
      </section>

    </div>


  );
}

export default HomePage;