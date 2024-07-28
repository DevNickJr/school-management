'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TbLogout2  } from 'react-icons/tb'
import { apiLogout } from '@/services/AuthService'
import { ILogout } from '@/interfaces'
import { useRouter } from 'next/navigation'
import Loader from '../Loader'
import { navItems } from '@/constants'
import Image from 'next/image'
import Profile from "@/assets/auth.png"
import useMutate from '@/hooks/useMutate'
import { useAuthContext } from '@/hooks/useAuthContext'
import LogoutModal from '../LogoutModal.tsx'


const SideNav = ({ }) => {
    const [collapse, setCollapse] = useState(false)
    const context = useAuthContext()
    const router = useRouter()
    const [logoutModalIsOpen, setLogoutModalOpen] = useState(false)

    // console.log({context})


    const pathname = usePathname();
    
    const logoutMutation = useMutate<ILogout, any>(
        apiLogout,
        {
        onSuccess: (data) => {
            console.log("data", data)

            setLogoutModalOpen(false)
    
            context.dispatch({ type: "LOGOUT", payload: null})
            
            //   toast.success("Logged out Successfully.")
            return router.push('/')
        },
        showErrorMessage: true,
        }
    )
  

  return (
    <div className={`sm:flex w-full justify-between hidden max-h-screen min-h-screen h-screen text-black bg-white ${collapse ? "max-w-20 pl-3 pb-0" : "max-w-64 pl-6 pb-0"} transition-all`}>
        {(logoutMutation?.isPending) && <Loader />}
        <LogoutModal
            logout={() => logoutMutation.mutate({
                refresh_token: context.refreshToken!,
                userType: context.userType!
            })}
            isOpen={logoutModalIsOpen} 
            setIsOpen={setLogoutModalOpen} 
        />
        <div className='rounded-2xl border border-[#FBF4F4] py-6 pb-0 w-full'>

            <div className='h-full overflow-hidden'>
                {/* <div className={`flex items-center gap-1 ${collapse ? "justify-center mb-6" : "justify-between mb-12"}`}>
                    <h3 className={`${collapse ? "text-xs hidden" : "text-lg"} font-bold`}>Zerutram</h3>
                    {
                        collapse ? 
                        <MdChevronRight className="text-2xl cursor-pointer" onClick={() => setCollapse(prev => !prev)} />
                        :
                        <MdChevronLeft className="text-2xl cursor-pointer" onClick={() => setCollapse(prev => !prev)} />
                    }
                </div> */}
                <div className={`flex flex-col items-center gap-3 mb-10`}>
                    <Image src={Profile} alt={""} className='w-20 h-20 rounded-full cursor-pointer' />
                    <div className="flex flex-col items-center gap-1.5">
                        <h3 className={`text-xl font-bold`}>John Philip</h3>
                        <p className='text-xs text-black/70'>Operator</p>
                    </div>
                </div>
                <div className='h-full overflow-scroll text-sm pb-52 font-inter'>
                    {
                        navItems?.map((navSection, index) => (
                            <div key={navSection.id} className={`${collapse ? "" : index===navItems.length-1 ? "" : "border-b mb-6 pb-5"} px-4`}>
                                {
                                    navSection.title &&
                                        <h4 className={`${collapse ? "invisible" : ""} mb-5 text-xs uppercase`}>{navSection.title}</h4>
                                }
                                <div className='flex flex-col gap-3'>
                                    {
                                        navSection.navItems?.map((navItem, index) => (
                                            <Link key={navItem.id} href={navItem.link} className={`flex items-center gap-3 cursor-pointer rounded-md px-4 py-2.5 whitespace-nowrap ${collapse ? "justify-center" : ""} ${(pathname.includes(navItem.link) && navItem.link !== "/dashboard") ? "bg-secondary text-white font-semibold" : (pathname==="/dashboard" && navItem.link==="/dashboard") ? "bg-secondary text-white font-semibold" : ""}`}>
                                                <div>
                                                    <navItem.Icon className={"text-lg"} />
                                                </div>
                                                <span className={`${collapse && "hidden"}`}>{navItem.title}</span>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                        
                    }
                    <button onClick={() => setLogoutModalOpen(true)} className={`flex items-center gap-3 cursor-pointer font-medium rounded-md px-4 py-2.5 whitespace-nowrap text-[#F10A0A] mt-3 ml-4`}>
                        <TbLogout2 className={"text-lg"} />
                        <span className={`${collapse && "hidden"}`}>Logout</span>
                    </button>
                </div>
                {/* <div className='flex flex-col p-2 rounded-md gap-0.5 text-sm bg-white'>
                    {
                        navItems?.map((navItem, index) => (
                            <Link key={navItem.id} href={navItem.link} className={`flex items-center gap-2 cursor-pointer font-medium rounded-md px-4 py-4 whitespace-nowrap ${pathname===navItem.link ? "bg-danger text-white" : index === (navItems.length - 1) ? "" : "md:border-b border-[#C5DEC5]"}`}>
                                <navItem.Icon size={"1.3rem"} />
                                {navItem.title}
                            </Link>
                        ))
                    }
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default SideNav