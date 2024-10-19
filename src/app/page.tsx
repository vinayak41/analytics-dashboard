"use client";
import BarChart from "@/components/charts/bar-chart";
import LineChart from "@/components/charts/line-chart";
import FilterForm from "@/components/filter-form";
import { signIn, useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const { data: session, status: sessionStatus } = useSession();

  const shouldDisplayBarChart =
    searchParams.get("age") ||
    searchParams.get("gender") ||
    searchParams.get("date_gte") ||
    searchParams.get("date_lte");

  const category = searchParams.get("category");

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      signIn(undefined, { callbackUrl: window.location.href });
    }
  }, [sessionStatus]);

  return (
    <main className="p-4">
      {session?.user && (
        <>
          <FilterForm />
          {shouldDisplayBarChart && (
            <div className="flex flex-col gap-2">
              <BarChart />
              {category && <LineChart category={category} />}
            </div>
          )}
        </>
      )}
    </main>
  );
}
