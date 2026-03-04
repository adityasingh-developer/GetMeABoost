import Image from "next/image";
import React from "react";

export default function CreatorPageContent({ username, rightSlot = null }) {
  const hasRightSlot = Boolean(rightSlot);
  const supporters = [
    { name: "Aman", message: "Nice content, bro!", amount: "$10" },
    { name: "Sara", message: "Loved your last post!", amount: "$25" },
    { name: "Rohan", message: "Keep it up!", amount: "$5" },
    { name: "Neha", message: "Proud supporter here.", amount: "$15" },
    { name: "Nehatti Nalla", message: "Not proud supporter here.", amount: "$15" },
    { name: "farmer", message: "of aura", amount: "$250" },
  ];

  return (
    <>
      <div className='relative'>
        <Image src="/dummyBanner.jpeg" alt={username} width={1400} height={100} className='w-full h-100' />
        <Image src="/king.jpg" alt={username} width={160} height={100} className='absolute rounded-full border-6 box shadow-[0_0_0_0.7rem_#222] border-[#111] left-[46%] -bottom-17' />
      </div>

      <div className='flex flex-col gap-5 items-center px-4'>
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
        <div className='flex gap-4 flex-wrap justify-center'>
          <div className="px-6 items-center bg-neutral-900 rounded-xl cursor-default hover:bg-[#111] duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.45)] border-[#111] py-4 text-lg flex flex-col">
            <span className='text-xl'>123</span>
            <p className='text-sm opacity-80'>Supporters</p>
          </div>
          <div className="px-6 items-center bg-neutral-900 rounded-xl cursor-default hover:bg-[#111] duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.45)] border-[#111] py-4 text-lg flex flex-col">
            <span className='text-xl'>456</span>
            <p className='text-sm opacity-80'>Followers</p>
          </div>
          <div className="px-6 items-center bg-neutral-900 rounded-xl cursor-default hover:bg-[#111] duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.45)] border-[#111] py-4 text-lg flex flex-col">
            <span className='text-xl'>12</span>
            <p className='text-sm opacity-80'>Members</p>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6'>
        <div className='flex flex-col gap-6'>
          <section className='bg-neutral-900/95 border border-neutral-800 rounded-2xl p-6 shadow-[0_14px_32px_rgba(0,0,0,0.35)]'>
            <h2 className='text-2xl font-semibold'>About Me</h2>
            <p className='mt-4 text-neutral-200 leading-7'>
              Hey, I am {username}. I am building projects, sharing progress, and creating a close community for people who want to support my work.
              This section is ready for your custom bio, story, and goals.
            </p>
            <div className='mt-6'>
              <h3 className='text-lg font-medium'>Social Links</h3>
              <div className='mt-3 flex flex-wrap gap-3'>
                <a href="#" className='px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-950 hover:bg-neutral-800 duration-200 text-sm'>X / Twitter</a>
                <a href="#" className='px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-950 hover:bg-neutral-800 duration-200 text-sm'>Instagram</a>
                <a href="#" className='px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-950 hover:bg-neutral-800 duration-200 text-sm'>YouTube</a>
                <a href="#" className='px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-950 hover:bg-neutral-800 duration-200 text-sm'>LinkedIn</a>
              </div>
            </div>
          </section>

          <section className='bg-neutral-900/95 border border-neutral-800 rounded-2xl p-6 shadow-[0_14px_32px_rgba(0,0,0,0.35)]'>
            <h2 className='text-2xl font-semibold'>Memberships</h2>
            <p className='text-neutral-300 mt-2'>Choose a tier to get special perks and support {username}.</p>

            <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='rounded-2xl border border-[#3a3429] bg-gradient-to-b from-[#2f2a20] via-[#1d1b1a] to-[#121212] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.45)]'>
                <p className='text-2xl font-bold text-[#f2d6a0] text-center'>$9</p>
                <h3 className='text-lg font-semibold text-center mt-1'>Member</h3>
                <p className='text-xs text-neutral-300 text-center mt-1'>Access to exclusive posts</p>
                <div className='h-px bg-neutral-700/70 my-3'></div>
                <ul className='space-y-2 text-xs text-neutral-200'>
                  <li>Access to exclusive posts.</li>
                  <li>Access to exclusive chats.</li>
                </ul>
                <button className='mt-4 w-full cursor-pointer py-2 rounded-lg bg-[#d5ba80] text-black font-semibold hover:brightness-110 duration-200'>Join $9</button>
              </div>

              <div className='rounded-2xl border border-[#4a3f25] bg-gradient-to-b from-[#3b321f] via-[#1f1b16] to-[#121212] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.45)]'>
                <p className='text-2xl font-bold text-[#f2d6a0] text-center'>$15</p>
                <h3 className='text-lg font-semibold text-center mt-1'>Pro Member</h3>
                <p className='text-xs text-neutral-300 text-center mt-1'>Extra updates + priority replies</p>
                <div className='h-px bg-neutral-700/70 my-3'></div>
                <ul className='space-y-2 text-xs text-neutral-200'>
                  <li>Everything in Member.</li>
                  <li>Priority message responses.</li>
                </ul>
                <button className='mt-4 w-full cursor-pointer py-2 rounded-lg bg-[#d5ba80] text-black font-semibold hover:brightness-110 duration-200'>Join $15</button>
              </div>

              <div className='rounded-2xl border border-[#4f4428] bg-gradient-to-b from-[#57472d] via-[#221d16] to-[#121212] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.45)]'>
                <p className='text-2xl font-bold text-[#f2d6a0] text-center'>$21</p>
                <h3 className='text-lg font-semibold text-center mt-1'>VIP Member</h3>
                <p className='text-xs text-neutral-300 text-center mt-1'>Top tier with all perks</p>
                <div className='h-px bg-neutral-700/70 my-3'></div>
                <ul className='space-y-2 text-xs text-neutral-200'>
                  <li>Everything in Pro Member.</li>
                  <li>Private group access.</li>
                </ul>
                <button className='mt-4 w-full cursor-pointer py-2 rounded-lg bg-[#d5ba80] text-black font-semibold hover:brightness-110 duration-200'>Join $21</button>
              </div>
            </div>
          </section>
        </div>

        <aside className='bg-neutral-900/95 border border-neutral-800 rounded-2xl p-6 h-fit shadow-[0_14px_32px_rgba(0,0,0,0.35)]'>
          <h2 className='text-2xl font-semibold'>Recent Supporters</h2>
          <p className='text-neutral-300 mt-2'>People who recently supported {username}</p>

          <div className='mt-5 space-y-4'>
            {supporters.map((supporter) => (
              <div key={supporter.name} className='flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800'>
                <div className='flex items-center gap-3'>
                  <div className='size-10 rounded-full bg-neutral-700'></div>
                  <div>
                    <p className='font-medium'>{supporter.name}</p>
                    <p className='text-xs text-neutral-400'>{supporter.message}</p>
                  </div>
                </div>
                <p className='text-[#d5ba80] font-semibold'>{supporter.amount}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className={`max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 gap-6 ${hasRightSlot ? "lg:grid-cols-[6fr_4fr]" : "lg:grid-cols-1"}`}>
        <div className='flex flex-col gap-6'>
          <div className={`bg-neutral-900/95 border border-neutral-800 rounded-2xl shadow-[0_14px_32px_rgba(0,0,0,0.35)] ${hasRightSlot ? "p-6" : "p-8"}`}>
            <h2 className='text-2xl font-semibold'>Current Goal</h2>
            <p className='text-neutral-300 mt-2'>Help {username} reach this month&apos;s target.</p>
            <div className='mt-4'>
              <div className='flex justify-between text-sm text-neutral-300 mb-2'>
                <span>Raised: $1,250</span>
                <span>Goal: $2,000</span>
              </div>
              <div className='h-3 w-full bg-neutral-800 rounded-full overflow-hidden'>
                <div className='h-full w-[62%] bg-[#d5ba80]'></div>
              </div>
            </div>
          </div>

          <div className={`bg-neutral-900/95 border border-neutral-800 rounded-2xl shadow-[0_14px_32px_rgba(0,0,0,0.35)] ${hasRightSlot ? "p-6" : "p-8"}`}>
            <h3 className='text-xl font-semibold'>What Support Unlocks</h3>
            <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className={`rounded-xl bg-neutral-950 border border-neutral-800 ${hasRightSlot ? "p-4" : "p-6"}`}>
                <p className='text-sm text-[#d5ba80]'>Weekly Content</p>
                <p className='text-sm text-neutral-300 mt-1'>New tutorials, behind-the-scenes posts, and short dev logs.</p>
              </div>
              <div className={`rounded-xl bg-neutral-950 border border-neutral-800 ${hasRightSlot ? "p-4" : "p-6"}`}>
                <p className='text-sm text-[#d5ba80]'>Community Perks</p>
                <p className='text-sm text-neutral-300 mt-1'>Priority replies, polls, and member-only interaction spaces.</p>
              </div>
              <div className={`rounded-xl bg-neutral-950 border border-neutral-800 ${hasRightSlot ? "p-4" : "p-6"}`}>
                <p className='text-sm text-[#d5ba80]'>Gear & Tools</p>
                <p className='text-sm text-neutral-300 mt-1'>Support goes into software, hosting, and better production setup.</p>
              </div>
              <div className={`rounded-xl bg-neutral-950 border border-neutral-800 ${hasRightSlot ? "p-4" : "p-6"}`}>
                <p className='text-sm text-[#d5ba80]'>Shoutouts</p>
                <p className='text-sm text-neutral-300 mt-1'>Top supporters get highlighted in upcoming creator posts.</p>
              </div>
            </div>
          </div>
        </div>

        {rightSlot}
      </section>
    </>
  );
}
