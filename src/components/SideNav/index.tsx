'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TbLogout2  } from 'react-icons/tb'
import { apiLogout } from '@/services/AuthService'
import { ILogout, INav } from '@/interfaces'
import { useRouter } from 'next/navigation'
import Loader from '../Loader'
import Image from 'next/image'
import Profile from "@/assets/auth.png"
import useMutate from '@/hooks/useMutate'
import { useAuthContext } from '@/hooks/useAuthContext'
import LogoutModal from '../LogoutModal.tsx'


const SideNav = ({ nav }: { nav: INav[] }) => {
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
    <div className={`md:flex w-full justify-between hidden max-h-screen min-h-screen h-screen text-black bg-white ${collapse ? "max-w-20 pl-3 pb-0" : "max-w-64 pl-6 pb-0"} transition-all`}>
        {(logoutMutation?.isPending) && <Loader />}
        <LogoutModal
            logout={() => logoutMutation.mutate({
                refresh_token: context.refreshToken!,
                role: context.role!
            })}
            isOpen={logoutModalIsOpen} 
            setIsOpen={setLogoutModalOpen} 
        />
        <div className='rounded-2xl border border-[#FBF4F4] py-6 pb-0 w-full'>

            <div className='h-full overflow-hidden'>
                <div className={`flex flex-col items-center gap-3 mb-10`}>
                    <Image src={Profile} alt={""} className='w-20 h-20 rounded-full cursor-pointer' />
                    <div className="flex flex-col items-center gap-1.5">
                        <h3 className={`text-xl font-bold`}>{context.name}</h3>
                        <p className='text-xs text-black/70'>{context.role} Account</p>
                    </div>
                </div>
                <div className='flex flex-col justify-between h-full overflow-scroll text-sm pb-52 font-inter'>
                    <div className="">
                        {
                            nav?.map((navSection, index) => (
                                <div key={navSection.id} className={`${collapse ? "" : index===nav.length-1 ? "" : "border-b mb-6 pb-5"} px-4`}>
                                    {
                                        navSection.title &&
                                            <h4 className={`${collapse ? "invisible" : ""} mb-5 text-xs uppercase`}>{navSection.title}</h4>
                                    }
                                    <div className='flex flex-col gap-3'>
                                        {
                                            navSection.navItems?.map((navItem, index) => (
                                                <Link key={navItem.id} href={navItem.link} className={`flex items-center gap-3 cursor-pointer rounded-md px-4 py-2.5 whitespace-nowrap ${collapse ? "justify-center" : ""} ${(pathname.includes(navItem.link) && !navItem.root) ? "bg-primary text-white font-semibold" : ((pathname==="/dashboard" || pathname==="/teachers") && !!navItem.root) ? "bg-primary text-white font-semibold" : ""}`}>
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
                    </div>
                    <button onClick={() => setLogoutModalOpen(true)} className={`flex items-center gap-3 cursor-pointer font-medium rounded-md px-4 py-2.5 whitespace-nowrap text-[#F10A0A] mt-3 ml-4`}>
                        <TbLogout2 className={"text-lg"} />
                        <span className={`${collapse && "hidden"}`}>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SideNav