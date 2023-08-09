import React from "react";
import { MdMessage } from "react-icons/md";
import FormPengaduan from "./FormPengaduan";

const Report = () => {
  return (
    <div className="bg-white rounded-md border border-gray-300 mb-10">
      <div className="p-4 flex border-b items-center">
        <MdMessage className="mr-2" />
        <h1>Pengaduan</h1>
      </div>
      <div className="p-10">
        <FormPengaduan
          label="Nama Lengkap"
          placeholder="tulis nama lengkap"
          idFor={"name"}
        />
        <FormPengaduan
          idFor={"alamat"}
          label="Alamat Lengkap"
          placeholder="tulis alamat lengkap"
        />
        <FormPengaduan
          idFor={"no"}
          label="No Handphone"
          placeholder="tulis nomer handphone"
        />
        <div className="lg:flex mb-4">
          <label
            htmlFor="area"
            className="font-semibold text-sm w-36 mr-10 mb-2"
          >
            Isi Pengaduan
            <span className="text-pink-600 ml-1">*</span>
          </label>
          <textarea
            type="text"
            id="area"
            placeholder="tulis isi pengaduan"
            className="border rounded-md w-full p-1 px-5 h-28"
          />
        </div>
        <FormPengaduan
          idFor={"jalan"}
          label="Koordinat Titik Jalan"
          placeholder="tulis koordinat titik jalan"
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
        <div className="flex">
          <div className="w-36 mr-5"></div>
          <button className="bg-green-600 hover:bg-green-700 transition-all py-1 px-3 border border-gray-400 font-semibold text-gray-50">
            Lapor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
