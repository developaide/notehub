import { CreateNoteDialog } from "./CreateNoteDialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { saveNoteToDB } from "@/app/action";

const CreateNote = async () => {
  const session = await getServerSession(authOptions);

  return (
    <CreateNoteDialog
      userName={session?.user.name as string}
      userId={session?.user.userId}
      saveNoteToDB={saveNoteToDB}
    />
  );
};

export default CreateNote;
