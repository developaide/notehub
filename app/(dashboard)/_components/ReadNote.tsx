import { ReadNoteDialog } from "./ReadNoteDialog";

const NoteCard = ({ title, content }: { title: string; content: string }) => {
  return <ReadNoteDialog content={content} title={title} />;
};

export default NoteCard;
