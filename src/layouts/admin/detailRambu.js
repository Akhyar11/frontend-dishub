import React, { Fragment, useEffect, useState } from "react";
import { MdOutlineBookmark } from "react-icons/md";
import FieldDescripsi from "../../components/fieldDescripsi";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "./NavbarAdmin";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/dropdown";
import Gambar from "../../components/admin/gambar";

const DetailRambu = () => {
  const [rambu, setRambu] = useState([]);
  const [status, setStatus] = useState([]);
  const [ruasJalan, setRuasJalan] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const api = "http://localhost:5000/api/v1/todo/";

  const menuItems = [
    {
      item: "Edit Rambu",
      func: () => navigate("/dashboard/admin/update/gambar/" + params.id),
    },
    { item: "Edit Status", func: () => console.log("Edit Jalan") },
  ];

  const getData = async () => {
    try {
      const response = await axios.get(api + "get/rambu/id/" + params.id);
      const { status, rambu, ruasJalan } = response.data.data;

      setRuasJalan(ruasJalan);
      setRambu(rambu);
      setStatus(status);
    } catch (err) {}
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <NavbarAdmin
        back={() =>
          navigate("/dashboard/admin/detail/" + ruasJalan[0].id_jalan)
        }
      />
      <div className="lg:mx-72 pt-28">
        <div className="bg-white rounded-md border border-gray-300 mb-10">
          <div className="p-4 flex border-b items-center">
            <MdOutlineBookmark className="mr-2" />
            <h1>Deskripsi Jalan</h1>
            <div className="font-semibold ml-auto flex items-center mr-4 text-white">
              <Dropdown menuItems={menuItems} />
            </div>
          </div>
          <div className="p-10">
            {rambu.map((i) => {
              const j = ruasJalan.map((j) => {
                return j;
              });
              return (
                <Fragment key={i.id_jalan}>
                  <FieldDescripsi field="001" nama="No" dark={true} />
                  <FieldDescripsi field={j[0].kecamatan} nama="Kecamatan" />
                  <FieldDescripsi
                    field={j[0].titik_pangkal}
                    nama="Titik Pangkal"
                    dark={true}
                  />
                  <FieldDescripsi field={j[0].titik_ujung} nama="Titik Ujung" />
                  <FieldDescripsi
                    field={i.jenis_rambu}
                    nama="Jenis Rambu"
                    dark={true}
                  />
                  <FieldDescripsi field={i.koordinat} nama="Koordianat" />
                  <FieldDescripsi field={i.posisi} nama="Posisi" dark={true} />
                  <FieldDescripsi
                    field={i.status}
                    nama="Status"
                    cl={`border-b ${
                      i.status === "direncanakan"
                        ? "text-yellow-400"
                        : i.status === "terpasang"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  />
                </Fragment>
              );
            })}
          </div>
        </div>
        {rambu.map((i) => {
          return <Gambar gambar={status} status={i.status} />;
        })}
      </div>
    </>
  );
};

export default DetailRambu;
