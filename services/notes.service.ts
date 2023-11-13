import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export type NoteType = {
  title: string;
  userId: string;
  userName: string;
  content: string;
  isPublished: boolean;
  icon?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export async function createNote({
  content,
  isPublished,
  title,
  userId,
  icon,
  userName,
}: NoteType) {
  try {
    (await db()).collection<NoteType>("notes").insertOne({
      title,
      content,
      isPublished,
      userId,
      userName: userName,
      icon: icon ? icon : "no_icon",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return true;
  } catch (e: any) {
    console.error(e.message);
    throw new Error("Could not create note");
  }
}

export async function getAllNoteForAuthUser(userId: string) {
  try {
    const notes = (await db())
      .collection<NoteType>("notes")
      .find({ userId })
      .toArray();

    if (!notes) return false;

    return notes;
  } catch (e: any) {
    throw new Error("Could not retrieve notes");
  }
}
export async function getAllNoteByPublished() {
  try {
    const notes = (await db())
      .collection<NoteType>("notes")
      .find({ isPublished: true })
      .toArray();

    if (!notes) return false;

    return notes;
  } catch (e: any) {
    throw new Error("Could not retrieve notes");
  }
}

export async function editNoteById(id: string, payload: Partial<NoteType>) {
  try {
    const objectId = new ObjectId(id);
    const result = await (await db())
      .collection<NoteType>("notes")
      .updateOne({ _id: objectId }, { $set: payload });

    if (result.modifiedCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (e: any) {
    console.error(e.message);
    throw new Error("Could not update the note");
  }
}

export async function deleteNoteByIdAndAuthUser({
  noteId,
  userId,
}: {
  noteId: string;
  userId: string;
}) {
  try {
    const noteObjectId = new ObjectId(noteId);

    const deleteNote = await (await db())
      .collection<NoteType>("notes")
      .deleteOne({ _id: noteObjectId, userId });

    if (deleteNote.deletedCount > 0) {
      return true;
    } else {
      throw new Error("Could not delete the note");
    }
  } catch (e: any) {
    console.error(e.message);
    throw new Error("Something went wrong!");
  }
}
