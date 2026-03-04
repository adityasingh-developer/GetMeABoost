import Image from 'next/image';
import React from 'react'

const Username = async ({ params }) => {
  const { username } = await params;
  return (
    <div className=''>
      <div className='relative'>
        <Image src="/dummyBanner.jpeg" alt={username} width={1400} height={100} className='w-full h-100' />
        <Image src="/king.jpg" alt={username} width={160} height={100} className='absolute rounded-full border-6 box shadow-[0_0_0_0.7rem_#222] border-[#111] left-[46%] -bottom-17' />
      </div>
      <div className='flex flex-col gap-3 items-center'>
        <div>
          <h1 className='text-center mt-19 text-4xl font-medium'>{username}</h1>
          <p className='text-center text-xl text-neutral-200'>Description of {username}</p>
          <p className='text-center text-xl text-neutral-200'>Additional information about {username}</p>
        </div>
        <div className='flex gap-4'>
          <button className='bg-[#d5ba80] duration-200 cursor-pointer hover:brightness-120 text-black font-bold py-3 text-lg px-7 rounded-xl'>
            Support {username}
          </button>
          <button className='border border-[#d5ba80] duration-200 cursor-pointer hover:bg-[#d5ba80] hover:text-black font-bold py-3 text-lg px-7 rounded-xl'>
            Follow {username}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Username