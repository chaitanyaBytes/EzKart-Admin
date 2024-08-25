import { redirect } from "next/navigation";

import { UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/Main-Nav";
import StoreSwitcher from "@/components/Store-Switcher";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismadb";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex flex-row h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex flex-row items-center space-x-4">
          <ThemeToggle />
          <div>
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
