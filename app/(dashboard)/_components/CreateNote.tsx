import { CreateNoteDialog } from "./CreateNoteDialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { saveNoteToDB } from "@/app/action";

export type NoteType = {
  title: string;
  userId: string;
  content: string;
  isPublished: boolean;
  icon?: string;
  coverImg?: string;
};

const CreateNote = async () => {
  const session = await getServerSession(authOptions);

  return (
    <CreateNoteDialog
      userId={session?.user.userId}
      saveNoteToDB={saveNoteToDB}
    />
  );
};

export default CreateNote;
