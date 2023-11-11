import { NoteType } from "@/app/(dashboard)/_components/CreateNoteDialog";
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
    throw new Error(e.message);
  }
}
