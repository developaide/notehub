"use client";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { Globe2Icon, LogInIcon } from "lucide-react";
import { UserAvatar } from "./user-avatar";
import useScrollTop from "@/hook/use-scroll-top";
import { cn } from "@/lib/utils";

interface NavbarProp {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  iconLink: string;
}

const Navbar = ({ name, email, image, iconLink }: NavbarProp) => {
  const isScrolled = useScrollTop();
  return (
    <header
      className={cn(
        " bg-neutral-100 dark:bg-neutral-900 h-[10%] sm:h-[8%]  sticky top-0 w-full z-30",
        isScrolled && "border-b border-b-neutral-300 dark:border-b-neutral-700"
      )}
    >
      <nav className="py-4 px-8  md:px-20 flex justify-between items-center">
        <Link
          href={iconLink}
          className="flex justify-between items-center gap-3"
        >
          <Image src={"/note.png"} alt="NoteHub icon" width={30} height={30} />
          <span className="underline font-bold text-lg">NoteHub</span>
        </Link>
        <div className="flex items-center gap-10">
          {email && name ? (
            <UserAvatar email={email} name={name} image={image as string} />
          ) : (
            <Link href={"/"}>
              <LogInIcon />
            </Link>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="hidden sm:block">
                <Link
                  href={"/community"}
                  className={buttonVariants({
                    variant: "ghost",
                    className: "relative",
                  })}
                >
                  <Globe2Icon className="text-sky-500 w-10 h-10 absolute top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-50%]  " />
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
