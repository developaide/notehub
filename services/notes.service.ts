import { NoteType } from "@/app/(dashboard)/_components/CreateNote";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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
    const notes = (await db())
      .collection<NoteType>("notes")
      .find({ userId })
      .toArray();

    if (!notes) return false;

    return notes;
  } catch (e: any) {
    throw new Error("Could not create note");
  }
}

// export async function editNoteById(id: string, payload: Partial<NoteType>) {
//   try {
//     (await db()).collection<NoteType>("notes").updateOne({ _id: id }, payload);
//     return true;
//   } catch (e: any) {
//     console.error(e.message);
//     throw new Error("Could not create note");
//   }
// }

export async function editNoteById(id: string, payload: Partial<NoteType>) {
  try {
    const objectId = new ObjectId(id); // Convert the string id to ObjectId
    const result = await (await db())
      .collection<NoteType>("notes")
      .updateOne({ _id: objectId }, { $set: payload });

    if (result.modifiedCount > 0) {
      return true; // Return true if the document was successfully updated
    } else {
      return false; // Return false if the document with the given id was not found
    }
  } catch (e: any) {
    console.error(e.message);
    throw new Error("Could not update note");
  }
}
