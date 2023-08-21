import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import { useState } from "react";
import axios from "axios";

const AddGambar = () => {
  const [image, setImage] = useState(undefined);
  const url = image === undefined ? "not fount" : URL.createObjectURL(image);
  const navigate = useNavigate();
  const params = useParams();
  const addGambar = async () => {
    const formData = new FormData();
    try {
      formData.append("jalan", image);
      await axios.post(
        "http://localhost:5000/api/v1/todo/jalan/gambar/" + params.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/dashboard/admin/detail/" + params.id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <NavbarAdmin />
      <div className="p-8 pt-28 lg:mx-72">
        <div className="bg-white rounded-md border border-gray-300 mb-10">
          <div className="p-4 flex border-b items-center">
            <h1>Tambah Data Gambar</h1>
          </div>
          <div className="p-10">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full ${
                  image === undefined ? "h-64" : ""
                } border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
              >
                {image === undefined ? (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                ) : (
                  <img src={url} className="rounded-md" />
                )}
              </label>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>

            <div className="lg:flex mt-10">
              <button
                onClick={addGambar}
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

export default AddGambar;
