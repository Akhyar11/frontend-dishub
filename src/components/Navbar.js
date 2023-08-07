import React from "react";
import { MdAccountCircle } from "react-icons/md";
import logoDishub from "../assets/Departemen_Perhubungan.png";
import logoBoyolali from "../assets/Kabupaten_Boyolali.png";

const Navbar = () => {
  return (
    <div className="w-full bg-white fixed z-10">
      <div className="p-3 md:px-44 transition-all shadow-md">
        <div className="flex items-center w-full">
          <div className="w-8 flex mr-2">
            <img src={logoBoyolali} alt="logo dishub" />
          </div>
          <div className="w-10 flex mr-2">
            <img src={logoDishub} alt="logo dishub" />
          </div>
          <div className="w-[1px] h-10 bg-black mr-2"></div>
          <div className="font-semibold mr-4 text-sm">
            <span className="text-3xl">SIPELAN</span>
            <br />
            <span>Kabupaten Boyolali</span>
          </div>
          {/* <MdAccountCircle className="text-5xl hover:text-sky-400 transition-all" /> */}
          <button className="border-2 hover:border-black transition-all rounded-md ml-auto py-2 px-3">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
