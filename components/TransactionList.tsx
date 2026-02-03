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
  onRefresh,   // ✅ нэмэв
}: {
  refreshKey: number;
  month: string;
  onSummary: (income: number, expense: number) => void;
  onRefresh: () => void;
}) {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true); // ✅ 1️⃣ ЭНД нэмнэ
  const [selected, setSelected] = useState<Transaction | null>(null);

  useEffect(() => {
    setLoading(true); // ✅ 2️⃣ fetch эхлэхэд loading асаана

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
        setLoading(false); // ✅ 3️⃣ fetch дуусахад унтраана
      });
  }, [refreshKey, month]);

  // ✅ 4️⃣ ЯГ ЭНД Skeleton-оо буцаана
  if (loading) {
    return (
      <div className="space-y-2 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 bg-slate-200 rounded-lg"
          />
        ))}
      </div>
    );
  }

  // ⬇️ loading биш үед ЭНЭ хэсэг render хийнэ
  return (
    <>
      <div className="space-y-2">
        {data.map((tx) => (
          <div
            key={tx._id}
            onClick={() => setSelected(tx)}
            className="flex justify-between items-center bg-white p-3 rounded-lg shadow cursor-pointer hover:bg-slate-50"
          >
            <div>
              <p className="font-medium">{tx.category}</p>
              <p className="text-xs text-gray-400">{tx.note}</p>
            </div>

            <p
              className={`font-bold ${
                tx.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
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
          onUpdated={() => setSelected(null)}
        />
      )}
    </>
  );
}
