import AuthButtons from "../@/components/AuthButtons";
import React from "react";

const Navbar = () => {
  return (
    <nav className="px-5 py-3 flex justify-between items-center">
      <h1 className="font-bold text-[1.3rem] xl:text-[1.7rem]">Coursera</h1>
        <AuthButtons />
    </nav>
  );
};

export default Navbar;
