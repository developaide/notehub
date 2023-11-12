import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { Globe2Icon } from "lucide-react";

interface NavbarProp {
  name: string;
  email: string;
  image: string;
}

const Navbar = ({ name, email, image }: NavbarProp) => {
  return (
    <header className="bg-neutral-100 dark:bg-neutral-900 h-[8%]">
      <nav className="py-4 px-8  md:px-20 flex justify-between items-center">
        <Link
          href={"/dashboard"}
          className="flex justify-between items-center gap-3"
        >
          <Image src={"/note.png"} alt="NoteHub icon" width={30} height={30} />
          <span className="underline font-bold text-lg">NoteHub</span>
        </Link>
        <div className="flex items-center gap-10">
          <UserAvatar email={email} name={name} image={image} />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={"/community"}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  <Globe2Icon className="text-sky-500 w-10 h-10" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>NoteHub Community</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
