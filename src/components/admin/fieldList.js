import React from "react";
import { MdVisibility } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function FieldList({
  nomer,
  ruasJalan,
  totalRambu,
  dark,
  idJalan,
  deleteJalan,
}) {
  const isDark = `md:bg-gray-100 border-r px-2 border-white`;
  const navigate = useNavigate();
  const handelDetail = () => {
    navigate("/dashboard/admin/detail/" + idJalan);
  };

  return (
    <tr className="border-b">
      <td className="text-center">
        <div className={dark ? `${isDark} py-3` : "py-3 px-2"}>{nomer}</div>
      </td>
      <td>
        <div className={dark ? `${isDark} py-3` : "py-3 px-2"}>{ruasJalan}</div>
      </td>
      <td className="text-center">
        <div className={dark ? `${isDark} py-3` : "py-3 px-2"}>
          {totalRambu}
        </div>
      </td>
      <td>
        <div className={dark ? `${isDark} py-2 md:flex` : "py-3 px-2 md:flex"}>
          <button
            onClick={handelDetail}
            className="bg-sky-400 hover:bg-sky-600 transition-all ml-auto mr-2 mb-2 md:mb-0 flex items-center text-white font-semibold px-3 py-1 rounded-md"
          >
            <span className="mr-1">
              <MdVisibility />
            </span>
            Detail
          </button>
          <button
            onClick={() => deleteJalan(idJalan, ruasJalan)}
            className="bg-red-400 hover:bg-red-600 transition-all mr-auto flex items-center text-white font-semibold px-3 py-1 rounded-md"
          >
            <span className="mr-1">
              <MdVisibility />
            </span>
            Hapus
          </button>
        </div>
      </td>
    </tr>
  );
}

export default FieldList;
