import React, { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import { useNavigate } from "react-router-dom";
import { MdHistory, MdVisibility } from "react-icons/md";
import axios from "axios";

const Riwayat = () => {
  const navigate = useNavigate();
  const [rambu, setRambu] = useState([]);
  const [status, setStatus] = useState([]);
  const [ruasJalan, setRuasJalan] = useState([]);
  const api = "http://localhost:5000/api/v1/todo/";
  const [riwayat, setRiwayat] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(api + "riwayat");
      const { create } = response.data.data;
      const riwayat = [];
      const random = [];

      for (let i = 0; i < create.length; i++) {
        const du = new Date(create[i].i.updatedAt).getTime();
        random.push(du);
      }

      const ASC = random.sort((a, b) => a - b);
      const DESC = ASC.reverse();

      for (let i = 0; i < DESC.length; i++) {
        for (let j = 0; j < create.length; j++) {
          if (DESC[i] === new Date(create[j].i.updatedAt).getTime()) {
            const dc = new Date(create[j].i.createdAt).getTime();
            const du = new Date(create[j].i.updatedAt).getTime();
            if (dc < du) {
              riwayat.push({ d: create[j], s: "update" });
            } else {
              riwayat.push({ d: create[j], s: "create" });
            }
          }
        }
      }
      console.log({ DESC });
      setRiwayat(riwayat);
    } catch (err) {}
  };

  const nav = (id) => {
    navigate(id);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <NavbarAdmin back={() => navigate("/dashboard/admin")} />
      <div className="lg:mx-72 pt-28">
        <div className="bg-white rounded-md border border-gray-300 mb-10">
          <div className="p-4 flex border-b items-center font-semibold">
            <MdHistory className="mr-2" />
            <h1>Riwayat</h1>
          </div>
          <div className="p-10">
            {riwayat.map((i) => {
              const a = i.d.name;
              console.log(a);
              if (i.s === "update") {
                return (
                  <div
                    key={i.s}
                    className="font-semibold flex w-full justify-center items-center mb-2"
                  >
                    <div>
                      <h3>{`Mengapdate data dari ${
                        i.d.name === "jalan"
                          ? `jalan ${i.d.i.jalan}`
                          : i.d.name === "rambu"
                          ? `rambu ${i.d.i.jenis_rambu}`
                          : `status rambu ${i.d.i.status}`
                      }`}</h3>
                      <p className="text-sm font-normal text-slate-400">
                        {i.d.i.updatedAt}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        nav(
                          `${
                            i.d.name === "jalan"
                              ? `/dashboard/admin/detail/${i.d.i.id_jalan}`
                              : i.d.name === "rambu"
                              ? `/dashboard/admin/detail/rambu/${i.d.i.id_rambu}`
                              : `status rambu ${i.d.i.status}`
                          }`
                        )
                      }
                      className="bg-sky-400 hover:bg-sky-600 transition-all ml-auto flex items-center justify-center text-white font-semibold p-2 rounded-md"
                    >
                      <span>
                        <MdVisibility />
                      </span>
                    </button>
                  </div>
                );
              }
              if (i.s === "create") {
                return (
                  <div
                    key={i.s}
                    className="font-semibold flex w-full justify-center items-center mb-2"
                  >
                    <div>
                      <h3>{`Membuat data dari ${
                        i.d.name === "jalan"
                          ? `jalan ${i.d.i.jalan}`
                          : i.d.name === "rambu"
                          ? `rambu ${i.d.i.jenis_rambu}`
                          : `status rambu ${i.d.i.status}`
                      }`}</h3>
                      <p className="text-sm font-normal text-slate-400">
                        {i.d.i.createdAt}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        nav(
                          `${
                            i.d.name === "jalan"
                              ? `/dashboard/admin/detail/${i.d.i.id_jalan}`
                              : i.d.name === "rambu"
                              ? `/dashboard/admin/detail/rambu/${i.d.i.id_rambu}`
                              : `status rambu ${i.d.i.status}`
                          }`
                        )
                      }
                      className="bg-sky-400 hover:bg-sky-600 transition-all ml-auto flex items-center justify-center text-white font-semibold p-2 rounded-md"
                    >
                      <span>
                        <MdVisibility />
                      </span>
                    </button>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Riwayat;
