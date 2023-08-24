import axios from "axios";
import React from "react";
import { useState } from "react";
import { MdOutlineBookmark } from "react-icons/md";

const Gambar = ({ gambar }) => {
  return (
    <div className="bg-white rounded-md border border-gray-300 mb-10">
      <div className="p-4 flex border-b items-center">
        <MdOutlineBookmark className="mr-2" />
        <h1>Gambar</h1>
      </div>
      <div className="p-10 flex">
        <div className="max-w-xs font-semibold">
          {gambar.map((i) => {
            if (i.status === "direncanakan") {
              return (
                <div key={i.id_gambarRambu}>
                  <div className="mb-2">Direncanakan</div>
                  <img
                    key={i.id_gambarRambu}
                    src={i.gambar}
                    alt={i.id_gambarRambu}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="max-w-xs">
          {gambar.map((i) => {
            if (i.status === "terpasang") {
              return (
                <div key={i.id_gambarRambu}>
                  <div className="mb-2">Terpasang</div>
                  <img
                    key={i.id_gambarRambu}
                    className="rounded-sm border border-sky-400"
                    src={i.gambar}
                    alt={i.id_gambarRambu}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="max-w-xs">
          {gambar.map((i) => {
            if (i.status === "dipelihara") {
              return (
                <div key={i.id_gambarRambu}>
                  <div className="mb-2">Dipelihara</div>
                  <img
                    key={i.id_gambarRambu}
                    className="rounded-sm border border-sky-400"
                    src={i.gambar}
                    alt={i.id_gambarRambu}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Gambar;
