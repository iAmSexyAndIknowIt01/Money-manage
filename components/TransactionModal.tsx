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
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    try {
      setLoading(true);
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
      onUpdated();
      onClose();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Энэ гүйлгээг устгах уу?")) return;
    try {
      setLoading(true);
      await fetch(`/api/transactions?id=${tx._id}`, {
        method: "DELETE",
      });
      onUpdated();
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-white/10 p-6 space-y-6">

        {/* Close */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          ✕
        </button>

        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold">
            {tx.type === "income" ? "💰 Орлого" : "💸 Зарлага"}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {new Date(tx.createdAt!).toLocaleString()}
          </p>
        </div>

        {/* Amount */}
        {!isEdit && (
          <div
            className={`text-3xl font-bold text-center ${
              tx.type === "income" ? "text-green-400" : "text-red-400"
            }`}
          >
            {tx.type === "income" ? "+" : "-"}
            {tx.amount.toLocaleString()}₮
          </div>
        )}

        {/* Content */}
        {!isEdit ? (
          <div className="space-y-2 text-sm text-slate-200">
            <p>
              <span className="text-slate-400">Ангилал:</span>{" "}
              {tx.category}
            </p>
            {tx.note && (
              <p>
                <span className="text-slate-400">Тайлбар:</span>{" "}
                {tx.note}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-slate-800 border border-white/10 rounded-lg p-2 text-white"
              disabled={loading}
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-lg p-2 text-white"
              disabled={loading}
            />
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Тайлбар"
              className="w-full bg-slate-800 border border-white/10 rounded-lg p-2 text-white"
              disabled={loading}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {!isEdit ? (
            <>
              <button
                onClick={() => setIsEdit(true)}
                disabled={loading}
                className="flex-1 bg-white text-slate-900 py-2 rounded-lg font-medium hover:bg-slate-200"
              >
                ✏️ Засах
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-red-500/90 text-white py-2 rounded-lg hover:bg-red-500"
              >
                🗑️ Устгах
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-400"
              >
                💾 Хадгалах
              </button>
              <button
                onClick={() => setIsEdit(false)}
                disabled={loading}
                className="flex-1 bg-slate-700 text-slate-200 py-2 rounded-lg hover:bg-slate-600"
              >
                Болих
              </button>
            </>
          )}
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}
