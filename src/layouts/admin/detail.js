import React, { Fragment, useEffect, useState } from "react";
import { MdOutlineBookmark } from "react-icons/md";
import FieldDescripsi from "../../components/fieldDescripsi";
import FieldRambu from "../../components/admin/fieldRambu";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "./NavbarAdmin";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/dropdown";
import getToken from "../../utils/getToken";

const Detail = () => {
  const [stateRuasJalan, setRuasJalan] = useState([]);
  const [stateRambu, setRambu] = useState([]);
  const [jalan, setJalan] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const api = "http://localhost:5000/api/v1/todo/";
  const hadelAdd = () => {
    navigate("/dashboard/admin/add/rambu/" + params.id);
  };

  const handelSearch = async (e) => {
    if (e.target.value === "") {
      const response = await axios.get(api);
      const { rambu } = response.data.data;
      setRambu(rambu);
    } else {
      const response = await axios.get(`${api}rambu/${e.target.value}`);
      const { rambu } = response.data;
      setRambu(rambu);
    }
  };

  const menuItems = [
    {
      item: "Edit Jalan",
      func: () => navigate("/dashboard/admin/update/jalan/" + params.id),
    },
    { item: "Tambah Rambu", func: hadelAdd },
  ];

  const getData = async () => {
    try {
      const response = await axios.get(api + params.id);
      const { ruasJalan, rambu } = response.data.data;
      setRuasJalan(ruasJalan);
      setJalan(ruasJalan[0].titik_pangkal + "-" + ruasJalan[0].titik_ujung);
      setRambu(rambu);
    } catch (err) {}
  };

  const del = async (id) => {
    try {
      const response = await getToken();
      const accsessToken = response;
      await axios.delete(api + "rambu/" + id, {
        headers: { Authorization: "Bearer " + accsessToken },
      });
      window.location.reload();
    } catch (err) {
      console.log({ err });
    }
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
            <div className="font-semibold ml-auto flex items-center mr-4 text-white">
              <Dropdown menuItems={menuItems} />
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
                onChange={handelSearch}
              />
            </div>
            <table className="w-full">
              <thead>
                <tr className="font-semibold border-b">
                  <th className="pb-2">No Rambu</th>
                  <th className="text-left pb-2">Jenis Rambu</th>
                  <th className="text-left pb-2">Koordinat</th>
                  <th className="pb-2">Posisi</th>
                  <th className="pb-2">Status</th>
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
                        jenisRambu={i.jenis_rambu}
                        koordinat={i.koordinat}
                        posisi={i.posisi}
                        status={i.status}
                        nav={() => {
                          navigate(
                            "/dashboard/admin/detail/rambu/" + i.id_rambu
                          );
                        }}
                        del={() => del(i.id_rambu)}
                      />
                    );
                  } else {
                    return (
                      <FieldRambu
                        key={count + 1}
                        nomer={count}
                        jenisRambu={i.jenis_rambu}
                        koordinat={i.koordinat}
                        posisi={i.posisi}
                        status={i.status}
                        nav={() => {
                          navigate(
                            "/dashboard/admin/detail/rambu/" + i.id_rambu
                          );
                        }}
                        del={() => del(i.id_rambu)}
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
