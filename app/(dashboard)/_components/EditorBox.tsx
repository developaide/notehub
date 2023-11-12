"use client";

import Editor from "@/components/editor";

interface EditorBoxProps {
  initialContent?: string | null;
  setContent: (value: string) => void;
  editable?: boolean | null;
  userId?: string | null;
  authUserId?: string | null;
}

const EditorBox = ({
  setContent,
  userId,
  initialContent,
  editable,
  authUserId,
}: EditorBoxProps) => {
  function onChangeContent(value: string) {
    setContent(value);
  }
  return (
    <Editor
      editable={authUserId === userId ? true : false}
      initialContent={initialContent as string}
      onChange={onChangeContent}
    />
  );
};

export default EditorBox;
