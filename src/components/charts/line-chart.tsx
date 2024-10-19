import { useQuery } from "@/hooks/useQuery";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type

const LineChart = ({ category }: { category: string }) => {
  const searchParams = useSearchParams();

  const age = searchParams.get("age");
  const gender = searchParams.get("gender");
  const date_gte = searchParams.get("date_gte");
  const date_lte = searchParams.get("date_lte");

  const { data } = useQuery("/api/data/line-chart", {
    ...(age && { age }),
    ...(gender && { gender }),
    ...(date_gte && { date_gte }),
    ...(date_lte && { date_lte }),
    category,
  });

  const series = useMemo(
    () => [
      {
        name: category,
        data: Object.entries(data || {})
          .sort((a, b) => Date.parse(a[0]) - Date.parse(b[0]))
          .map(([date, value]) => ({
            x: new Date(date).getTime(), // Convert date string to timestamp
            y: value,
          })),
      },
    ],
    [data, category] // Adding category as a dependency
  );

  // Define the options with ApexOptions type
  const options: ApexOptions = {
    chart: {
      type: "line", // Use "line" here to match the series data
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: category,
      align: "center",
    },
    yaxis: {
      title: {
        text: "Trend",
      },
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Day",
      },
    },
  };

  return (
    <div className="w-full border rounded-sm">
      <ReactApexChart
        options={options}
        series={series}
        type="line" // Ensure the type matches
        height={350}
      />
    </div>
  );
};

export default LineChart;
