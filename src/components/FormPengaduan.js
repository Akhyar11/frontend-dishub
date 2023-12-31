import React from "react";

const FormPengaduan = ({
  label,
  placeholder,
  idFor,
  change,
  disabel = false,
  value,
}) => {
  return (
    <div className="lg:flex mb-4">
      <label
        htmlFor={idFor}
        className="font-semibold text-sm w-36 flex items-center mr-10 mb-2"
      >
        {label}
        <span className="text-pink-600 ml-1">*</span>
      </label>
      <input
        type="text"
        id={idFor}
        placeholder={placeholder}
        value={value}
        required
        onChange={(e) => change(e)}
        disabled={disabel}
        className="border rounded-md w-full p-1 px-5"
      />
    </div>
  );
};

export default FormPengaduan;
