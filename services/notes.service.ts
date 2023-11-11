import { NoteType } from "@/app/(dashboard)/_components/CreateNote";
import { db } from "@/lib/mongodb";

export async function createNote({
  content,
  isPublished,
  title,
  userId,
  icon,
  coverImg,
}: NoteType) {
  try {
    (await db()).collection<NoteType>("notes").insertOne({
      title,
      content,
      isPublished,
      userId,
      icon: icon ? icon : "no_icon",
      coverImg: coverImg ? coverImg : "no_coverImg",
    });
    return true;
  } catch (e: any) {
    console.error(e.message);
    throw new Error("Could not create note");
  }
}

export async function getAllNoteForAuthUser(userId: string) {
  try {
    const notes = (await db()).collection<NoteType>("notes").find({ userId });

    if (!notes) return false;

    return notes;
  } catch (e: any) {
    throw new Error("Could not create note");
  }
}
