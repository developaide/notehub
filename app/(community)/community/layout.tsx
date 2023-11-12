import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/authOptions";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";

export const metadata: Metadata = {
  title: "NoteHub-Community",
  description:
    "NoteHub community for every user to share and collaborate their notes, documents and workspaces",
};

const CommunityLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <Navbar
        name={session?.user?.name as string}
        email={session?.user?.email as string}
        image={session?.user?.image as string}
        iconLink="/community"
      />
      {children}
    </main>
  );
};

export default CommunityLayout;
