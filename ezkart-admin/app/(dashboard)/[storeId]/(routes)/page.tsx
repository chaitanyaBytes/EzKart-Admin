import prisma from "@/lib/prismadb";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>Active Store: {store?.name}</div>;
};

export default DashboardPage;
