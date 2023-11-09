"use client";
import { ModeToggle } from "@/components/mode-toggle";
import useScrollTop from "@/hook/use-scroll-top";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const isScrolled = useScrollTop();
  return (
    <header
      className={cn(
        "py-4 px-10 md:px-20 fixed top-0 w-full z-30 bg-background",
        isScrolled && "border-b-2 border-b-neutral-200"
      )}
    >
      <nav className="flex justify-between items-center">
        <Link href={"/"} className="flex justify-between items-center gap-3">
          <Image src={"/note.png"} alt="NoteHub icon" width={30} height={30} />
          <span className="underline font-bold text-lg">NoteHub</span>
        </Link>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
