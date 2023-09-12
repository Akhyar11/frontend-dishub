import axios from "axios";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { MdOutlineBookmark } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Gambar = ({ gambar }) => {
  return (
    <div className="bg-white rounded-md border border-gray-300 mb-10">
      <div className="p-4 flex border-b items-center">
        <MdOutlineBookmark className="mr-2" />
        <h1>Gambar</h1>
      </div>
      <div className="p-10">
        <div className="mb-2 max-w-xs font-semibold">Direncanakan</div>
        <div className="max-w-xs font-semibold flex">
          {gambar.map((i) => {
            if (i.status === "direncanakan") {
              return <IsiGambar i={i} />;
            }
          })}
        </div>
        <div className="mb-2 max-w-xs font-semibold">Terpasang</div>
        <div className="max-w-xs font-semibold flex">
          {gambar.map((i) => {
            if (i.status === "terpasang") {
              return <IsiGambar i={i} />;
            }
          })}
        </div>
        <div className="mb-2 max-w-xs font-semibold">Dipelihara</div>
        <div className="max-w-xs font-semibold flex">
          {gambar.map((i) => {
            if (i.status === "dipelihara") {
              return <IsiGambar i={i} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

const IsiGambar = ({ i }) => {
  const navigate = useNavigate();
  const del = async () => {
    await axios.delete(
      "http://localhost:5000/api/v1/todo/delate/jalan/gambar/" +
        i.id_gambarRambu
    );
    window.location.reload();
  };
  const edit = () => {
    navigate("/dashboard/admin/update/status/" + i.id_gambarRambu);
  };
  return (
    <div key={i.id_gambarRambu}>
      {i.gambar === "" ? (
        <></>
      ) : (
        <div className="relative">
          <img key={i.id_gambarRambu} src={i.gambar} alt={i.id_gambarRambu} />
          <div className="w-full flex absolute bottom-0 opacity-0 transition-all hover:opacity-100">
            <button
              onClick={del}
              className="bg-red-400 hover:bg-red-600 transition-all mx-auto mt-2  text-white font-semibold p-2 rounded-md"
            >
              <span>
                <FaTrashAlt />
              </span>
            </button>
            <button
              onClick={edit}
              className="bg-sky-400 hover:bg-sky-600 transition-all mx-auto mt-2 text-white font-semibold p-2 rounded-md"
            >
              <span>
                <FaPencilAlt />
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gambar;
