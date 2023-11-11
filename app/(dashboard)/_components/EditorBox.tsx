"use client";

import Editor from "@/components/editor";

interface EditorBoxProps {
  setContent: (value: string) => void;
}

const EditorBox = ({ setContent }: EditorBoxProps) => {
  function onChangeContent(value: string) {
    setContent(value);
  }
  return <Editor onChange={onChangeContent} />;
};

export default EditorBox;
