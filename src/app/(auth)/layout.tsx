import React from 'react'
import Image from 'next/image'
import AuthImage from '@/assets/auth.png'
import Logo from '@/assets/logo.svg'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {

  return (
      <div className='flex w-full overflow-hidden md:h-screen'>
        <div className="relative flex-1 p-4 py-6 overflow-y-auto md:px-12">
            <Image src={Logo} alt="Auth Image" className='h-12 mb-4' />
            {children}
        </div>
        <div className="flex-1 hidden h-screen overflow-hidden md:flex">
            <Image src={AuthImage} alt="Auth Image" className='w-full h-full' />
        </div>
      </div>
  )
}

export default AuthLayout