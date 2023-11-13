import ReadNote from "@/app/(dashboard)/_components/ReadNote";
import { getAllNoteByPublished } from "@/services/notes.service";

const Community = async () => {
  const notes = await getAllNoteByPublished();

  return (
    <div className="my-12  pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-7 px-4 md:px-10 lg:px-16  ">
      {notes &&
        notes.map((note) => (
          <ReadNote
            userName={note.userName}
            userId={note.userId}
            noteId={note._id.toString()}
            title={note.title}
            content={note.content}
            key={note._id.toString()}
            isPublished={note.isPublished}
            createdAt={note.createdAt}
            updatedAt={note.updatedAt}
            icon={note.icon}
            showName={true}
          />
        ))}
    </div>
  );
};

export default Community;
