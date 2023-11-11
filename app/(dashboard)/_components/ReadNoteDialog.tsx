"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import EditorBox from "./EditorBox";
import { useState } from "react";

type ReadNoteDialogProps = {
  title: string;
  content: string;
};

export function ReadNoteDialog({ title, content }: ReadNoteDialogProps) {
  const [editContent, setEditContent] = useState(content);
  const [editTitle, setEditTitle] = useState(title);

  const firstText = JSON.parse(editContent)[0].content[0].text;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className="min-w-[350px] min-h-[200px]  cursor-pointer hover:shadow-sm hover:shadow-neutral-400"
          title="create new note"
          aria-label="create new note"
        >
          <CardHeader className="text-center">
            <CardTitle className=" text-2xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="line-clamp-1">{firstText}</CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:max-w-[750px] lg:max-w-[900px] xl:max-w-[1100px]">
        <DialogHeader>
          <DialogTitle>
            <Input
              className="text-5xl border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none focus-visible:ring-offset-0"
              placeholder="Title..."
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </DialogTitle>
        </DialogHeader>
        <EditorBox initialContent={editContent} setContent={setEditContent} />
        <DialogFooter>
          <Button>Edit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
