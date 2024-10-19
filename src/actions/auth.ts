"use server";
import prisma, { getErrorMessage } from "@/lib/prisma";
import { PrismaError } from "@/types/prisma-errors";
import { hash } from "bcryptjs";

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const hashedPassword = await hash(data.password, 12);
  data.password = hashedPassword;
  data.email = data.email.toLowerCase();
  try {
    const user = await prisma.user.create({
      data,
    });
    return user;
  } catch (error) {
    throw new Error(getErrorMessage(error as PrismaError));
  }
};
