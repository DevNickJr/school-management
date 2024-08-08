"use client"
import React from 'react'
import ErrorImg from "@/assets/error-icon.png"
import Image from 'next/image'
import { UseMutationResult } from '@tanstack/react-query'
import { Button } from '../ui/button'

interface IProps<T> {
    setIsOpen: React.Dispatch<React.SetStateAction<string>>
    isOpen: string
    // onClick: () => void
    desc: string
    deleteFunc: () => void
}


const DeleteItemModal = <T,>({ isOpen, setIsOpen, desc, deleteFunc }: IProps<T>) => {
    
    React.useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = 'unset'
        }
      }, [isOpen])
      
    const closeModal = () => {
        setIsOpen("")
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
                <div onClick={handleOutsideClick} className='fixed top-0 left-0 z-30 max-h-screen min-h-screen p-4 py-40 overflow-hidden md:p-8 md:py-40 bg-black/50 h-[100vh] w-[100vw]'>
                    <div className="flex flex-col items-center w-full max-w-sm gap-5 p-4 py-8 pt-6 mx-auto overflow-hidden bg-white rounded-md md:rounded-xl">
                        <div className='w-12 h-1 bg-[#D9D9D9] rounded-full'></div>
                        <div className="flex flex-col items-center max-w-[210px] gap-3 text-center">
                            <Image src={ErrorImg} alt='Success' className='w-16 h-16 rounded-full md:w-20 md:h-20' />
                            <h2 className='text-xl font-bold text-black'>You are about to delete this file</h2>
                            <p className='mb-4 text-sm font-semibold text-[#9098A3] '>{desc}</p>
                        </div>
                        <div className="flex">
                            <Button className='w-full py-3 md:py-5 rounded-r-none max-w-56 bg-[#ED3A3A0D] text-black' onClick={() => setIsOpen("")} >
                                Cancel
                            </Button>
                            <Button className='w-full py-3 rounded-l-none md:py-5 max-w-56' onClick={() => deleteFunc()} >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
        }
        </>
    )
}

export default DeleteItemModal