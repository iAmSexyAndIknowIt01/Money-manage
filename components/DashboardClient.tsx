"use client";

import { useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import SummaryCards from "@/components/SummaryCards";
import MonthSelector from "@/components/MonthSelector";

export default function DashboardClient({ userId }: { userId: string }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  function refreshDashboard() {
    setRefreshKey((k) => k + 1);
  }

  function handleSummary(i: number, e: number) {
    setIncome(i);
    setExpense(e);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Title */}
        <h1 className="text-3xl font-semibold tracking-tight">
          📊 Сарын санхүү
        </h1>

        {/* Summary */}
        <SummaryCards income={income} expense={expense} />

        {/* Form */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-4">
          <TransactionForm onAdded={refreshDashboard} />
        </div>

        {/* Month selector */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-4">
          <MonthSelector value={month} onChange={setMonth} />
        </div>

        {/* List */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-4">
          <TransactionList
            refreshKey={refreshKey}
            month={month}
            onSummary={handleSummary}
            onRefresh={refreshDashboard}
          />
        </div>
      </div>
    </div>
  );
}
