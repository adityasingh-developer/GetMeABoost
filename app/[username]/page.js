import Image from 'next/image';
import React from 'react'

const Username = async ({ params }) => {
    const { username } = await params;
  return (
    <div className=''>
      <div className='relative'>
        <Image src="/dummyBanner.jpeg" alt={username} width={1400} height={100} className='w-full h-100' />
        <div className='overlay -bottom-24 left-[46.1%] rounded-full absolute w-44 h-44 bg-[#222222]'></div>
        <Image src="/king.jpg" alt={username} width={160} height={100} className='absolute rounded-full border-6 border-[#111] left-[46.5%] -bottom-22' />
      </div>
    </div>
  )
}

export default Username