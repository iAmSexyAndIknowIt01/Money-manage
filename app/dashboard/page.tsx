"use client";

import { useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import SummaryCards from "@/components/SummaryCards";
import MonthSelector from "@/components/MonthSelector";
import { cookies } from "next/dist/server/request/cookies";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [month, setMonth] = useState(
  new Date().toISOString().slice(0, 7)
  );
  const [loading, setLoading] = useState(false);
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) {
    redirect("/login"); // 🔐 login хийгээгүй бол
  }

  const userId = session.value;

  function refreshDashboard() {
    setRefreshKey((k) => k + 1);
  }

  function handleSummary(income: number, expense: number) {
    setIncome(income);
    setExpense(expense);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">
          📊 Сарын санхүү
        </h1>

        <SummaryCards income={income} expense={expense} />

        <TransactionForm
          onAdded={() => setRefreshKey((k) => k + 1)}
        />
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
