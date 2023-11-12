import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "NoteHub-Community",
  description:
    "NoteHub community for every user to share and collaborate their notes, documents and workspaces",
};

const CommunityLayout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default CommunityLayout;
