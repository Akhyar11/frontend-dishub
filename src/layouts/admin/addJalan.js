import React, { useState } from "react";
import FormPengaduan from "../../components/FormPengaduan";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getToken from "../../utils/getToken";

const AddJalan = () => {
  const [kecamatan, setKecamatan] = useState("");
  const [tp, setTp] = useState("");
  const [tu, setTu] = useState("");
  const [MSG, setMsg] = useState(false);
  const navigate = useNavigate();

  const addJalan = async () => {
    try {
      const response = await getToken();
      const accsessToken = response;
      await axios.post(
        "http://localhost:5000/api/v1/todo/jalan",
        { kecamatan, titik_pangkal: tp, titik_ujung: tu },
        { headers: { Authorization: "Bearer " + accsessToken } }
      );
      navigate("/dashboard/admin");
    } catch (err) {
      const msg = err.response.data.msg;
      if (msg === "Harap login dulu") {
        navigate("/login");
      } else {
        setMsg(msg);
      }
    }
  };
  return (
    <>
      <NavbarAdmin />
      <div className="p-8 pt-28 lg:mx-72">
        <div className="bg-white rounded-md border border-gray-300 mb-10">
          <div className="p-4 flex border-b items-center">
            <h1>Tambah Data Jalan</h1>
          </div>
          <div className={MSG ? "px-10 pb-10" : "p-10"}>
            {MSG ? (
              <div className="w-full my-4 flex justify-center p-2 bg-red-400 rounded-md font-semibold text-white">
                {MSG}
              </div>
            ) : (
              <></>
            )}

            <FormPengaduan
              label="Kecamatan"
              placeholder="tulis nama kecamatan"
              change={(e) => setKecamatan(e.target.value)}
              idFor={"Kecamatan"}
            />
            <FormPengaduan
              idFor={"titik_ujung"}
              change={(e) => setTp(e.target.value)}
              label="Titik Ujung"
              placeholder="tulis titik ujung"
            />
            <FormPengaduan
              idFor={"titik_pangkal"}
              change={(e) => setTu(e.target.value)}
              label="Titik Pangkal"
              placeholder="tulis titik pangkal"
            />
            <div className="lg:flex mb-4">
              <label
                htmlFor="upload"
                className="font-semibold text-sm w-36 mr-10 mb-2"
              >
                Upload Foto Pendukung
                <span className="text-pink-600 ml-1">*</span>
              </label>
              <input
                type="file"
                id="upload"
                placeholder="tulis isi pengaduan"
                className="mt-2 mb-6 -ml-5"
              />
            </div>
            <div className="lg:flex">
              <button
                onClick={addJalan}
                className="bg-green-600 hover:bg-green-700 lg:mr-4 transition-all py-1 px-3 border border-gray-400 font-semibold text-gray-50"
              >
                Tambah
              </button>
              <button
                onClick={() => navigate("/dashboard/admin")}
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

export default AddJalan;
