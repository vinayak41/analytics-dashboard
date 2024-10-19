"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onApply?: (dateRange: DateRange) => void;
  selected?: DateRange | { from: null; to: null };
}

export function DateRangePicker({
  className,
  onApply,
  selected = { from: null, to: null },
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !selected && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {selected?.from ? (
              selected.to ? (
                <>
                  {format(selected.from, "LLL dd, y")} -{" "}
                  {format(selected.to, "LLL dd, y")}
                </>
              ) : (
                format(selected.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 flex flex-col items-end"
          align="start"
        >
          <div className="border-b">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </div>
          <div className="flex">
            <PopoverClose asChild>
              <Button className="m-2">Cancel</Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button
                disabled={!(date?.from || date?.to)}
                onClick={() => {
                  date?.from && date?.to && onApply && onApply(date);
                }}
                className="m-2"
              >
                Apply
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
