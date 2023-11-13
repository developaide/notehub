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
import { useId, useState } from "react";
import { deleteNote, editTheNote } from "@/app/action";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { SmileIcon, TrashIcon } from "lucide-react";
import { dateFormatter } from "@/lib/dateFormatter";
import { ScrollArea } from "@/components/ui/scroll-area";
import IconPicker from "@/components/icon-picker";

type ReadNoteDialogProps = {
  noteId: string;
  userId: string;
  userName: string;
  authUserId: string;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  icon?: string;
  showName?: boolean;
};

export function ReadNoteDialog({
  noteId,
  title,
  userId,
  authUserId,
  content,
  isPublished,
  createdAt,
  userName,
  updatedAt,
  icon,
  showName,
}: ReadNoteDialogProps) {
  const [editContent, setEditContent] = useState(content);
  const [editTitle, setEditTitle] = useState(title);
  const [editEmoji, setEditEmoji] = useState(icon);
  const [open, setOpen] = useState(false);
  const firstText = JSON.parse(editContent)[0].content[0].text;

  const handlePublishToggle = async () => {
    if (authUserId === userId) {
      try {
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
      } catch (e: any) {
        toast.error("Couldn't publish the Note!");
      }
    } else {
      toast.error("Only authorized person can change the state of this note");
    }
  };

  const handleEditContent = async () => {
    try {
      const edit = await editTheNote(noteId, {
        title: editTitle,
        content: editContent,
        icon: editEmoji,
      });
      if (edit) {
        toast.success("Successfully edit the Note");
      } else {
        toast.error("Could not edit Note");
      }
    } catch (e: any) {
      toast.error("Could not edit Note");
    }
  };

  const handleDeleteNote = async () => {
    try {
      const deleteN = await deleteNote({ noteId, userId: authUserId });
      if (deleteN) {
        toast.success("Successfully deleted the Note");
      } else {
        toast.error("Could not delete Note");
      }
    } catch (e: any) {
      toast.error("Could not delete Note");
    }
  };
  console.log(showName);

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
        {authUserId === userId && (
          <form action={handleDeleteNote}>
            <Button
              type="submit"
              formAction={handleDeleteNote}
              variant={"destructive"}
              className="opacity-60 hover:opacity-100 transition-all"
            >
              <TrashIcon />
            </Button>
          </form>
        )}
      </div>

      <Dialog
        open={open}
        onOpenChange={(open) => {
          if (!open) {
            if (
              content !== editContent ||
              title !== editTitle ||
              icon !== editEmoji
            ) {
              handleEditContent();
            }
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
                {editEmoji && editEmoji !== "no_icon" && (
                  <span>{editEmoji}</span>
                )}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="line-clamp-1">{firstText}</CardContent>
            <CardFooter className="absolute bottom-0 flex justify-between items-center w-full">
              {showName &&
                userName &&
                (userName && userId !== authUserId ? (
                  <Button variant={"ghost"}>{userName}</Button>
                ) : (
                  <Button variant={"ghost"}>You</Button>
                ))}
              <div>
                <h3 className="text-neutral-400">
                  {dateFormatter(createdAt as Date)}
                </h3>
                <h3 className="text-neutral-400">
                  {createdAt?.toString() !== updatedAt?.toString() &&
                    `${dateFormatter(updatedAt as Date)} edited`}
                </h3>
              </div>
            </CardFooter>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] md:max-w-[750px] lg:max-w-[900px] xl:max-w-[1100px]">
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center">
              <IconPicker onEmojiChange={setEditEmoji}>
                {editEmoji && editEmoji !== "no_icon" ? (
                  <h2 className="cursor-pointer text-4xl">{editEmoji}</h2>
                ) : (
                  <SmileIcon />
                )}
              </IconPicker>
              <Input
                className="text-5xl border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none focus-visible:ring-offset-0"
                placeholder="Title..."
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[400px] md:max-h-[600px] xl:max-h-[850px]">
            <EditorBox
              isPublished={isPublished}
              authUserId={authUserId}
              userId={userId}
              initialContent={editContent}
              setContent={setEditContent}
            />
          </ScrollArea>
          <DialogFooter>
            <Button
              disabled={
                content === editContent &&
                title === editTitle &&
                icon == editEmoji
                  ? true
                  : false
              }
              onClick={() => {
                handleEditContent();
                setOpen(false);
              }}
            >
              {content === editContent &&
              title === editTitle &&
              icon == editEmoji
                ? "Edit"
                : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
