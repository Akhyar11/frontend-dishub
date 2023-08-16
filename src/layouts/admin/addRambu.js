import React, { useState } from "react";
import FormPengaduan from "../../components/FormPengaduan";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

const AddRambu = () => {
  const [jenisRambu, setJenisRambu] = useState("");
  const [posisi, setPosisi] = useState("");
  const params = useParams();
  const [MSG, setMsg] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const addRambu = async () => {
    const id_jalan = params.id;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/token",
        {
          token,
        }
      );
      const accsessToken = response.data.accsessToken;
      await axios.post(
        "http://localhost:5000/api/v1/todo/",
        { id_jalan, jenis_rambu: jenisRambu, posisi },
        { headers: { Authorization: "Bearer " + accsessToken } }
      );
      navigate("/dashboard/admin/detail/" + id_jalan);
    } catch (err) {
      const msg = err.response.data.msg;
      if (msg === "Harap login dulu") {
        navigate("/login");
      } else {
        setMsg(msg);
      }
    }
  };

  const handelBatal = () => {
    navigate("/dashboard/admin/detail/" + params.id);
  };
  return (
    <>
      <NavbarAdmin />
      <div className="p-8 pt-28 lg:mx-72">
        <div className="bg-white rounded-md border border-gray-300 mb-10">
          <div className="p-4 flex border-b items-center">
            <h1>Tambah Data Rambu</h1>
          </div>
          <div className={MSG ? "px-10 pb-10" : "p-10"}>
            {MSG ? (
              <div className="w-full my-4 flex justify-center p-2 bg-red-400 rounded-md font-semibold text-white">
                {MSG}
              </div>
            ) : (
              <></>
            )}
            <div className="lg:flex mb-4">
              <label
                htmlFor="jenisRambu"
                className="font-semibold text-sm w-36 flex items-center mr-10 mb-2"
              >
                Jenis Rambu <span className="text-pink-600 ml-1">*</span>
              </label>
              <input
                list="jenisRambu"
                placeholder="pilih jenis rambu"
                className="border rounded-md w-full p-1 px-5"
                onChange={(e) => setJenisRambu(e.target.value)}
              />
              <datalist id="jenisRambu">
                <option value="Hati-Hati">Hati-Hati</option>
                <option value="Belok Kanan">Belok Kanan</option>
                <option value="Belok Kiri">Belok Kiri</option>
                <option value="Stop">Stop</option>
              </datalist>
            </div>
            <div className="lg:flex mb-4">
              <label
                htmlFor="posisi"
                className="font-semibold text-sm w-36 flex items-center mr-10 mb-2"
              >
                Posisi <span className="text-pink-600 ml-1">*</span>
              </label>
              <input
                list="posisi"
                placeholder="pilih jenis rambu"
                className="border rounded-md w-full p-1 px-5"
                onChange={(e) => setPosisi(e.target.value)}
              />
              <datalist id="posisi">
                <option value="Kanan">Kanan</option>
                <option value="Kiri">Kiri</option>
                <option value="Tengah">Tengah</option>
              </datalist>
            </div>
            <div className="lg:flex">
              <button
                onClick={addRambu}
                className="bg-green-600 hover:bg-green-700 mr-4 transition-all py-1 px-3 border border-gray-400 font-semibold text-gray-50"
              >
                Tambah
              </button>
              <button
                onClick={handelBatal}
                className="bg-white hover:bg-gray-100 transition-all py-1 px-3 border border-gray-400 font-semibold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRambu;
