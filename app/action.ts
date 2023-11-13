"use server";

import {
  NoteType,
  createNote,
  deleteNoteByIdAndAuthUser,
  editNoteById,
} from "@/services/notes.service";
import { revalidatePath } from "next/cache";

export async function saveNoteToDB({
  content,
  isPublished,
  title,
  userId,
  userName,
  icon,
}: NoteType) {
  try {
    await createNote({
      content,
      isPublished,
      title,
      userId,
      userName,
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
    await editNoteById(id, { ...payload, updatedAt: new Date() });
    revalidatePath("/");
    return true;
  } catch (e: any) {
    return false;
  }
}

export async function deleteNote({
  userId,
  noteId,
}: {
  userId: string;
  noteId: string;
}) {
  try {
    await deleteNoteByIdAndAuthUser({ noteId, userId });
    revalidatePath("/");
    return true;
  } catch (e: any) {
    return false;
  }
}
