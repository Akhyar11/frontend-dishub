import React from "react";
import belok from "../assets/18678-ruasjalan.png";
import { MdVisibility } from "react-icons/md";

const FieldRambu = ({ dark, nomer, jenisRambu, gambar, posisi, jalan }) => {
  const isDark = `border-r px-2 border-white`;
  return (
    <tr className={dark ? "border-b bg-gray-100" : "border-b"}>
      <td className="text-center">
        <div className={dark ? `${isDark} py-3` : "py-3 px-2"}>{nomer}</div>
      </td>
      <td>
        <div className={dark ? `${isDark} py-3` : "py-3 px-2"}>
          {jenisRambu}
        </div>
      </td>
      <td>
        <div className={dark ? `${isDark} py-3` : "py-3 px-2"}>{jalan}</div>
      </td>
      <td className="text-center">
        <div
          className={
            dark ? `${isDark} flex justify-center` : "px-2 flex justify-center"
          }
        >
          <img src={belok} className="w-10 rounded-md" alt="belok" />
        </div>
      </td>
      <td className="text-center">
        <div className={dark ? `${isDark} py-3` : "py-3 px-2"}>{posisi}</div>
      </td>
      <td>
        <div className={dark ? `${isDark} py-2` : "py-3 px-2"}>
          <button className="bg-sky-400 hover:bg-sky-600 transition-all mx-auto flex items-center text-white font-semibold px-3 py-1 rounded-md">
            <span className="mr-1">
              <MdVisibility />
            </span>
            Detail
          </button>
        </div>
      </td>
    </tr>
  );
};

export default FieldRambu;
