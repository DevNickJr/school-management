"use client"
import React, { useEffect } from 'react'
import { Poppins } from 'next/font/google'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { toast } from 'react-toastify'
import { useAuthContext } from '@/hooks/useAuthContext'
import SideNav from '@/components/SideNav'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})


const DashboardLayout = ({ children }: { children: React.ReactNode }) => { 
  const context = useAuthContext()

  const router = useRouter()

  // useEffect(() => {
  //   if (!context.isLoggedIn) {
  //     toast.info("Login to Access your Dashboard")
  //     router.push('/')
  //   }
  // }, [context.isLoggedIn, router])
  

  return (
    <div className={`flex w-full h-screen overflow-hidden font-poppins bg-white`}> 
      <SideNav />
      <div className="relative flex-1 overflow-y-auto rounded-md">
        <Header />
        <div className='h-full p-4 pt-6 md:p-8'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout