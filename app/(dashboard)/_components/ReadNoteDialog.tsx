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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import EditorBox from "./EditorBox";
import { useState } from "react";
import { editTheNote } from "@/app/action";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { TrashIcon } from "lucide-react";
import { dateFormatter } from "@/lib/dateFormatter";

type ReadNoteDialogProps = {
  noteId: string;
  userId: string;
  authUserId: string;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export function ReadNoteDialog({
  noteId,
  title,
  userId,
  authUserId,
  content,
  isPublished,
  createdAt,
  updatedAt,
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
    <div className="relative ">
      <div className="absolute flex justify-between items-center w-full px-4 mt-3">
        <Badge
          className={`${
            isPublished
              ? "bg-green-500 text-white hover:text-black"
              : "bg-sky-700 text-white hover:text-black"
          } text-base  cursor-pointer `}
          onClick={handlePublishToggle}
        >
          {isPublished ? "Publish" : "Private"}
        </Badge>
        <Button
          variant={"destructive"}
          className="opacity-60 hover:opacity-100 transition-all"
        >
          <TrashIcon />
        </Button>
      </div>

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
            className="min-w-[250px] min-h-[280px]  cursor-pointer hover:shadow-sm hover:shadow-neutral-400 pt-5"
            title="read/edit the note"
            aria-label="read/edit the note"
          >
            <CardHeader className="text-center ">
              <CardTitle className="line-clamp-1 text-2xl mt-5">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="line-clamp-1">{firstText}</CardContent>
            <CardFooter className="absolute bottom-0 flex-col justify-start items-start">
              <h3 className="text-neutral-400">
                {dateFormatter(createdAt as Date)}
              </h3>
              <h3 className="text-neutral-400">
                {createdAt?.toString() !== updatedAt?.toString() &&
                  `${dateFormatter(updatedAt as Date)} edited`}
              </h3>
            </CardFooter>
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
