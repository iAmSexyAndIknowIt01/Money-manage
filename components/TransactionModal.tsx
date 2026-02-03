"use client";

import { useState } from "react";
import { Transaction } from "./TransactionList";

export default function TransactionModal({
  tx,
  onClose,
  onUpdated,
}: {
  tx: Transaction;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [amount, setAmount] = useState(tx.amount);
  const [category, setCategory] = useState(tx.category);
  const [note, setNote] = useState(tx.note || "");
  const [loading, setLoading] = useState(false); // ✅ 1️⃣ loading state

  // ✏️ UPDATE
  async function handleUpdate() {
    try {
      setLoading(true); // ✅ 2️⃣ эхлэхэд loading асаана

      await fetch("/api/transactions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: tx._id,
          type: tx.type,
          amount,
          category,
          note,
        }),
      });

      onUpdated(); // 🔥 dashboard refresh
      onClose();
    } finally {
      setLoading(false); // ✅ 3️⃣ дуусахад унтраана
    }
  }

  // 🗑️ DELETE
  async function handleDelete() {
    if (!confirm("Энэ гүйлгээг устгах уу?")) return;

    try {
      setLoading(true);

      await fetch(`/api/transactions?id=${tx._id}`, {
        method: "DELETE",
      });

      onUpdated(); // 🔥 dashboard refresh
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4 relative">
        {/* ❌ Close */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-3 right-3 text-slate-400 hover:text-black disabled:opacity-50"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold">
          {tx.type === "income" ? "💰 Орлого" : "💸 Зарлага"}
        </h2>

        {/* 🕒 Created time */}
        <p className="text-xs text-slate-500">
          Үүсгэсэн: {new Date(tx.createdAt!).toLocaleString()}
        </p>

        {!isEdit ? (
          <>
            <p>
              <b>Ангилал:</b> {tx.category}
            </p>
            <p>
              <b>Дүн:</b>{" "}
              <span
                className={
                  tx.type === "income"
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {tx.amount.toLocaleString()}₮
              </span>
            </p>
            {tx.note && (
              <p>
                <b>Тайлбар:</b> {tx.note}
              </p>
            )}
          </>
        ) : (
          <>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border rounded p-2"
              disabled={loading}
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded p-2"
              disabled={loading}
            />
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded p-2"
              disabled={loading}
            />
          </>
        )}

        <div className="flex gap-2 pt-2">
          {!isEdit ? (
            <>
              <button
                onClick={() => setIsEdit(true)}
                disabled={loading}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg disabled:opacity-50"
              >
                ✏️ Засах
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg disabled:opacity-50"
              >
                {loading ? "Устгаж байна..." : "🗑️ Устгах"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
              >
                {loading ? "Хадгалж байна..." : "💾 Хадгалах"}
              </button>
              <button
                onClick={() => setIsEdit(false)}
                disabled={loading}
                className="flex-1 bg-gray-300 py-2 rounded-lg disabled:opacity-50"
              >
                Болих
              </button>
            </>
          )}
        </div>

        {/* ⏳ Optional overlay spinner */}
        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-2xl">
            <div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}
