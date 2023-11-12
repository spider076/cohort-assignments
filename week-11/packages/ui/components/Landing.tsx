import Image from "next/image";
import Navbar from "../layouts/Navbar";
import AuthButtons from "../@/components/AuthButtons";

interface Props {
    user: String;
}

export default function Landing({user}: Props) {
  return (
    <main className="bg-[#191919] text-white h-[100vh] w-full">
      <Navbar />
      <section className="flex justify-between items-center 
      
      xl:px-56 p-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-[2.6rem] font-bold xl:text-[2.9rem]">
            Coursera {user}
          </h1>
          <h3 className="pb-5">A Place to Learn, earn and grow</h3>
          <AuthButtons />
        </div>
        <div>
          <Image
            src={
              "https://img.freepik.com/free-vector/empty-classroom-interior-with-chalkboard_1308-65378.jpg"
            }
            className="rounded-md xl:h-[400px] xl:w-[770px]"
            width={450}
            height={400}
            alt={"course-image"}
          />
        </div>
      </section>
    </main>
  );
}