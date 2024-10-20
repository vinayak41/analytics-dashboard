"use client";
import BarChart from "@/components/charts/bar-chart";
import LineChart from "@/components/charts/line-chart";
import FilterForm from "@/components/filter-form";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const session = useSession();
  const router = useRouter();

  const shouldDisplayBarChart =
    searchParams.get("age") ||
    searchParams.get("gender") ||
    searchParams.get("date_gte") ||
    searchParams.get("date_lte");

  const category = searchParams.get("category");

  useEffect(() => {
    if (session.status === "unauthenticated") {
      signIn(undefined, { callbackUrl: window.location.href });
    }
  }, [session]);

  return (
    <main className="p-4">
      <FilterForm />
      {shouldDisplayBarChart && (
        <div className="flex flex-col gap-2">
          <BarChart />
          {category && <LineChart category={category} />}
        </div>
      )}
    </main>
  );
}
