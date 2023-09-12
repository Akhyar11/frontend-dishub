import React, { useEffect, useState } from "react";
import FormPengaduan from "../../components/FormPengaduan";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import getToken from "../../utils/getToken";

const UpdateRambu = () => {
  const [jenisRambu, setJenisRambu] = useState("");
  const [posisi, setPosisi] = useState("");
  const [koordinat, setKoordinat] = useState("");
  const [status, setStatus] = useState("direncanakan");
  const [image, setImage] = useState(undefined);
  const params = useParams();
  const [MSG, setMsg] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/todo/get/rambu/id/" + params.id
      );

      const { rambu } = response.data.data;
      setJenisRambu(rambu[0].jenis_rambu);
      setPosisi(rambu[0].posisi);
      setKoordinat(rambu[0].koordinat);
      setStatus(rambu[0].status);
    } catch (err) {
      console.log({ err });
    }
  };

  const addRambu = async () => {
    const id_jalan = params.id;
    try {
      if (
        jenisRambu === "" ||
        status === "" ||
        posisi === "" ||
        koordinat === "" ||
        image === undefined
      ) {
        setMsg("Pastikan semua form terisi");
      } else {
        const formData = new FormData();
        formData.append("jalan", image);
        const response = await getToken();
        const accsessToken = response;
        await axios.put(
          "http://localhost:5000/api/v1/todo/update/rambu/" + params.id,
          { jenis_rambu: jenisRambu, posisi, koordinat, status },
          { headers: { Authorization: "Bearer " + accsessToken } }
        );

        const res = await axios.get(
          "http://localhost:5000/api/v1/todo/rambu/" +
            jenisRambu +
            posisi +
            koordinat
        );
        const id_rambu = res.data.rambu[0].id_rambu;
        const resGambar = await axios.post(
          "http://localhost:5000/api/v1/todo/rambu/gambar/" + id_rambu,
          formData
        );
        await axios.post(
          "http://localhost:5000/api/v1/todo/rambu/gambar/status/" +
            resGambar.data.id_gambarRambu,
          {
            status,
          }
        );

        navigate("/dashboard/admin/detail/rambu/" + id_rambu);
      }
    } catch (err) {
      const msg = err.response.data.msg;
      console.log({ err });
      if (msg === "Harap login dulu") {
        navigate("/login");
      } else {
        setMsg(msg);
      }
    }
  };

  const handelBatal = () => {
    navigate("/dashboard/admin/detail/rambu/" + params.id);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <NavbarAdmin />
      <div className="p-8 pt-28 lg:mx-72">
        <div className="bg-white rounded-md border border-gray-300 mb-10">
          <div className="p-4 flex border-b items-center">
            <h1>Edit Data Rambu</h1>
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
                value={jenisRambu}
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
                value={posisi}
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
              value={koordinat}
              change={(e) => setKoordinat(e.target.value)}
              idFor={"Koordinat"}
            />
            <div className="lg:flex mb-4">
              <p className="font-semibold text-sm w-36 flex items-center mb-2">
                Status <span className="text-pink-600 ml-1">*</span>
              </p>
              <div className="flex items-center mr-2">
                <input
                  type="radio"
                  id="Direncanakan"
                  name="fav_language"
                  onClick={(e) => setStatus(e.target.value)}
                  value="direncanakan"
                />
                <label
                  htmlFor="Direncanakan"
                  className="font-semibold text-sm ml-1"
                >
                  Direncanakan
                </label>
              </div>
              <div className="flex items-center mr-2">
                <input
                  type="radio"
                  id="Terpasang"
                  name="fav_language"
                  onClick={(e) => setStatus(e.target.value)}
                  value="terpasang"
                />
                <label
                  htmlFor="Terpasang"
                  className="font-semibold text-sm ml-1"
                >
                  Terpasang
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Dipelihara"
                  name="fav_language"
                  value="dipelihara"
                  onClick={(e) => setStatus(e.target.value)}
                />
                <label
                  htmlFor="Dipelihara"
                  className="font-semibold text-sm ml-1"
                >
                  Dipelihara
                </label>
              </div>
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

export default UpdateRambu;
