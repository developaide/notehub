"use client"; // this registers <Editor> as a Client Component
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";

// Our <Editor> component we can reuse later
export default function Editor() {
  // Creates a new editor instance.
  const { resolvedTheme } = useTheme();

  const editor: BlockNoteEditor | null = useBlockNote({});

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
