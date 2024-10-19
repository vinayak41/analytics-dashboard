"use client";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cookies from "js-cookie";

import { DateRangePicker } from "./ui/date-range-picker";
import { format, parse } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

const FilterForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleValueChange = (newValue: Record<string, string>) => {
    Object.entries(newValue).forEach(([key, value]) => {
      Cookies.set(key, value);
    });
    const query = { ...Object.fromEntries(searchParams), ...newValue };
    router.push(`/?${new URLSearchParams(query).toString()}`);
  };

  useEffect(() => {
    const isFilterAppliedFromUrl = searchParams.size > 0;
    if (!isFilterAppliedFromUrl) {
      const query: Record<string, string> = {};
      const age = Cookies.get("age");
      const gender = Cookies.get("gender");
      const date_gte = Cookies.get("date_gte");
      const date_lte = Cookies.get("date_lte");

      if (age) query.age = age;
      if (gender) query.gender = gender;
      if (date_gte) query.date_gte = date_gte;
      if (date_lte) query.date_lte = date_lte;

      router.push(`/?${new URLSearchParams(query).toString()}`);
    }
  }, []);

  return (
    <section className="flex gap-4 p-2 items-end flex-wrap mb-4">
      <div>
        <span className="mb-1 inline-block">Age</span>
        <Select
          name="age"
          key={searchParams.get("age") as string}
          defaultValue={searchParams.get("age") as string}
          onValueChange={(value) => handleValueChange({ age: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["15-25", ">25"].map((age) => (
              <SelectItem key={age} value={age}>
                {age}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <span className="mb-1 inline-block">Gender</span>
        <Select
          name="gender"
          key={searchParams.get("gender") as string}
          defaultValue={searchParams.get("gender") as string}
          onValueChange={(value) => handleValueChange({ gender: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["Male", "Female"].map((gender) => (
              <SelectItem key={gender} value={gender}>
                {gender}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <span className="mb-1 inline-block">Date Range</span>
        <DateRangePicker
          onApply={(range) => {
            // setDateRange(range as { from: Date; to: Date });
            range.from &&
              range.to &&
              handleValueChange({
                date_gte: format(range.from, "yyyy-MM-dd"),
                date_lte: format(range.to, "yyyy-MM-dd"),
              });
          }}
          selected={
            searchParams.get("date_lte") && searchParams.get("date_gte")
              ? {
                  from: parse(
                    searchParams.get("date_gte")!,
                    "yyyy-MM-dd",
                    new Date()
                  ),
                  to: parse(
                    searchParams.get("date_lte")!,
                    "yyyy-MM-dd",
                    new Date()
                  ),
                }
              : undefined
          }
        />
      </div>
    </section>
  );
};

export default FilterForm;
