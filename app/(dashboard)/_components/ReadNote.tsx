import { getServerSession } from "next-auth";
import { ReadNoteDialog } from "./ReadNoteDialog";
import { authOptions } from "@/lib/authOptions";

const ReadNote = async ({
  noteId,
  userId,
  title,
  content,
  isPublished,
  createdAt,
  updatedAt,
  icon,
  userName,
  showName,
}: {
  userId: string;
  noteId: string;
  userName: string;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  icon?: string;
  showName?: boolean;
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
      createdAt={createdAt}
      updatedAt={updatedAt}
      icon={icon}
      userName={userName}
      showName={showName}
    />
  );
};

export default ReadNote;
