"use client";

import { useState } from "react";

export default function QuickSupportForm({ creatorUsername, disabled = false }) {
  const [formData, setFormData] = useState({ amount: "", message: "" });
  const [status, setStatus] = useState({ loading: false, type: null, msg: "" });

  const canSubmit = !disabled && !status.loading && creatorUsername;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus({ loading: true, type: null, msg: "" });

    try {
      const res = await fetch(`/api/users/${creatorUsername}/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: formData.message.trim(),
          amount: Number(formData.amount),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Payment failed");

      setFormData({ amount: "", message: "" });
      setStatus({ loading: false, type: "success", msg: "Support sent!" });
    } catch (err) {
      setStatus({ loading: false, type: "error", msg: err.message });
    }
  };

  const update = (field, val) => setFormData(prev => ({ ...prev, [field]: val }));

  return (
    <aside className="h-fit rounded-2xl border border-neutral-800 bg-neutral-900/95 p-6 shadow-xl">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-white">Quick Support</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
          {disabled 
            ? "This is a preview of your public support form." 
            : "Support this creator with a custom tip and message."}
        </p>
      </header>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {[5, 10, 20].map((val) => (
          <button
            key={val}
            type="button"
            disabled={disabled}
            onClick={() => update("amount", val.toString())}
            className="rounded-lg border border-neutral-700 bg-neutral-950 py-2 text-sm font-medium transition-all hover:border-[#d5ba80] hover:text-[#d5ba80] disabled:opacity-40"
          >
            ${val}
          </button>
        ))}
      </div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Amount</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => update("amount", e.target.value)}
            disabled={disabled}
            required
            placeholder="0.00"
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 outline-none focus:ring-1 focus:ring-[#d5ba80]/50 disabled:opacity-50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => update("message", e.target.value)}
            disabled={disabled}
            rows={3}
            maxLength={1000}
            placeholder="Write a message..."
            className="w-full resize-none rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 outline-none focus:ring-1 focus:ring-[#d5ba80]/50 disabled:opacity-50"
          />
          <div className="flex justify-end text-[10px] tabular-nums text-neutral-600">
            {formData.message.length} / 1000
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit || !formData.amount}
          className="relative w-full overflow-hidden rounded-xl bg-[#d5ba80] py-3 font-bold text-black transition-transform active:scale-[0.98] disabled:bg-neutral-800 disabled:text-neutral-500"
        >
          {status.loading ? "Processing..." : "Send Payment"}
        </button>

        {status.msg && (
          <p className={`text-center text-sm font-medium ${status.type === "error" ? "text-red-400" : "text-green-400"}`}>
            {status.msg}
          </p>
        )}
      </form>
    </aside>
  );
}