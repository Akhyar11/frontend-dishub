import React, { useState } from "react";
import FormPengaduan from "../../components/FormPengaduan";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import getToken from "../../utils/getToken";

const AddRambu = () => {
  const [jenisRambu, setJenisRambu] = useState("");
  const [posisi, setPosisi] = useState("");
  const [koordinat, setKoordinat] = useState("");
  const [status, setStatus] = useState("direncanakan");
  const [image, setImage] = useState(undefined);
  const params = useParams();
  const [MSG, setMsg] = useState(false);
  const navigate = useNavigate();

  const addRambu = async () => {
    const id_jalan = params.id;
    try {
      const formData = new FormData();
      formData.append("jalan", image);
      const response = await getToken();
      const accsessToken = response;
      await axios.post(
        "http://localhost:5000/api/v1/todo/",
        { id_jalan, jenis_rambu: jenisRambu, posisi, koordinat, status },
        { headers: { Authorization: "Bearer " + accsessToken } }
      );

      const res = await axios.get(
        "http://localhost:5000/api/v1/todo/rambu/" +
          jenisRambu +
          posisi +
          koordinat
      );
      const id_rambu = res.data.rambu[0].id_rambu;
      await axios.post(
        "http://localhost:5000/api/v1/todo/rambu/gambar/" + id_rambu,
        formData
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
            <FormPengaduan
              label="Koordinat"
              placeholder="tulis detail koordinat"
              change={(e) => setKoordinat(e.target.value)}
              idFor={"Koordinat"}
            />
            <div className="lg:flex mb-4">
              <label
                htmlFor="status"
                className="font-semibold text-sm w-36 flex items-center mr-10 mb-2"
              >
                Status <span className="text-pink-600 ml-1">*</span>
              </label>
              <input
                list="status"
                placeholder="pilih status"
                value={"direncanakan"}
                disabled
                className="border rounded-md w-full p-1 px-5"
                onChange={(e) => setStatus(e.target.value)}
              />
              <datalist id="status">
                <option value="direncanakan">direncanakan</option>
                <option value="terpasang">terpasang</option>
                <option value="dipelihara">dipelihara</option>
              </datalist>
            </div>
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
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
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
