import { getServerSession } from "next-auth";
import { ReadNoteDialog } from "./ReadNoteDialog";
import { authOptions } from "@/lib/authOptions";

const NoteCard = async ({
  noteId,
  userId,
  title,
  content,
  isPublished,
}: {
  userId: string;
  noteId: string;
  title: string;
  content: string;
  isPublished: boolean;
}) => {
  const session = await getServerSession(authOptions);
  return (
    <ReadNoteDialog
      authUserId={session?.user.userId as string}
      userId={userId}
      isPublished={isPublished}
      noteId={noteId}
      content={content}
      title={title}
    />
  );
};

export default NoteCard;
