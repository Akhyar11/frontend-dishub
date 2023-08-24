import React from "react";
import { MdVisibility } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const FieldRambu = ({
  dark,
  nomer,
  jenisRambu,
  posisi,
  koordinat,
  status,
  nav,
  del,
}) => {
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
        <div className={dark ? `${isDark} py-3` : "py-3 px-2"}>{koordinat}</div>
      </td>
      <td className="text-center">
        <div className={dark ? `${isDark} py-3` : "py-3 px-2"}>{posisi}</div>
      </td>
      <td className="text-center">
        <div
          className={
            dark
              ? `${isDark} py-3 ${
                  status === "direncanakan"
                    ? "text-yellow-400"
                    : status === "terpasang"
                    ? "text-green-400"
                    : "text-red-400"
                }`
              : `py-3 px-2 ${
                  status === "direncanakan"
                    ? "text-yellow-400"
                    : status === "terpasang"
                    ? "text-green-400"
                    : "text-red-400"
                }`
          }
        >
          {status}
        </div>
      </td>
      <td>
        <div className={dark ? `${isDark} py-2 flex` : "py-3 px-2 flex"}>
          <button
            onClick={nav}
            className="bg-sky-400 hover:bg-sky-600 transition-all mx-auto flex items-center justify-center text-white font-semibold p-2 rounded-md"
          >
            <span>
              <MdVisibility />
            </span>
          </button>
          <button
            onClick={del}
            className="bg-red-400 hover:bg-red-600 transition-all mx-auto flex items-center justify-center text-white font-semibold p-2 rounded-md"
          >
            <span>
              <FaTrashAlt />
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default FieldRambu;
