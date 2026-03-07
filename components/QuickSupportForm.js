"use client";

import { useState } from "react";

export default function QuickSupportForm({ creatorUsername = "", disabled = false }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!creatorUsername || disabled) {
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/users/${creatorUsername}/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          amount: Number(amount),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to send support.");
      }

      setAmount("");
      setMessage("");
      setSuccess("Support sent successfully.");
    } catch (submitError) {
      setError(submitError.message || "Failed to send support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-neutral-900/95 border border-neutral-800 rounded-2xl p-6 shadow-[0_14px_32px_rgba(0,0,0,0.35)] h-fit'>
      <h2 className='text-2xl font-semibold'>Quick Support</h2>
      <p className='text-neutral-300 mt-2 text-sm'>
        {disabled
          ? "Preview mode on your own page. Visitors can use this on your public profile."
          : "Pick an amount or enter your own and leave a message. You must be logged in to send support."}
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
          <label className='block text-sm text-neutral-300 mb-2'>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={disabled}
            rows={3}
            placeholder='Say something nice...'
            className='w-full rounded-lg bg-neutral-950 border border-neutral-700 px-4 py-2.5 outline-none focus:border-[#d5ba80] resize-none disabled:cursor-not-allowed disabled:opacity-60'
          />
        </div>

        <button
          type='submit'
          disabled={disabled || isSubmitting}
          className='cursor-pointer w-full py-2.5 rounded-lg bg-[#d5ba80] text-black font-semibold hover:brightness-110 duration-200 disabled:cursor-not-allowed disabled:opacity-70'
        >
          {isSubmitting ? "Sending..." : "Send Support"}
        </button>
        {error ? <p className='text-sm text-red-400'>{error}</p> : null}
        {success ? <p className='text-sm text-green-400'>{success}</p> : null}
      </form>
    </div>
  );
}
