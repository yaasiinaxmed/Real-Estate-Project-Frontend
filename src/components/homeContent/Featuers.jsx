import React from 'react'
import { features } from './featuresData'

function Features() {
  return (
    <div className='relative bottom-16'>
        <div className="container">
            {/* boxs */}
            <div className='w-full flex flex-wrap items-center justify-center gap-7'>
                {features.map((feature, index) => (
                  <div key={index} className='w-full sm:w-[340px] bg-white flex flex-col gap-2 p-7 shadow-[0px_0px_12px_rgb(0,0,0,0.1)] rounded-xl'>
                    <img src={feature.image} alt="" className='w-[3.5rem]'/>
                    <h2 className='text-xl text-HeadingColor font-medium'>{feature.title}</h2>
                    <p className='whitespace-normal text-gray-500 text-sm'>{feature.description}</p>
                  </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Features