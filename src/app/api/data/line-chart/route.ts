import { authOptions } from "@/lib/auth";
import prisma, { getErrorMessage } from "@/lib/prisma";
import { PrismaError } from "@/types/prisma-errors";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {

  const session = await getServerSession(authOptions)
  if(!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const searchParams = request.nextUrl.searchParams;

  const category = searchParams.get("category") as string;
  if (!["A", "B", "C", "D", "E", "F"].includes(category as string)) {
    return NextResponse.json({});
  }

  const { date_gte, date_lte, age, gender } = Object.fromEntries(searchParams);
  const query = {
    ...(date_gte &&
      date_lte && {
        day: { gte: new Date(date_gte), lte: new Date(date_lte) },
      }),
    ...(age && { age }),
    ...(gender && { gender }),
  };

  try {
    const data = await prisma.data.groupBy({
      by: ["day"],
      _sum: {
        [category.toLowerCase()]: true,
      },
      where: query,
    });

    return NextResponse.json(
      data.reduce(
        (result: Record<string, number>, data) => ({
          ...result,
          [new Date(data.day || 0).toISOString().slice(0, 10)]:
            data._sum[category.toLowerCase()],
        }),
        {}
      )
    );
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error as PrismaError) },
      { status: 500 }
    );
  }
};
