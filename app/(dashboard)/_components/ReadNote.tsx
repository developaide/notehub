import { getServerSession } from "next-auth";
import { ReadNoteDialog } from "./ReadNoteDialog";
import { authOptions } from "@/lib/authOptions";

const NoteCard = async ({
  noteId,
  userId,
  title,
  content,
  isPublished,
  createdAt,
  updatedAt,
  icon,
}: {
  userId: string;
  noteId: string;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  icon?: string;
}) => {
  const session = await getServerSession(authOptions);
  console.log(icon);

  return (
    <ReadNoteDialog
      authUserId={session?.user.userId as string}
      userId={userId}
      isPublished={isPublished}
      noteId={noteId}
      content={content}
      title={title}
      createdAt={createdAt}
      updatedAt={updatedAt}
      icon={icon}
    />
  );
};

export default NoteCard;
