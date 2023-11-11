"use server";

import { createNote, editNoteById } from "@/services/notes.service";
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

export async function editTheNote(id: string, payload: Partial<NoteType>) {
  try {
    await editNoteById(id, payload);

    return true;
  } catch (e: any) {
    return false;
  }
}
