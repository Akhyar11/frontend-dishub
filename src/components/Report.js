import React from "react";

const Report = () => {
  return (
    <div className="w-full border-x border-b border-gray-300 flex justify-center bg-gray-600 rounded-b-md p-8">
      <div className="w-[600px]">
        <span className="mb-4 text-gray-50 inline-block font-semibold text-xl">
          Saran dan Kritik
        </span>
        <input
          type="text"
          placeholder="Name"
          className="border mb-4 w-full h-12 text-xl transition-all hover:border-black rounded-md pl-4 p-1 placeholder:italic placeholder:font-semibold font-semibold"
        />
        <input
          type="text"
          placeholder="Email"
          className="border mb-4 w-full h-12 text-xl transition-all hover:border-black rounded-md pl-4 p-1 placeholder:italic placeholder:font-semibold font-semibold"
        />
        <textarea
          type="text"
          placeholder="Message"
          className="border mb-4 w-full h-36 text-xl transition-all hover:border-black rounded-md pl-4 p-1 placeholder:italic placeholder:font-semibold font-semibold"
        />
        <button className="bg-sky-600 font-semibold py-2 px-3 rounded-md hover:bg-sky-800 transition-all text-white">
          Send
        </button>
      </div>
    </div>
  );
};

export default Report;
