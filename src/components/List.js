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
  const [listItems, setListItems] = useState(1);
  const [listNumber, setListNumber] = useState(1);
  const api = "http://localhost:5000/api/v1/todo";
  let recordList = 10;
  let lastIndex = listItems * recordList;
  let fristIndex = lastIndex - recordList;
  let recordRuasJalan = stateRuasJalan.slice(fristIndex, lastIndex);
  let recordRambu = stateRambu.slice(fristIndex, lastIndex);
  let nPage = Math.ceil(stateRuasJalan.length / recordList);
  let number = [...Array(nPage + 1).keys()].slice(1);
  let lNumber = 5;
  let lastN = lNumber * listNumber;
  let fristN = lastN - lNumber;
  let recordN =
    number.slice(fristN, lastN).length !== 0
      ? number.slice(fristN, lastN)
      : number.slice(
          number.length - lNumber < 0 ? 0 : number.length - lNumber,
          number.length
        );
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const response = await axios.get(api);
      const { ruasJalan, rambu } = response.data.data;
      setRuasJalan(ruasJalan);
      setRambu(rambu);
      dispatch(updateRuasJalan({ total: ruasJalan.length }));
      dispatch(updateRambu({ total: rambu.length }));
    } catch (err) {}
  };

  const prevList = () => {
    if (listItems <= 5) return;
    setListItems(recordN[0] - 5);
    setListNumber(listNumber - 1);
    console.log({ listItems });
  };

  const nextList = () => {
    if (listItems >= number.length - 5) return;
    setListItems(recordN[0] + 5);
    setListNumber(listNumber + 1);
    console.log({ recordN: recordN[0], listItems });
  };

  const listOfNumberPage = (num) => {
    setListItems(num);
  };

  const handelSearch = async (e) => {
    if (e.target.value === "") {
      const response = await axios.get(api);
      const { ruasJalan } = response.data.data;
      setRuasJalan(ruasJalan);
    } else {
      const response = await axios.get(`${api}/jalan/${e.target.value}`);
      const { ruasJalan } = response.data.data;
      setRuasJalan(ruasJalan);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="p-10 bg-white rounded-md border border-gray-300 mb-10">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search"
          className="border transition-all ml-auto hover:border-black rounded-md pl-2 p-1 placeholder:italic placeholder:font-semibold font-semibold"
          onChange={handelSearch}
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="font-semibold border-b">
            <th className="pb-2">No Ruas</th>
            <th className="text-left pb-2">Nama Ruas jalan</th>
            <th className="pb-2">Total Rambu</th>
            <th className="pb-2">
              Aksi
              <div className="mb-2"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {recordRuasJalan.map((i, count) => {
            const tr = recordRambu.filter((j) => {
              if (j.jalan === `${i.titik_pangkal}-${i.titik_ujung}`) {
                return i;
              }
            });
            if (count % 2 === 0) {
              return (
                <FieldList
                  key={count}
                  idJalan={i.id_jalan}
                  nomer={count + 1}
                  ruasJalan={`${i.titik_pangkal}-${i.titik_ujung}`}
                  totalRambu={tr.length}
                />
              );
            } else {
              return (
                <FieldList
                  key={count}
                  nomer={count + 1}
                  idJalan={i.id_jalan}
                  ruasJalan={`${i.titik_pangkal}-${i.titik_ujung}`}
                  totalRambu={tr.length}
                  dark={true}
                />
              );
            }
          })}
        </tbody>
      </table>
      <div className="flex items-center mt-4">
        <p className="mr-auto">{stateRuasJalan.length} entries</p>
        <button
          href="#"
          className="px-2 py-1 mr-2 border rounded-md hover:border-black transition-all"
          onClick={prevList}
        >
          Prev
        </button>
        {recordN.map((i, count) => {
          return (
            <button
              href="#"
              className={`px-2 py-1 mr-2 border rounded-md transition-all ${
                listItems === i
                  ? "bg-sky-400 text-gray-50"
                  : "hover:bg-gray-100"
              }`}
              key={count}
              onClick={() => listOfNumberPage(i)}
            >
              {i}
            </button>
          );
        })}
        <button
          href="#"
          className="px-2 py-1 border rounded-md hover:border-black transition-all"
          onClick={nextList}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default List;
