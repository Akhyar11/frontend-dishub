import React from "react";
import { MdAssistantDirection } from "react-icons/md";

const Card = ({ title, description, count, image, addClas }) => {
  const newClass = `${addClas} flex w-full mb-2 justify-center bg-white rounded-md shadow-md border border-gray-300`;
  return (
    <div className={newClass}>
      <div className="text-center pt-2">
        <div className="w-24 mx-auto">
          <img src={image} alt="ruas jalan" className="relative rounded-md" />
        </div>
        <h1 className="font-semibold">{title}</h1>
        <span>{description}</span>
        <br />
        <div className="flex max-w-fit mx-auto mb-2 items-center mt-2 p-1 px-4 rounded-full bg-gray-300 text-sky-800 font-semibold transition-all hover:bg-sky-500">
          <MdAssistantDirection className="mr-1" />
          <p>{count} Ruas</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
