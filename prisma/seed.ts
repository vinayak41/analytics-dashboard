// @ts-ignore
import data from "../data.json";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const addData = async () => {
  function convertToISODate(dateString: string): string {
    const [day, month, year] = dateString.split("/");
    // Zero-pad month and day
    const paddedDay = day.padStart(2, "0");
    const paddedMonth = month.padStart(2, "0");
    return `${year}-${paddedMonth}-${paddedDay}T00:00:00.000Z`; // Adjust time as needed
  }
  for (const entry of data) {
    await prisma.data.create({
      data: {
        day: new Date(convertToISODate(entry.Day)),
        age: entry.Age,
        gender: entry.Gender,
        a: entry.A,
        b: entry.B,
        c: entry.C,
        d: entry.D,
        e: entry.E,
        f: entry.F,
      },
    });
  }
};

async function main() {
  addData();
  console.log("Data seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
