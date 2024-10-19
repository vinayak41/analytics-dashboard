// ts-ignore 7017 is used to ignore the error that the global object is not
// defined in the global scope. This is because the global object is only
// defined in the global scope in Node.js and not in the browser.

import { PrismaError } from "@/types/prisma-errors";
import { PrismaClient } from "@prisma/client";
// import { PrismaError } from "../../types/prisma-errors";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

export function getErrorMessage(prismaError: PrismaError): string {
  switch (prismaError.code) {
    case "P2002":
      return `The ${prismaError.meta?.target?.join(
        ", "
      )} you entered is already in use. Please use a different ${prismaError.meta?.target?.join(
        ", "
      )}.`;
    case "P2025":
      return "The item you are trying to update does not exist. Please check the details and try again.";
    case "P2003":
      return "There is an issue with the related data. Please ensure all required information is correct and try again.";
    case "P2006":
      return `The ${prismaError.meta?.field_name} you entered is too long. Please enter a shorter ${prismaError.meta?.field_name}.`;
    case "P2001":
      return `The ${prismaError.meta?.field_name} field is required. Please enter a ${prismaError.meta?.field_name}.`;
    default:
      return "An unexpected error occurred. Please try again later.";
  }
}