"use client"
import Image from 'next/image'
import React from 'react'
import WelcomeImg from '@/assets/welcome.svg'
import Link from 'next/link'
const Dashboard = () => {

  return (
    <>
        <div className="flex flex-col gap-5">
          <h1 className='text-xl text-center md:text-3xl text-black/70 font-argentinum'>Welcome to your Dashboard</h1>
          <div className="flex justify-center">
            <Image src={WelcomeImg} alt='welcome image' className='max-h-72' />
          </div>
          <p className='text-sm text-center md:text-base text-black/70 font-argentinum'>Easily manage staff and student information from a central hub</p>
        </div>

        {/* <Table<ICandidate> data={data} columns={columns} className={''} /> */}
        
        {/* Manage Teacher and Student Cards */}
        <section className="grid grid-cols-1 gap-5 mt-8 mb-8 sm:grid-cols-2">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">Manage Teachers Info</h3>
            <p className="mb-6 text-gray-600">View, add and edit teacher details.</p>
            <Link href="/dashboard/teachers" className="px-4 py-2 text-sm text-white rounded bg-primary hover:bg-primary/80">
              View Teachers
            </Link>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">Manage Student Info</h3>
            <p className="mb-6 text-gray-600">Register, View and edit student profiles.</p>
            <Link href="/dashboard/students" className="px-4 py-2 text-sm text-white rounded bg-primary hover:bg-primary/80">
              View Students
            </Link>
          </div>
        </section>
        
      </>
  )
}

export default Dashboard
