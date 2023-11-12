"use server";

import { createNote, editNoteById } from "@/services/notes.service";
import { NoteType } from "./(dashboard)/_components/CreateNote";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/");
    return true;
  } catch (e: any) {
    return false;
  }
}

export async function editTheNote(id: string, payload: Partial<NoteType>) {
  try {
    await editNoteById(id, payload);
    revalidatePath("/");
    return true;
  } catch (e: any) {
    return false;
  }
}
