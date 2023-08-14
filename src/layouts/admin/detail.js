import React, { useEffect, useState } from "react";
import { MdOutlineBookmark } from "react-icons/md";
import FieldDescripsi from "../../components/fieldDescripsi";
import FieldRambu from "../../components/fieldRambu";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "./NavbarAdmin";
import { useSelector } from "react-redux";

const Detail = () => {
  const [stateRuasJalan, setRuasJalan] = useState([]);
  const [stateRambu, setRambu] = useState([]);
  const statusLogin = useSelector((i) => i.statusLogin);
  const navigate = useNavigate();
  const params = useParams();
  const api = "http://localhost:5000/api/v1/todo/jalan/rambu/" + params.id;
  const getData = async () => {
    try {
      const response = await axios.get(api);
      const { ruasJalan, rambu } = response.data.data;
      setRuasJalan(ruasJalan);
      setRambu(rambu);
    } catch (err) {}
  };
  useEffect(() => {
    if (!statusLogin) navigate("/login");
    getData();
  }, []);
  return (
    <>
      <NavbarAdmin />
      <div className="p-8 pt-28 lg:mx-72">
        <div className="bg-white rounded-md border border-gray-300 mb-10">
          <div className="p-4 flex border-b items-center">
            <MdOutlineBookmark className="mr-2" />
            <h1>Deskripsi Jalan</h1>
            <div className="font-semibold ml-auto text-white">
              <button className="bg-sky-400 hover:bg-sky-600 px-3 py-2 rounded-md transition-all">
                Edit Ruas Jalan
              </button>
            </div>
          </div>
          <div className="p-10">
            {stateRuasJalan.map((i, count) => {
              return (
                <>
                  <FieldDescripsi field="001" nama="No Ruas" dark={true} />
                  <FieldDescripsi
                    field={i.titik_pangkal + "-" + i.titik_ujung}
                    nama="Jalan"
                  />
                  <FieldDescripsi
                    field={i.titik_pangkal}
                    nama="Titik Pangkal"
                    dark={true}
                  />
                  <FieldDescripsi field={i.titik_ujung} nama="Titik Ujung" />
                  <FieldDescripsi
                    field={i.kecamatan}
                    nama="Kecamatan"
                    dark={true}
                    cl="border-b"
                  />
                </>
              );
            })}
            <table className="w-full mt-10">
              <tr className="font-semibold border-b">
                <th className="pb-2">No Rambu</th>
                <th className="text-left pb-2">Jenis Rambu</th>
                <th className="text-left pb-2">Jalan</th>
                <th className="pb-2">Gambar</th>
                <th className="pb-2">Posisi</th>
                <th className="pb-2">
                  Aksi
                  <div className="mb-2"></div>
                </th>
              </tr>
              {stateRambu.map((i, count) => {
                if (count % 2 == 0) {
                  return (
                    <FieldRambu
                      key={count + 1}
                      nomer={count}
                      dark={true}
                      jalan={i.jalan}
                      jenisRambu={i.jenis_rambu}
                      gambar={""}
                      posisi={
                        i.kanan
                          ? "kanan"
                          : i.tengah
                          ? "tengah"
                          : i.kiri
                          ? "kiri"
                          : ""
                      }
                    />
                  );
                } else {
                  return (
                    <FieldRambu
                      key={count + 1}
                      nomer={count}
                      jalan={i.jalan}
                      jenisRambu={i.jenis_rambu}
                      gambar={""}
                      posisi={
                        i.kanan
                          ? "kanan"
                          : i.tengah
                          ? "tengah"
                          : i.kiri
                          ? "kiri"
                          : ""
                      }
                    />
                  );
                }
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
