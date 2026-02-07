"use client";

import { useEffect, useState } from "react";
import TransactionModal from "./TransactionModal";

export type Transaction = {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  note?: string;
  createdAt?: string;
};

export default function TransactionList({
  refreshKey,
  month,
  onSummary,
  onRefresh,
}: {
  refreshKey: number;
  month: string;
  onSummary: (income: number, expense: number) => void;
  onRefresh: () => void;
}) {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Transaction | null>(null);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/transactions?month=${month}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);

        const income = res
          .filter((t: Transaction) => t.type === "income")
          .reduce((a: number, b: Transaction) => a + b.amount, 0);

        const expense = res
          .filter((t: Transaction) => t.type === "expense")
          .reduce((a: number, b: Transaction) => a + b.amount, 0);

        onSummary(income, expense);
        setLoading(false);
      });
  }, [refreshKey, month]);

  /* 🦴 Dark skeleton */
  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 rounded-xl bg-slate-800 border border-white/5"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {data.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-6">
            Энэ сард гүйлгээ алга байна
          </p>
        )}

        {data.map((tx) => (
          <div
            key={tx._id}
            onClick={() => setSelected(tx)}
            className="
              flex justify-between items-center
              bg-slate-900 border border-white/10
              p-4 rounded-2xl cursor-pointer
              hover:bg-slate-800 transition
            "
          >
            <div>
              <p className="font-medium text-slate-100">
                {tx.category}
              </p>
              {tx.note && (
                <p className="text-xs text-slate-400">
                  {tx.note}
                </p>
              )}
            </div>

            <p
              className={`font-semibold ${
                tx.type === "income"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {tx.type === "income" ? "+" : "-"}
              {tx.amount.toLocaleString()}₮
            </p>
          </div>
        ))}
      </div>

      {selected && (
        <TransactionModal
          tx={selected}
          onClose={() => setSelected(null)}
          onUpdated={() => {
            setSelected(null);
            onRefresh(); // 🔥 reload list + summary
          }}
        />
      )}
    </>
  );
}
