import prisma from "@/lib/prismadb";
import { BillboardForm } from "./components/Billboard-form";

const BillBoardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prisma.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  console.log(params.billboardId);
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillBoardPage;
