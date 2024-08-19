"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismadb";

export async function createStore(name: string) {
  const { userId } = auth();

  if (!name) {
    throw new Error("Name is required");
  }

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const store = await prisma.store.create({
    data: {
      name,
      userId,
    },
  });

  return store;
}
