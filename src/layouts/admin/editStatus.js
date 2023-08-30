import React, { useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStatus = () => {
  const [image, setImage] = useState(undefined);
  const params = useParams();
  const [MSG, setMsg] = useState(false);
  const navigate = useNavigate();

  const addRambu = async () => {
    try {
      const formData = new FormData();
      formData.append("jalan", image);
      const resGambar = await axios.put(
        "http://localhost:5000/api/v1/todo/update/rambu/gambar/" + params.id,
        formData
      );

      navigate(
        "/dashboard/admin/detail/rambu/" + resGambar.data.last[0].id_rambu
      );
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
    navigate("/dashboard/admin/detail/" + params.id);
  };
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

export default UpdateStatus;
