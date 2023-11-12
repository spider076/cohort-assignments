import Link from "next/link";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

const BackButton = () => {
  return (
    <Link href={"/"} className="absolute top-4 left-3 bg-white p-3
    hover:bg-black transition-all ease-linear hover:text-white  rounded-full text-black">
      <BiArrowBack className="text-[1.4rem] xl:text-[1.9rem]" />
    </Link>
  );
};

export default BackButton;
