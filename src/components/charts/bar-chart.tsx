"use client";
import { useQuery } from "@/hooks/useQuery";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import Chart from "react-apexcharts";

interface ChartOptions {
  chart: {
    id: string;
    events?: {
      dataPointSelection?: (event: any, chartContext: any, config: any) => void;
    };
  };
  xaxis: {
    categories: string[];
  };
  plotOptions: {
    bar: {
      horizontal: boolean;
      barHeight?: string;
      distributed?: boolean;
    };
  };
}

interface Series {
  name: string;
  data: number[];
}

const BarGraph = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const age = searchParams.get("age");
  const gender = searchParams.get("gender");
  const date_gte = searchParams.get("date_gte");
  const date_lte = searchParams.get("date_lte");

  const { data } = useQuery("/api/data/bar-chart", {
    ...(age && { age }),
    ...(gender && { gender }),
    ...(date_gte && { date_gte }),
    ...(date_lte && { date_lte }),
  });

  const handleBarClick = (
    event: any,
    chartContext: any,
    { seriesIndex, dataPointIndex, w }: any
  ) => {
    const category = w.config.xaxis.categories[dataPointIndex];
    const value = w.config.series[seriesIndex].data[dataPointIndex];

    if (category)
      router.push(
        `/?${new URLSearchParams({
          ...Object.fromEntries(searchParams),
          category,
        }).toString()}`
      );
  };

  const options: ChartOptions = useMemo(
    () => ({
      chart: {
        id: "basic-bar",
        events: {
          dataPointSelection: handleBarClick,
        },
      },
      xaxis: {
        categories: Object.keys(data || {}).map((str) => str.toUpperCase()),
        title: {
          text: "Time Spent",
        },
      },
      yaxis: {
        title: {
          text: "Features", // Add y-axis title
        },
      },
      grid: {
        row: {
          colors: ["#e5e5e5", "transparent"],
          opacity: 0,
        },
        column: {
          colors: ["#f8f8f8", "transparent"],
        },
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "60%", // Control bar height for large screens
          // distributed: true, // Distribute bars evenly
        },
      },
      states: {
        normal: {
          filter: { type: "none", value: 0 },
        },
        hover: {
          filter: { type: "lighten", value: 0.2 },
        },
        active: {
          filter: { type: "darken", value: 0.2 },
          allowMultipleDataPointsSelection: false,
        },
      },
    }),
    [data]
  );

  const series: Series[] = useMemo(
    () => [
      {
        name: "Features",
        data: Object.values(data || {}),
      },
    ],
    [data]
  );

  return (
    <div className="w-full lg:max-w-4xl border rounded-sm mx-auto">
      <Chart options={options} series={series} type="bar" width="100%" />
    </div>
  );
};

export default BarGraph;
