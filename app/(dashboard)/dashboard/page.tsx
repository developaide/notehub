import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getAllNoteForAuthUser } from "@/services/notes.service";
import ReadNote from "../_components/ReadNote";
import CreateNote from "../_components/CreateNote";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  const notes = await getAllNoteForAuthUser(session.user.userId);
  return (
    <div className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-7 px-4 md:px-10 lg:px-16  ">
      <CreateNote />
      {notes &&
        notes.map((note) => (
          <ReadNote
            userId={note.userId}
            noteId={note._id.toString()}
            title={note.title}
            content={note.content}
            key={note._id.toString()}
            isPublished={note.isPublished}
          />
        ))}
    </div>
  );
};

export default Dashboard;
