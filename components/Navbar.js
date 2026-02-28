import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='py-2 px-15 fixed top-0 w-full bg-[#191919] flex justify-center items-center'>
            <div className='w-full flex justify-between items-center'>
                <div><Image src='/logo_dark-removebg-preview.png' alt='BuyMeABoost logo' width={75} height={50} className='w' /></div>
                <div className=''>
                    <ul className='navLinks flex list-none text-[18px]'>
                        <li><Link className='navLinkItem' href={""}>Home</Link></li>
                        <li><Link className='navLinkItem' href={""}>About</Link></li>
                        <li><Link className='bg-[#d5ba80] duration-200 hover:brightness-90 brightness-110 text-black font-medium py-3 px-5 rounded-2xl' href={""}>Sign In</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
