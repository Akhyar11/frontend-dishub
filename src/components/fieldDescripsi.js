import React from "react";

function FieldDescripsi({ field, nama, dark, cl = "" }) {
  return (
    <div className="flex border">
      <div
        className={
          dark
            ? `bg-gray-100 flex md:pr-12 pl-3 py-2 items-center border-x border-t font-semibold border-gray-200 ${cl}`
            : `flex md:pr-12 pl-3 py-2 items-center border-x border-t font-semibold border-gray-200 ${cl}`
        }
      >
        <p className="block w-32">{nama}</p>
      </div>
      <div
        className={
          dark
            ? `flex py-2 pl-3 border-t border-r border-gray-200 md:pr-20 items-center w-full bg-gray-100 ${cl}`
            : `flex py-2 pl-3 border-t border-r border-gray-200 md:pr-20 items-center w-full ${cl}`
        }
      >
        <p>{field}</p>
      </div>
    </div>
  );
}

export default FieldDescripsi;
