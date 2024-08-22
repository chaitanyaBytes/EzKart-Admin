import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unautheticated", { status: 401 });
    }

    const store = await prisma.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
