"use client";

import { useState } from "react";

export default function QuickSupportForm({ disabled = false }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='bg-neutral-900/95 border border-neutral-800 rounded-2xl p-6 shadow-[0_14px_32px_rgba(0,0,0,0.35)] h-fit'>
      <h2 className='text-2xl font-semibold'>Quick Support</h2>
      <p className='text-neutral-300 mt-2 text-sm'>
        {disabled
          ? "Preview mode on your own page. Visitors can use this on your public profile."
          : "Pick an amount or enter your own and leave a message."}
      </p>

      <div className='mt-5 grid grid-cols-3 gap-2'>
        <button
          type='button'
          disabled={disabled}
          onClick={() => setAmount("5")}
          className='py-2 rounded-lg bg-neutral-950 border border-neutral-700 hover:border-[#d5ba80] hover:text-[#d5ba80] duration-200 text-sm disabled:cursor-not-allowed disabled:opacity-60'
        >
          Pay $5
        </button>
        <button
          type='button'
          disabled={disabled}
          onClick={() => setAmount("10")}
          className='py-2 rounded-lg bg-neutral-950 border border-neutral-700 hover:border-[#d5ba80] hover:text-[#d5ba80] duration-200 text-sm disabled:cursor-not-allowed disabled:opacity-60'
        >
          Pay $10
        </button>
        <button
          type='button'
          disabled={disabled}
          onClick={() => setAmount("20")}
          className='py-2 rounded-lg bg-neutral-950 border border-neutral-700 hover:border-[#d5ba80] hover:text-[#d5ba80] duration-200 text-sm disabled:cursor-not-allowed disabled:opacity-60'
        >
          Pay $20
        </button>
      </div>

      <form className='mt-5 space-y-4' onSubmit={handleSubmit}>
        <div>
          <label className='block text-sm text-neutral-300 mb-2'>Your Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'
            disabled={disabled}
            required
            className='w-full rounded-lg bg-neutral-950 border border-neutral-700 px-4 py-2.5 outline-none focus:border-[#d5ba80] disabled:cursor-not-allowed disabled:opacity-60'
          />
        </div>

        <div>
          <label className='block text-sm text-neutral-300 mb-2'>Amount</label>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={disabled}
            required
            placeholder='Enter amount'
            className='w-full rounded-lg bg-neutral-950 border border-neutral-700 px-4 py-2.5 outline-none focus:border-[#d5ba80] disabled:cursor-not-allowed disabled:opacity-60'
          />
        </div>

        <div>
          <label className='block text-sm text-neutral-300 mb-2'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            disabled={disabled}
            required
            className='w-full rounded-lg bg-neutral-950 border border-neutral-700 px-4 py-2.5 outline-none focus:border-[#d5ba80] disabled:cursor-not-allowed disabled:opacity-60'
          />
        </div>

        <div>
          <label className='block text-sm text-neutral-300 mb-2'>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={disabled}
            required
            rows={3}
            placeholder='Say something nice...'
            className='w-full rounded-lg bg-neutral-950 border border-neutral-700 px-4 py-2.5 outline-none focus:border-[#d5ba80] resize-none disabled:cursor-not-allowed disabled:opacity-60'
          />
        </div>

        <button
          type='submit'
          disabled={disabled}
          className='cursor-pointer w-full py-2.5 rounded-lg bg-[#d5ba80] text-black font-semibold hover:brightness-110 duration-200 disabled:cursor-not-allowed disabled:opacity-70'
        >
          Send Support
        </button>
      </form>
    </div>
  );
}
