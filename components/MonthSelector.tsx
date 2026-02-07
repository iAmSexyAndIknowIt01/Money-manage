"use client";

export default function MonthSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 bg-slate-900 border border-white/10 rounded-2xl px-4 py-3">
      <span className="text-slate-400 text-sm">📅 Сар</span>

      <input
        type="month"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          bg-slate-800 text-slate-100 border border-white/10
          rounded-xl px-3 py-2 text-sm
          focus:outline-none focus:border-white/30
          hover:border-white/20 transition
        "
      />
    </div>
  );
}
