import Image from 'next/image';
import React from 'react'

const Username = async ({ params }) => {
  const { username } = await params;
  const amount = 10;

  return (
    <div className='pb-12'>
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
                <button className='mt-4 w-full py-2 rounded-lg bg-[#d5ba80] text-black font-semibold hover:brightness-110 duration-200'>Join $9</button>
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
                <button className='mt-4 w-full py-2 rounded-lg bg-[#d5ba80] text-black font-semibold hover:brightness-110 duration-200'>Join $15</button>
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
                <button className='mt-4 w-full py-2 rounded-lg bg-[#d5ba80] text-black font-semibold hover:brightness-110 duration-200'>Join $21</button>
              </div>
            </div>
          </section>
        </div>

        <aside className='bg-neutral-900/95 border border-neutral-800 rounded-2xl p-6 h-fit shadow-[0_14px_32px_rgba(0,0,0,0.35)]'>
          <h2 className='text-2xl font-semibold'>Recent Supporters</h2>
          <p className='text-neutral-300 mt-2'>People who recently supported {username}</p>

          <div className='mt-5 space-y-4'>
            <div className='flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800'>
              <div className='flex items-center gap-3'>
                <div className='size-10 rounded-full bg-neutral-700'></div>
                <div>
                  <p className='font-medium'>Aman</p>
                  <p className='text-xs text-neutral-400'>Nice content, bro!</p>
                </div>
              </div>
              <p className='text-[#d5ba80] font-semibold'>$10</p>
            </div>

            <div className='flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800'>
              <div className='flex items-center gap-3'>
                <div className='size-10 rounded-full bg-neutral-700'></div>
                <div>
                  <p className='font-medium'>Sara</p>
                  <p className='text-xs text-neutral-400'>Loved your last post!</p>
                </div>
              </div>
              <p className='text-[#d5ba80] font-semibold'>$25</p>
            </div>

            <div className='flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800'>
              <div className='flex items-center gap-3'>
                <div className='size-10 rounded-full bg-neutral-700'></div>
                <div>
                  <p className='font-medium'>Rohan</p>
                  <p className='text-xs text-neutral-400'>Keep it up!</p>
                </div>
              </div>
              <p className='text-[#d5ba80] font-semibold'>$5</p>
            </div>

            <div className='flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800'>
              <div className='flex items-center gap-3'>
                <div className='size-10 rounded-full bg-neutral-700'></div>
                <div>
                  <p className='font-medium'>Neha</p>
                  <p className='text-xs text-neutral-400'>Proud supporter here.</p>
                </div>
              </div>
              <p className='text-[#d5ba80] font-semibold'>$15</p>
            </div>

            <div className='flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800'>
              <div className='flex items-center gap-3'>
                <div className='size-10 rounded-full bg-neutral-700'></div>
                <div>
                  <p className='font-medium'>Nehatti Nalla</p>
                  <p className='text-xs text-neutral-400'>Not Proud supporter here.</p>
                </div>
              </div>
              <p className='text-[#d5ba80] font-semibold'>$15</p>
            </div>

            <div className='flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800'>
              <div className='flex items-center gap-3'>
                <div className='size-10 rounded-full bg-neutral-700'></div>
                <div>
                  <p className='font-medium'>farmer</p>
                  <p className='text-xs text-neutral-400'>of aura</p>
                </div>
              </div>
              <p className='text-[#d5ba80] font-semibold'>$250</p>
            </div>
          </div>
        </aside>
      </div>

      <section className='max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-[6fr_4fr] gap-6'>
        <div className='flex flex-col gap-6'>
          <div className='bg-neutral-900/95 border border-neutral-800 rounded-2xl p-6 shadow-[0_14px_32px_rgba(0,0,0,0.35)]'>
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

          <div className='bg-neutral-900/95 border border-neutral-800 rounded-2xl p-6 shadow-[0_14px_32px_rgba(0,0,0,0.35)]'>
            <h3 className='text-xl font-semibold'>What Support Unlocks</h3>
            <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='rounded-xl bg-neutral-950 border border-neutral-800 p-4'>
                <p className='text-sm text-[#d5ba80]'>Weekly Content</p>
                <p className='text-sm text-neutral-300 mt-1'>New tutorials, behind-the-scenes posts, and short dev logs.</p>
              </div>
              <div className='rounded-xl bg-neutral-950 border border-neutral-800 p-4'>
                <p className='text-sm text-[#d5ba80]'>Community Perks</p>
                <p className='text-sm text-neutral-300 mt-1'>Priority replies, polls, and member-only interaction spaces.</p>
              </div>
              <div className='rounded-xl bg-neutral-950 border border-neutral-800 p-4'>
                <p className='text-sm text-[#d5ba80]'>Gear & Tools</p>
                <p className='text-sm text-neutral-300 mt-1'>Support goes into software, hosting, and better production setup.</p>
              </div>
              <div className='rounded-xl bg-neutral-950 border border-neutral-800 p-4'>
                <p className='text-sm text-[#d5ba80]'>Shoutouts</p>
                <p className='text-sm text-neutral-300 mt-1'>Top supporters get highlighted in upcoming creator posts.</p>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-neutral-900/95 border border-neutral-800 rounded-2xl p-6 shadow-[0_14px_32px_rgba(0,0,0,0.35)] h-fit'>
          <h2 className='text-2xl font-semibold'>Quick Support</h2>
          <p className='text-neutral-300 mt-2 text-sm'>Pick an amount or enter your own and leave a message.</p>

          <div className='mt-5 grid grid-cols-3 gap-2'>
            <button type='button' className='py-2 rounded-lg bg-neutral-950 border border-neutral-700 hover:border-[#d5ba80] hover:text-[#d5ba80] duration-200 text-sm'>Pay $5</button>
            <button type='button' className='py-2 rounded-lg bg-neutral-950 border border-neutral-700 hover:border-[#d5ba80] hover:text-[#d5ba80] duration-200 text-sm'>Pay $10</button>
            <button type='button' className='py-2 rounded-lg bg-neutral-950 border border-neutral-700 hover:border-[#d5ba80] hover:text-[#d5ba80] duration-200 text-sm'>Pay $20</button>
          </div>

          <form className='mt-5 space-y-4'>
            <div>
              <label className='block text-sm text-neutral-300 mb-2'>Your Name</label>
              <input
                type='text'
                placeholder='Enter your name'
                required
                className='w-full rounded-lg bg-neutral-950 border border-neutral-700 px-4 py-2.5 outline-none focus:border-[#d5ba80]'
              />
            </div>

            <div>
              <label className='block text-sm text-neutral-300 mb-2'>Amount</label>
              <input
                type='number'
                required
                placeholder='Enter amount'
                className='w-full rounded-lg bg-neutral-950 border border-neutral-700 px-4 py-2.5 outline-none focus:border-[#d5ba80]'
              />
            </div>

            <div>
              <label className='block text-sm text-neutral-300 mb-2'>Email</label>
              <input
                type='email'
                placeholder='Enter your email'
                required
                className='w-full rounded-lg bg-neutral-950 border border-neutral-700 px-4 py-2.5 outline-none focus:border-[#d5ba80]'
              />
            </div>

            <div>
              <label className='block text-sm text-neutral-300 mb-2'>Message</label>
              <textarea
                required
                rows={3}
                placeholder='Say something nice...'
                className='w-full rounded-lg bg-neutral-950 border border-neutral-700 px-4 py-2.5 outline-none focus:border-[#d5ba80] resize-none'
              />
            </div>

            <button type='submit' className='cursor-pointer w-full py-2.5 rounded-lg bg-[#d5ba80] text-black font-semibold hover:brightness-110 duration-200'>
              Send Support
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Username
