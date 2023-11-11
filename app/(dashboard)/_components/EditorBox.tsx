"use client";

import Editor from "@/components/editor";

interface EditorBoxProps {
  initialContent?: string | null;
  setContent: (value: string) => void;
}

const EditorBox = ({ setContent, initialContent }: EditorBoxProps) => {
  function onChangeContent(value: string) {
    setContent(value);
  }
  return (
    <Editor
      initialContent={initialContent as string}
      onChange={onChangeContent}
    />
  );
};

export default EditorBox;
