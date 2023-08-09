import React from "react";
import logoDishub from "../assets/Departemen_Perhubungan.png";
import logoBoyolali from "../assets/Kabupaten_Boyolali.png";
import { MdPhoneEnabled, MdMailOutline } from "react-icons/md";

function Footer() {
  return (
    <div className="w-full md:flex bg-gray-400 p-8 md:justify-center">
      <div className="text-gray-50 mr-10 w-full md:w-[420px] lg:mr-20 md:mt-0">
        <div className="flex items-center justify-center md:justify-start  h-20 mb-4">
          <div className="w-16 md:w-8 mr-2">
            <img src={logoBoyolali} alt="logo dishub" />
          </div>
          <div className="w-20 md:w-10 mr-2">
            <img src={logoDishub} alt="logo dishub" />
          </div>
          <div className="w-[1px] h-20 bg-gray-50 mr-2"></div>
          <div className="font-semibold mr-4 text-sm">
            <span className="text-5xl">SIPELAN</span>
            <br />
            <span className="text-2xl">Kabupaten Boyolali</span>
          </div>
        </div>
        <div className="md:w-72 text-sm text-center md:text-left mb-8">
          <p>
            Sistem Informasi Database Perlengkapan Jalan Dinas Perhubungan
            Kabupaten Boyolali
          </p>
        </div>
      </div>
      <div className="text-gray-50 mr-10 lg:mr-20 text-center md:text-left mb-8 w-full md:w-44">
        <h1 className="text-2xl mb-3">Alamat</h1>
        <div className="bg-gray-50 w-full h-[1px]"></div>
        <div className="md:w-44">
          <p>
            Jl. Raya Boyolali-Semarang, Ngadirejo, Mojosongo, Kec. Mojosongo,
            Kabupaten Boyolali, Jawa Tengah 57322
          </p>
        </div>
      </div>
      <div className="text-gray-50 text-center md:text-left w-full md:w-44">
        <h1 className="text-2xl mb-3">Hubungi Kami</h1>
        <div className="bg-gray-50 w-full h-[1px]"></div>
        <div className="md:w-44">
          <p className="flex items-center">
            <MdMailOutline className="mr-2" />
            dishub@boyolali.go.id
          </p>
          <p className="flex items-center">
            <MdPhoneEnabled className="mr-2" />
            (0276) 321086
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
