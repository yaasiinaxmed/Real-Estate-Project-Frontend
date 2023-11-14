import React, { useEffect, useState } from 'react'

function Footer() {
  const [year, setYear] = useState();

  useEffect(() => {
    const date = new Date();
    setYear(date.getFullYear());
  }, [year]);

  return (
    <footer className='w-full bg-primaryColor'>
      <div className='container p-12 flex flex-col items-center justify-center'>
        <h2 className='font-medium text-2xl text-white'>Real Estate MarketPlace </h2>
        <p className='text-xs sm:text-sm text-center mt-9 pb-0 text-white'> © {year} Yaasiin Ahmed - All rigths reserved</p>
      </div>
    </footer>
  )
}

export default Footer