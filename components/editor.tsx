"use client"; // this registers <Editor> as a Client Component
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";

interface EditorProps {
  editable?: boolean;
  initialContent?: string;
  onChange: (value: string) => void;
}

// Our <Editor> component we can reuse later
export default function Editor({
  onChange,
  editable,
  initialContent,
}: EditorProps) {
  // Creates a new editor instance.
  const { resolvedTheme } = useTheme();

  const editor: BlockNoteEditor | null = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange(editor) {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
