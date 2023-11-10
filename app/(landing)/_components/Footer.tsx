import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="md:fixed md:bottom-0 flex py-4 px-10 md:px-20  justify-between items-center w-full">
      <Link
        href={"/"}
        className="hidden md:flex justify-between items-center gap-3"
      >
        <Image src={"/note.png"} alt="NoteHub icon" width={30} height={30} />
        <span className="underline font-bold text-lg">NoteHub</span>
      </Link>
      <div className="w-full md:w-auto flex justify-between items-center gap-4">
        <Button variant={"ghost"}>Privacy & Policy</Button>
        <Button variant={"ghost"}>Teams & Conditions</Button>
      </div>
    </footer>
  );
};

export default Footer;