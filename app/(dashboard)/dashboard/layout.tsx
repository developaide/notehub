import type { Metadata } from "next";
import Navbar from "../_components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const metadata: Metadata = {
  title: `Dashboard`,
  description: "This is dashboard and workspace for user",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <Navbar
        name={session?.user?.name as string}
        email={session?.user?.email as string}
        image={session?.user?.image as string}
      />
      {children}
    </main>
  );
};

export default DashboardLayout;
