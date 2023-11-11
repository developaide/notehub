import { getServerSession } from "next-auth";
import { ReadNoteDialog } from "./ReadNoteDialog";
import { authOptions } from "@/lib/authOptions";

const NoteCard = async ({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) => {
  return <ReadNoteDialog id={id} content={content} title={title} />;
};

export default NoteCard;
