import React from 'react'
import HouseImg from "@/assets/logo.svg"
import Image, { StaticImageData } from 'next/image'
import { MdAdd } from 'react-icons/md'
import { LineWave } from 'react-loader-spinner'
import Button from '../Button'

interface IProps {
    onClick: () => void
    image: StaticImageData
    desc: string
    buttonText?: string
    isLoading: boolean
}

const NoResult = ({ onClick, image, desc, buttonText, isLoading }: IProps) => {
  return (
    <div className='flex flex-col items-center justify-center h-full gap-4 p-12 py-16 text-center md:py-32 md:flex-1'>
       {
        isLoading ? 
            <LineWave
                visible={true}
                height="100"
                width="100"
                color='#089C4C'
                ariaLabel="line-wave-loading"
                wrapperStyle={{}}
                wrapperClass=""
                firstLineColor=""
                middleLineColor=""
                lastLineColor=""
            />
            :
            <div className='flex flex-col items-center justify-center gap-2 max-w-64'>
                <div className='mb-5 p-4 rounded-full border bg-[#F4F5FA] border-[#E1E2E9] flex justify-center items-center'>
                    <Image src={image || HouseImg} alt='no data' className='w-10 h-10' />
                </div>
                <span className='text-lg font-semibold'>No Result</span>
                <span className='text-sm text-black/30'>{desc}</span>
                {
                    buttonText && 
                    <Button onClick={onClick} className='flex items-center gap-2 p-2 px-4 mt-2 text-xs text-white md:px-4 w-fit rounded-xl bg-primary'>
                        <MdAdd className="text-lg text-white" />
                        <span>{buttonText}</span>
                    </Button>
                }
            </div>
       }
    </div>
  )
}

export default NoResult