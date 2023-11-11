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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import EditorBox from "./EditorBox";
import { useState } from "react";
import { NoteType } from "./CreateNote";

type CreateNoteDialogProps = {
  userId?: string;
  saveNoteToDB: ({
    content,
    isPublished,
    title,
    userId,
    coverImg,
    icon,
  }: NoteType) => void;
};

export function CreateNoteDialog({
  saveNoteToDB,
  userId,
}: CreateNoteDialogProps) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className="min-w-[350px] min-h-[200px] cursor-pointer hover:shadow-sm hover:shadow-neutral-400"
          title="create new note"
          aria-label="create new note"
        >
          <CardHeader className="text-center">
            <CardTitle className="text-neutral-400 text-2xl">
              Create new Note
            </CardTitle>
            <CardDescription className="text-neutral-400 text-lg">
              Click to create new Note
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <PlusIcon className="text-neutral-400 w-12 h-12" />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:max-w-[750px] lg:max-w-[900px] xl:max-w-[1100px]">
        <DialogHeader>
          <DialogTitle>
            <Input
              className="text-5xl border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none focus-visible:ring-offset-0"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </DialogTitle>
        </DialogHeader>
        <EditorBox setContent={setContent} />
        <DialogFooter>
          <Button
            onClick={() =>
              saveNoteToDB({
                content,
                isPublished: false,
                title,
                userId: userId as string,
              })
            }
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
