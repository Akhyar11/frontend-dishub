import React from "react";
import { MdAccountCircle } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="w-full bg-white">
      <div className="p-4 shadow-md">
        <div className="flex items-center w-full">
          <MdAccountCircle className="text-2xl" />
          <input
            type="text"
            placeholder="Search"
            className="border bg-gray-100 ml-auto hover:border-black rounded-md pl-2 p-1 placeholder:italic placeholder:font-semibold font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
