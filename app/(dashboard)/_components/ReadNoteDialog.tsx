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
import { editTheNote } from "@/app/action";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

type ReadNoteDialogProps = {
  noteId: string;
  userId: string;
  authUserId: string;
  title: string;
  content: string;
  isPublished: boolean;
};

export function ReadNoteDialog({
  noteId,
  title,
  userId,
  authUserId,
  content,
  isPublished,
}: ReadNoteDialogProps) {
  const [editContent, setEditContent] = useState(content);
  const [editTitle, setEditTitle] = useState(title);
  const [open, setOpen] = useState(false);
  const firstText = JSON.parse(editContent)[0].content[0].text;

  const handlePublishToggle = async () => {
    const edit = await editTheNote(noteId, {
      isPublished: isPublished ? false : true,
    });
    if (edit) {
      isPublished
        ? toast.success(
            `Successfully private the Note with ID ${noteId.slice(0, 5)}`
          )
        : toast.success(
            `Successfully published the Note with ID ${noteId.slice(0, 5)}`
          );
    } else {
      toast.error("Couldn't publish the Note!");
    }
  };

  const handleEditContent = async () => {
    const edit = await editTheNote(noteId, {
      title: editTitle,
      content: editContent,
    });
    if (edit) {
      toast.success("Successfully edit the Note");
    } else {
      toast.error("Could not edit Note");
    }
  };

  return (
    <div className="relative">
      <Badge
        className={`${
          isPublished
            ? "bg-green-500 text-white hover:text-black"
            : "bg-sky-700 text-white hover:text-black"
        } text-base absolute right-4 top-2 cursor-pointer `}
        onClick={handlePublishToggle}
      >
        {isPublished ? "Publish" : "Private"}
      </Badge>

      <Dialog
        open={open}
        onOpenChange={(open) => {
          if (!open && content !== editContent) {
            handleEditContent();
          }
          setOpen(open);
        }}
      >
        <DialogTrigger asChild>
          <Card
            className="min-w-[250px] min-h-[220px]  cursor-pointer hover:shadow-sm hover:shadow-neutral-400"
            title="read/edit the note"
            aria-label="read/edit the note"
          >
            <CardHeader className="text-center ">
              <CardTitle className=" text-2xl mt-5">{title}</CardTitle>
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
          <EditorBox
            isPublished={isPublished}
            authUserId={authUserId}
            userId={userId}
            initialContent={editContent}
            setContent={setEditContent}
          />
          <DialogFooter>
            <Button
              disabled={content === editContent ? true : false}
              onClick={() => {
                handleEditContent();
                setOpen(false);
              }}
            >
              {content === editContent ? "Edit" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
