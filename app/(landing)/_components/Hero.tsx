import Image from "next/image";

const Hero = () => {
  return (
    <div className="mt-6 flex justify-between items-center gap-8">
      <Image
        src={"/business-tasklist.png"}
        alt="landing image 1"
        width={300}
        height={300}
        className="hidden md:block"
      />
      <Image
        src={"/mobile-book.png"}
        alt="landing image 2"
        width={300}
        height={300}
      />
    </div>
  );
};

export default Hero;
