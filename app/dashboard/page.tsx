import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const session = (await cookies()).get("session");

  if (!session) {
    redirect("/login");
  }

  return <DashboardClient userId={session.value} />;
}
