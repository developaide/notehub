import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Logout from "../_components/Logout";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  return (
    <div>
      {session.user?.name}
      <Logout />
    </div>
  );
};

export default Dashboard;
