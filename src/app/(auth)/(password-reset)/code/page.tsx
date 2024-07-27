'use client'
import Link from 'next/link'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const ConfirmOtp = () => {
  
  return (
    <div className='pt-12 md:pl-24'>
      <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20">
                <AiOutlineArrowLeft className='w-8 h-8 text-primary' />
            </div>
          <h1 className='text-2xl font-bold'>Reset Password</h1>
          <p className='text-sm'>We have sent a password reset code to  <span className="font-semibold">Jonathanab @gmail.com</span></p>
      </div>
      <form action="" className="max-w-l">
        <div className='flex justify-center gap-3 text-xs'>
          {[1,2,3,4].map((_, i) => (
            <input key={i} type="text" name="name" id="name" className='w-16 h-16 p-3 border border-gray-300 rounded-md placeholder:text-sm' placeholder='' />
          ))}
        </div>
        <button type='submit' className='flex items-center justify-center w-full gap-2 p-4 pl-5 pr-6 mt-12 mb-8 text-sm font-bold text-white rounded-md bg-primary'>
          Reset Password
        </button>
        <div className="flex flex-col gap-6 text-sm">
          <div className='flex items-center justify-center gap-2'>
              <p>Didn’t receive the mail?</p>
              <Link href='/forgot-password' className='text-sm text-primary'>
                Click here to resend
              </Link>
          </div>
          <div className='flex items-center justify-center gap-2'>
              <AiOutlineArrowLeft className='' />
              <Link href='/forgot-password' className='text-sm font-semibold'>
                  Back to Login
              </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ConfirmOtp