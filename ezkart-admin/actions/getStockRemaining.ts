import prisma from "@/lib/prismadb";

export const getStockRemaining = async (storeId: string) => {
  const stockRemaining = await prisma.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockRemaining;
};
