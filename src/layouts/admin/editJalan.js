import React, { useEffect, useState } from "react";
import FormPengaduan from "../../components/FormPengaduan";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import getToken from "../../utils/getToken";

const UpdateJalan = () => {
  const [kecamatan, setKecamatan] = useState("");
  const [jalan, setJalan] = useState("");
  const [tp, setTp] = useState("");
  const [tu, setTu] = useState("");
  const [MSG, setMsg] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/todo/jalan/" + params.id
      );

      const { ruasJalan } = response.data.data;
      setKecamatan(ruasJalan[0].kecamatan);
      setJalan(ruasJalan[0].jalan);
      setTp(ruasJalan[0].titik_pangkal);
      setTu(ruasJalan[0].titik_ujung);
    } catch (err) {
      console.log({ err });
    }
  };

  const updateJalan = async () => {
    try {
      const response = await getToken();
      const accsessToken = response;
      await axios.post(
        "http://localhost:5000/api/v1/todo/jalan/update/" + params.id,
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

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <NavbarAdmin
        back={() => {
          navigate("/dashboard/admin/detail/" + params.id);
        }}
      />
      <div className="p-8 pt-28 lg:mx-72">
        <div className="bg-white rounded-md border border-gray-300 mb-10">
          <div className="p-4 flex border-b items-center">
            <h1>Update Data Jalan</h1>
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
              value={kecamatan}
            />
            <FormPengaduan
              label="Nama Jalan"
              placeholder="tulis nama jalan"
              change={(e) => setJalan(e.target.value)}
              idFor={"Jalan"}
              value={jalan}
            />
            <FormPengaduan
              idFor={"titik_ujung"}
              change={(e) => setTp(e.target.value)}
              label="Titik Ujung"
              placeholder="tulis titik ujung"
              value={tp}
            />
            <FormPengaduan
              idFor={"titik_pangkal"}
              change={(e) => setTu(e.target.value)}
              label="Titik Pangkal"
              placeholder="tulis titik pangkal"
              value={tu}
            />
            <div className="lg:flex">
              <button
                onClick={updateJalan}
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

export default UpdateJalan;
