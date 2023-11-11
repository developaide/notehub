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

export type NoteType = {
  title: string;
  userId: string;
  content: string;
  isPublished: boolean;
  icon?: string;
  coverImg?: string;
};

export function CreateNoteDialog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // title , userId, content, isPublished

  function saveNoteToDB({ content, isPublished, title, userId }: NoteType) {}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className="w-[350px] cursor-pointer"
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
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
