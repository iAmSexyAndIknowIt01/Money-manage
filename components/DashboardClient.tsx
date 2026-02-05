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
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">📊 Сарын санхүү</h1>

        <SummaryCards income={income} expense={expense} />

        <TransactionForm onAdded={refreshDashboard} />

        <MonthSelector value={month} onChange={setMonth} />

        <TransactionList
          refreshKey={refreshKey}
          month={month}
          onSummary={handleSummary}
          onRefresh={refreshDashboard}
        />
      </div>
    </div>
  );
}
