"use client";
import FilterForm from "@/components/filter-form";
import { UserActions } from "@/components/user-actions";
import { signIn, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const BarChart = dynamic(() => import("@/components/charts/bar-chart"), {
  ssr: false,
});
const LineChart = dynamic(() => import("@/components/charts/line-chart"), {
  ssr: false,
});

export default function Home() {
  const searchParams = useSearchParams();
  const session = useSession();
  const router = useRouter();

  // const shouldDisplayBarChart =
  //   searchParams.get("age") ||
  //   searchParams.get("gender") ||
  //   searchParams.get("date_gte") ||
  //   searchParams.get("date_lte");

  const category = searchParams.get("category");

  useEffect(() => {
    if (session.status === "unauthenticated") {
      signIn(undefined, { callbackUrl: window.location.href });
    }
  }, [session]);

  return (
    <>
      {session.data?.user && (
        <main className="p-4">
          <UserActions />
          <FilterForm />
          <div className="flex flex-col lg:flex-row gap-2">
            <BarChart />
            {category && <LineChart category={category} />}
          </div>
        </main>
      )}
    </>
  );
}
