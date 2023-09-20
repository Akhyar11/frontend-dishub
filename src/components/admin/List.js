import React from "react";
import FieldList from "./fieldList";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateRuasJalan } from "../../utils/ruasJalanSlice";
import { updateRambu } from "../../utils/rambuSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const List = () => {
  const [stateRuasJalan, setRuasJalan] = useState([]);
  const [stateRambu, setRambu] = useState([]);
  const [listItems, setListItems] = useState(1);
  const [listNumber, setListNumber] = useState(1);
  const [popUp, setPopUp] = useState(false);
  const [delateRuasJalan, setDRusaJalan] = useState("");
  const [idJalan, setIdJalan] = useState("");
  const token = Cookies.get("token");
  const navigate = useNavigate();
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
    } catch (err) {
      console.log(err);
    }
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

  const handelDelate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/token",
        {
          token,
        }
      );
      const accsessToken = response.data.accsessToken;
      await axios.delete("http://localhost:5000/api/v1/todo/jalan/" + idJalan, {
        headers: {
          Authorization: `Bearer ${accsessToken}`,
        },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  const delateJalan = (idJalan, ruasJalan) => {
    setPopUp(true);
    setDRusaJalan(ruasJalan);
    setIdJalan(idJalan);
  };

  const hadelAdd = () => {
    navigate("/dashboard/admin/add/jalan");
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="p-10 bg-white rounded-md border border-gray-300 mb-10">
      <div className="mb-6 w-full flex">
        <input
          type="text"
          placeholder="Search"
          className="border transition-all hover:border-black rounded-md pl-2 p-1 placeholder:italic placeholder:font-semibold font-semibold"
          onChange={handelSearch}
        />
        <button
          className="bg-green-400 px-3 rounded-md ml-auto font-semibold text-white hover:bg-green-600 transition-all"
          onClick={hadelAdd}
        >
          Tambah
        </button>
      </div>
      {popUp ? (
        <div className="absolute flex justify-center items-center w-full border h-full top-0 right-0 bg-black bg-opacity-50">
          <div className="bg-white rounded-md">
            <div className="p-10 text-center">
              <span>
                Yakin ingin menghapus jalan{" "}
                <span className="font-bold">{delateRuasJalan}</span>
              </span>
              <br />
              <span>anda akan menghapus permanent jalan dan rambu</span>
            </div>
            <div className="w-full border-t border-black p-4 text-white font-semibold flex justify-end">
              <button
                onClick={() => setPopUp(false)}
                className="bg-sky-400 hover:bg-sky-600 px-3 py-2 mr-4 rounded-md transition-all"
              >
                BATAL
              </button>
              <button
                onClick={handelDelate}
                className="bg-red-400 hover:bg-red-600 px-3 py-2 rounded-md transition-all"
              >
                HAPUS
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <table className="w-full">
        <thead>
          <tr className="font-semibold border-b">
            <th className="pb-2">No Ruas</th>
            <th className="text-left pb-2">Nama Jalan</th>
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
              if (j.id_jalan === i.id_jalan) {
                return i;
              }
            });
            if (count % 2 === 0) {
              return (
                <FieldList
                  key={count}
                  idJalan={i.id_jalan}
                  nomer={count + 1}
                  ruasJalan={i.jalan}
                  totalRambu={tr.length}
                  deleteJalan={delateJalan}
                />
              );
            } else {
              return (
                <FieldList
                  key={count}
                  nomer={count + 1}
                  idJalan={i.id_jalan}
                  ruasJalan={i.jalan}
                  totalRambu={tr.length}
                  dark={true}
                  deleteJalan={delateJalan}
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
