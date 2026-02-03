"use client";

import { Transaction } from "./TransactionList";

export default function TransactionCard({
  tx,
  onClick,
}: {
  tx: Transaction;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md border border-slate-200 cursor-pointer hover:bg-slate-50 transition"
    >
      <div>
        <p className="font-semibold text-slate-900">{tx.category}</p>
        {tx.note && (
          <p className="text-xs text-slate-500">{tx.note}</p>
        )}
      </div>

      <p
        className={`font-bold text-lg ${
          tx.type === "income"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {tx.type === "income" ? "+" : "-"}
        {tx.amount.toLocaleString()}₮
      </p>
    </div>
  );
}
