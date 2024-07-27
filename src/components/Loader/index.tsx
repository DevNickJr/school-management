import React from 'react'
import { BallTriangle } from 'react-loader-spinner'


const Loader = () => {
  return (
    <>
        <div className='backdrop-blur-[1.5px] bg-black/40 fixed top-0 left-0 w-full h-full z-50'>
            <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full'>
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color={"#287CD8"}
                    ariaLabel="ball-triangle-loading"
                    // wrapperClass={''}
                    // wrapperStyle={{

                    // }}
                    visible={true}
                />
            </div>
        </div>
    </>    
  )
}

export default Loader