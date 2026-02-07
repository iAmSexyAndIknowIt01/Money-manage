"use client";

import { useEffect, useState } from "react";

const expenseCategories = [
  "🍔 Хоол",
  "🏠 Түрээс",
  "🚗 Тээвэр",
  "💡 Цахилгаан / Ус",
  "📱 Харилцаа холбоо",
  "🛒 Худалдан авалт",
  "🎮 Зугаа",
  "📦 Бусад",
];

const incomeCategories = [
  "💼 Цалин",
  "💻 Freelance",
  "🎁 Бэлэг",
  "📈 Ашиг",
  "💰 Бусад",
];

export default function TransactionForm({ onAdded }: { onAdded: () => void }) {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const list = type === "income" ? incomeCategories : expenseCategories;
    setCategory(list[0]);
  }, [type]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        amount: Number(amount),
        category,
        note,
      }),
    });

    setAmount("");
    setNote("");
    setLoading(false);
    onAdded();
  }

  const categories =
    type === "income" ? incomeCategories : expenseCategories;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-white/10 rounded-2xl p-5 space-y-4"
    >
      {/* Type selector */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`flex-1 py-2 rounded-lg font-medium transition ${
            type === "expense"
              ? "bg-red-500 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          💸 Зарлага
        </button>
        <button
          type="button"
          onClick={() => setType("income")}
          className={`flex-1 py-2 rounded-lg font-medium transition ${
            type === "income"
              ? "bg-green-500 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          💰 Орлого
        </button>
      </div>

      {/* Amount */}
      <input
        type="number"
        placeholder="Дүн"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full bg-slate-800 border border-white/10 rounded-lg p-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-white/30"
        required
      />

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full bg-slate-800 border border-white/10 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-white/30"
        required
      >
        {categories.map((c) => (
          <option key={c} value={c} className="bg-slate-800">
            {c}
          </option>
        ))}
      </select>

      {/* Note */}
      <input
        placeholder="Тайлбар"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full bg-slate-800 border border-white/10 rounded-lg p-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-white/30"
      />

      {/* Submit */}
      <button
        disabled={loading}
        className="w-full py-2 rounded-lg font-semibold bg-white text-black hover:bg-slate-200 transition disabled:opacity-50"
      >
        {loading ? "Нэмж байна..." : "Нэмэх"}
      </button>
    </form>
  );
}
