"use server";

import { createNote } from "@/services/notes.service";
import { NoteType } from "./(dashboard)/_components/CreateNote";

export async function saveNoteToDB({
  content,
  isPublished,
  title,
  userId,
  coverImg,
  icon,
}: NoteType) {
  try {
    await createNote({
      content,
      isPublished,
      title,
      userId,
      coverImg,
      icon,
    });
    return true;
  } catch (e: any) {
    return false;
  }
}
