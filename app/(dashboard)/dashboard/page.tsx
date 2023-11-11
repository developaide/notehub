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
    <div className="mt-12 grid grid-cols-4 gap-7 px-16 ">
      <CreateNote />
      {notes &&
        notes.map((note) => (
          <ReadNote
            title={note.title}
            content={note.content}
            key={note._id.toString()}
          />
        ))}
    </div>
  );
};

export default Dashboard;
