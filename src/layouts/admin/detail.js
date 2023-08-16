import React, { Fragment, useEffect, useState } from "react";
import { MdOutlineBookmark } from "react-icons/md";
import FieldDescripsi from "../../components/fieldDescripsi";
import FieldRambu from "../../components/fieldRambu";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "./NavbarAdmin";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const [stateRuasJalan, setRuasJalan] = useState([]);
  const [stateRambu, setRambu] = useState([]);
  const [jalan, setJalan] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const api = "http://localhost:5000/api/v1/todo/jalan/rambu/" + params.id;
  const getData = async () => {
    try {
      const response = await axios.get(api);
      const { ruasJalan, rambu } = response.data.data;
      setRuasJalan(ruasJalan);
      setJalan(ruasJalan[0].titik_pangkal + "-" + ruasJalan[0].titik_ujung);
      setRambu(rambu);
    } catch (err) {}
  };

  const hadelAdd = () => {
    navigate("/dashboard/admin/add/rambu/" + params.id);
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
            <MdOutlineBookmark className="mr-2" />
            <h1>Deskripsi Jalan</h1>
            <div className="font-semibold ml-auto text-white">
              <button className="bg-sky-400 hover:bg-sky-600 px-3 py-2 rounded-md transition-all">
                Edit Ruas Jalan
              </button>
            </div>
          </div>
          <div className="p-10">
            {stateRuasJalan.map((i) => {
              return (
                <Fragment key={i.id_jalan}>
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
                </Fragment>
              );
            })}
            <div className="mb-6 w-full flex mt-10 border-t border-black pt-4">
              <input
                type="text"
                placeholder="Search"
                className="border transition-all hover:border-black rounded-md pl-2 p-1 placeholder:italic placeholder:font-semibold font-semibold"
                // onChange={handelSearch}
              />
              <button
                className="bg-green-400 px-3 rounded-md ml-auto font-semibold text-white hover:bg-green-600 transition-all"
                onClick={hadelAdd}
              >
                Tambah
              </button>
            </div>
            <table className="w-full">
              <thead>
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
              </thead>
              <tbody>
                {stateRambu.map((i, count) => {
                  if (count % 2 == 0) {
                    return (
                      <FieldRambu
                        key={count + 1}
                        nomer={count}
                        dark={true}
                        jalan={jalan}
                        jenisRambu={i.jenis_rambu}
                        gambar={""}
                        posisi={i.posisi}
                      />
                    );
                  } else {
                    return (
                      <FieldRambu
                        key={count + 1}
                        nomer={count}
                        jalan={jalan}
                        jenisRambu={i.jenis_rambu}
                        gambar={""}
                        posisi={i.posisi}
                      />
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
