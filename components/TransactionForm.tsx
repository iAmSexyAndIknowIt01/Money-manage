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


  // type солигдоход category default-оор шинэчилнэ
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
    <form className="bg-white rounded-2xl shadow-lg p-5 space-y-4" onSubmit={handleSubmit}>
      {/* Type selector */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`flex-1 py-2 rounded-lg font-medium ${
            type === "expense"
              ? "bg-red-500 text-white"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          💸 Зарлага
        </button>
        <button
          type="button"
          onClick={() => setType("income")}
          className={`flex-1 py-2 rounded-lg font-medium ${
            type === "income"
              ? "bg-green-500 text-white"
              : "bg-slate-100 text-slate-700"
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
        className="w-full border border-slate-300 rounded-lg p-2 text-slate-900"
        required
      />

      {/* Category select */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border border-slate-300 rounded-lg p-2 bg-white text-slate-900"
        required
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Note */}
      <input
        placeholder="Тайлбар"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border border-slate-300 rounded-lg p-2"
      />

      {/* Submit */}
      <button disabled={loading} className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-black transition">
        {loading ? "Нэмж байна..." : "Нэмэх"}
      </button>
    </form>
  );
}
