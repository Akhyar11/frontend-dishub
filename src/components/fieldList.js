import React from "react";
import { MdVisibility } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function FieldList({ nomer, ruasJalan, totalRambu, dark, idJalan }) {
  const isDark = `md:bg-gray-100 border-r px-2 border-white`;
  const navigate = useNavigate();
  const handelDetail = () => {
    navigate("/detail/" + idJalan);
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
        <div className={dark ? `${isDark} py-2` : "py-3 px-2"}>
          <button
            onClick={handelDetail}
            className="bg-sky-400 hover:bg-sky-600 transition-all mx-auto flex items-center text-white font-semibold px-3 py-1 rounded-md"
          >
            <span className="mr-1">
              <MdVisibility />
            </span>
            Detail
          </button>
        </div>
      </td>
    </tr>
  );
}

export default FieldList;
