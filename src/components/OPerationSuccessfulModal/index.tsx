"use client"
import Button from '@/components/Button'
import React from 'react'
import SuccessImg from "@/assets/auth.png"
import Image from 'next/image'

interface IProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
    // onClick: () => void
    desc: string
}


const OPerationSuccessfulModal = ({ isOpen, setIsOpen, desc }: IProps) => {
    
    React.useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = 'unset'
        }
      }, [isOpen])
      
    const closeModal = () => {
        setIsOpen(false)
        document.body.style.overflow = 'unset'
    }
    
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          if (e.target === e.currentTarget) {
              closeModal()
          }
    }
       
    

    return (
        <>
        {
            isOpen &&
                <div onClick={handleOutsideClick} className='fixed top-0 left-0 z-50 max-h-screen min-h-screen p-4 py-40 overflow-hidden md:p-8 md:py-40 bg-black/50 h-[100vh] w-[100vw]'>
                    <div className="flex flex-col items-center w-full max-w-sm p-4 py-8 pt-6 mx-auto overflow-hidden bg-white rounded-md gap-7 md:rounded-xl">
                        <div className='w-12 h-1 bg-[#D9D9D9] rounded-full'></div>
                        <div className="flex flex-col items-center max-w-[145px] gap-4 text-center">
                            <Image src={SuccessImg} alt='Success' className='w-20 h-20 rounded-full' />
                            <h2 className='text-3xl font-bold text-black'>Added Successfully</h2>
                            <p className='mb-4 text-sm font-semibold text-[#9098A3]'>{desc}</p>
                        </div>
                        <Button variant='wide' className='w-full max-w-56' onClick={() => setIsOpen(false)} >
                            Continue
                        </Button>
                    </div>
                </div>
        }
        </>
    )
}

export default OPerationSuccessfulModal