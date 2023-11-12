import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const LandingPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-full">
      <Navbar
        iconLink="/"
        name={session?.user.name}
        email={session?.user.email}
        image={session?.user.image}
      />
      <main className="h-full">{children}</main>
    </div>
  );
};

export default LandingPageLayout;
