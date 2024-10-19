import prisma, { getErrorMessage } from "@/lib/prisma";
import { PrismaError } from "@/types/prisma-errors";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const { date_gte, date_lte, age, gender } = Object.fromEntries(searchParams);
  const query = {
    ...(date_gte &&
      date_lte && {
        day: { gte: new Date(date_gte), lte: new Date(date_lte) },
      }),
    ...(age && { age }),
    ...(gender && { gender }),
  };

  console.log({ query });

  try {
    const data = await prisma.data.aggregate({
      where: query,
      _sum: {
        a: true,
        b: true,
        c: true,
        d: true,
        e: true,
        f: true,
      },
    });
    return NextResponse.json(data._sum);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error as PrismaError) },
      { status: 500 }
    );
  }
};
