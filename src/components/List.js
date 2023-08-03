import React from "react";
import FieldList from "./fieldList";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateRuasJalan } from "../utils/ruasJalanSlice";
import { updateRambu } from "../utils/rambuSlice";

const List = () => {
  const [stateRuasJalan, setRuasJalan] = useState([]);
  const [stateRambu, setRambu] = useState([]);
  const dispatch = useDispatch();

  let count = 1;
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/todo");
      const { ruasJalan, rambu } = response.data.data;
      setRuasJalan(ruasJalan);
      setRambu(rambu);
      dispatch(updateRuasJalan({ total: ruasJalan.length }));
      dispatch(updateRambu({ total: rambu.length }));
    } catch (err) {}
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="p-10 bg-white rounded-md border border-gray-300">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search"
          className="border transition-all ml-auto hover:border-black rounded-md pl-2 p-1 placeholder:italic placeholder:font-semibold font-semibold"
        />
      </div>
      <table className="w-full">
        <tr className="font-semibold">
          <th className="">No Ruas</th>
          <th className="text-left">Nama Ruas jalan</th>
          <th className="">Total Rambu</th>
          <th className="">
            Aksi
            <div className="mb-2"></div>
          </th>
        </tr>
        {stateRuasJalan.map((i) => {
          const tr = stateRambu.filter((j) => {
            if (j.jalan == `${i.titik_pangkal}-${i.titik_ujung}`) {
              return i;
            }
          });
          if (count % 2 == 0) {
            return (
              <FieldList
                key={count}
                nomer={count++}
                ruasJalan={`${i.titik_pangkal}-${i.titik_ujung}`}
                totalRambu={tr.length}
              />
            );
          } else {
            return (
              <FieldList
                key={count}
                nomer={count++}
                ruasJalan={`${i.titik_pangkal}-${i.titik_ujung}`}
                totalRambu={tr.length}
                dark={true}
              />
            );
          }
        })}
      </table>
    </div>
  );
};

export default List;
