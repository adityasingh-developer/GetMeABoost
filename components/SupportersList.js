const defaultFormat = (value) => `$${Number(value || 0).toLocaleString()}`;

export default function SupportersList({
  supporters = [],
  showEmail = false,
  formatAmount,
}) {
  const items = Array.isArray(supporters) ? supporters : [];
  const renderAmount = formatAmount || defaultFormat;

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-2 text-2xl opacity-20">-</div>
        <p className="text-sm font-medium text-neutral-500">No supporters yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {items.map((person, idx) => {
        const key = person.id || person._id || `idx-${idx}`;
        const displayName = String(person?.name || "").trim() || "Anonymous";

        return (
          <div
            key={key}
            className="group flex items-center justify-between gap-4 border border-white/5 bg-neutral-900/50 p-4 transition-all hover:bg-neutral-800/50"
          >
            <div className="flex min-w-0 gap-4">
              <img
                src={person?.profileImage || "/king.jpg"}
                alt={`${displayName}'s avatar`}
                className="size-12 shrink-0 rounded-full bg-neutral-800 object-cover ring-2 ring-white/5"
              />
              <div className="min-w-0">
                <h4 className="truncate text-lg font-bold tracking-tight text-white">{displayName}</h4>
                {showEmail && person?.email ? (
                  <p className="truncate text-xs text-neutral-500">{person.email}</p>
                ) : null}
                {person?.message ? (
                  <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-neutral-400">
                    {person.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-end">
              <span className="text-lg font-black text-[#d5ba80]">{renderAmount(person?.amount)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
