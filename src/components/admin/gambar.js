import axios from "axios";
import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { MdOutlineBookmark } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Gambar = ({ status, gambar }) => {
  const [a, setA] = useState(status === "direncakan" ? true : false);
  const [b, setB] = useState(status === "terpasang" ? true : false);
  const [c, setC] = useState(status === "dipelihara" ? true : false);
  const active = (btn) => {
    const btnA = document.getElementById("a").classList;
    const btnB = document.getElementById("b").classList;
    const btnC = document.getElementById("c").classList;
    if (btn === "a") {
      setA(true);
      setB(false);
      setC(false);
      btnA.add("bg-gray-400");
      btnB.remove("bg-gray-400");
      btnC.remove("bg-gray-400");
    } else if (btn === "b") {
      setA(false);
      setB(true);
      setC(false);
      btnA.remove("bg-gray-400");
      btnB.add("bg-gray-400");
      btnC.remove("bg-gray-400");
    } else {
      setA(false);
      setB(false);
      setC(true);
      btnA.remove("bg-gray-400");
      btnB.remove("bg-gray-400");
      btnC.add("bg-gray-400");
    }
  };
  return (
    <div className="bg-white rounded-md border border-gray-300 mb-10">
      <div className="p-4 flex border-b items-center">
        <MdOutlineBookmark className="mr-2" />
        <h1>Gambar</h1>
      </div>
      <div className="relative p-6">
        <div className="flex gap-4 ">
          <button
            className={`rounded-t-md p-2 transition-all ${
              status === "direncanakan" ? "bg-gray-400" : ""
            }`}
            onClick={() => active("a")}
            id="a"
          >
            Direncanakan
          </button>
          <button
            onClick={() => active("b")}
            id="b"
            className={`rounded-t-md p-2 transition-all ${
              status === "terpasang" ? "bg-gray-400" : ""
            }`}
          >
            Terpasang
          </button>
          <button
            onClick={() => active("c")}
            id="c"
            className={`rounded-t-md p-2 transition-all ${
              status === "dipelihara" ? "bg-gray-400" : ""
            }`}
          >
            Dipelihara
          </button>
        </div>
        <div className="bg-gray-400 p-6 rounded-b-md rounded-r-md flex gap-4 overflow-auto relative">
          {gambar.map((i) => {
            if (a && i.status === "direncanakan") {
              return (
                <>
                  <img
                    src={i.gambar}
                    alt="direncanakan"
                    className="w-64 rounded-md"
                  />
                </>
              );
            }
            if (b && i.status === "terpasang") {
              return (
                <>
                  <img
                    src={i.gambar}
                    alt="direncanakan"
                    className="w-64 rounded-md"
                  />
                </>
              );
            }
            if (c && i.status === "dipelihara") {
              return (
                <>
                  <img
                    src={i.gambar}
                    alt="direncanakan"
                    className="w-64 rounded-md"
                  />
                </>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Gambar;