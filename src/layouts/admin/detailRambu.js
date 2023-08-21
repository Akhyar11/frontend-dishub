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
  const [statusNow, setStatusNow] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const api = "http://localhost:5000/api/v1/todo/";

  const menuItems = [
    { item: "Edit Rambu", func: () => console.log("Edit Jalan") },
  ];

  const getData = async () => {
    try {
      const response = await axios.get(api + "get/rambu/id/" + params.id);
      const { status, rambu } = response.data.data;
      let statusNow = [];
      for (let i = 0; i < status.length; i++) {
        const time = new Date(status[i].createdAt).getTime();
        statusNow.push(time);
      }
      const max = Math.max.apply(null, statusNow);
      for (let i = 0; i < status.length; i++) {
        if (max === new Date(status[i].createdAt).getTime())
          statusNow = [status[i]];
      }
      setStatusNow(statusNow);
      setRambu(rambu);
      setStatus(status);
    } catch (err) {}
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
            {rambu.map((i) => {
              return (
                <Fragment key={i.id_jalan}>
                  <FieldDescripsi field="001" nama="No" dark={true} />
                  <FieldDescripsi field={i.jenis_rambu} nama="Jenis Rambu" />
                  <FieldDescripsi
                    field={i.koordinat}
                    nama="Koordianat"
                    dark={true}
                  />
                  <FieldDescripsi field={i.posisi} nama="Posisi" />
                  <FieldDescripsi
                    field={statusNow[0].status}
                    nama="Status"
                    dark={true}
                    cl={
                      "border-b" + statusNow[0].status === "direncanakan"
                        ? "text-yellow-400"
                        : statusNow[0].status === "terpasang"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  />
                </Fragment>
              );
            })}
          </div>
        </div>
        <Gambar gambar={status} />
      </div>
    </>
  );
};

export default DetailRambu;
