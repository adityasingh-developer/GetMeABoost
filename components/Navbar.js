"use client";

import Image from 'next/image'
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {
    const pathname = usePathname();
    const shouldHideNavbar = pathname === "/privacy" || pathname === "/terms";
    const avatarColors = [
        'bg-red-500',
        'bg-orange-500',
        'bg-yellow-500',
        'bg-green-500',
        'bg-teal-500',
        'bg-blue-500',
        'bg-violet-500',
        'bg-pink-500',
    ];
    const { data: session } = useSession();
    const getAvatarData = (user) => {
        const identifier = user?.name || user?.email || 'U';
        const initial = session?.user?.name
            ? session.user.name
                .split(" ")
                .map(word => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()
            : "U";
        const seed = identifier
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const backgroundColorClass = avatarColors[seed % avatarColors.length];
        const title = user?.name || user?.email || 'User';

        return { initial, backgroundColorClass, title };
    };
    const { initial, backgroundColorClass, title } = getAvatarData(session?.user);

    if (shouldHideNavbar) {
        return <></>;
    }

    return (
        <nav className='py-2 px-15 fixed top-0 z-10 w-full bg-[#191919] flex justify-center items-center'>
            <div className='w-full flex justify-between items-center'>
                <div><Image src='/logo_dark-removebg-preview.png' alt='BuyMeABoost logo' width={75} height={35} /></div>
                <div className=''>
                    <ul className='navLinks flex list-none items-center text-[18px]'>
                        <li><Link className='navLinkItem' href="/">Home</Link></li>
                        <li><a href="https://itsaditya.vercel.app" target='_blank' className="navLinkItem">About</a></li>
                        {
                            session && pathname !== "/dashboard" && (
                                <li><Link className='navLinkItem' href="/dashboard">Dashboard</Link></li>
                            )
                        }
                        {!session && (
                            <li>
                                <Link className='bg-[#d5ba80] duration-200 hover:brightness-90 brightness-110 text-black font-medium py-3 px-5 rounded-2xl' href={"/login"}>Sign In</Link>
                            </li>
                        )}
                        {session && (
                            <li className='relative group'>
                                <button
                                    title={title}
                                    className={`${backgroundColorClass} h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer`} aria-label={`User avatar for ${title}`}
                                >
                                    {initial}
                                </button>
                                <ul className="absolute -right-6 top-9 mt-1 w-48 opacity-0 pointer-events-none bg-neutral-800 rounded-md shadow-lg p-1 z-20 transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
                                    <li className="px-4 py-2 text-[17px] text-neutral-50 hover:bg-neutral-700 duration-200 rounded-md cursor-pointer" onClick={() => signOut()}>Sign Out</li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
