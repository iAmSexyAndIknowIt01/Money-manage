"use client";

import { useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import SummaryCards from "@/components/SummaryCards";
import MonthSelector from "@/components/MonthSelector";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function DashboardClient({ userId }: { userId: string }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [tab, setTab] = useState<"finance" | "investment">("finance");

  function refreshDashboard() {
    setRefreshKey((k) => k + 1);
  }

  function handleSummary(i: number, e: number) {
    setIncome(i);
    setExpense(e);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      
      {/* 🔝 Navbar */}
      <DashboardNavbar active={tab} onChange={setTab} />

      <div className="px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-8">

          {tab === "finance" && (
            <>
              <h1 className="text-3xl font-semibold tracking-tight">
                📊 Сарын санхүү
              </h1>

              <SummaryCards income={income} expense={expense} />

              <div className="bg-slate-900 border border-white/10 rounded-2xl p-4">
                <TransactionForm onAdded={refreshDashboard} />
              </div>

              <div className="bg-slate-900 border border-white/10 rounded-2xl p-4">
                <MonthSelector value={month} onChange={setMonth} />
              </div>

              <div className="bg-slate-900 border border-white/10 rounded-2xl p-4">
                <TransactionList
                  refreshKey={refreshKey}
                  month={month}
                  onSummary={handleSummary}
                  onRefresh={refreshDashboard}
                />
              </div>
            </>
          )}

          {tab === "investment" && (
            <div className="
              bg-slate-900 border border-white/10
              rounded-2xl p-8 text-center
            ">
              <p className="text-slate-400">
                📈 Хөрөнгө оруулалтын хэсэг удахгүй…
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
