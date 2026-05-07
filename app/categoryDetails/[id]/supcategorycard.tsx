import { supcategoryBasedonCategoryInterface } from "@/interfaces/supcategoryBasedonCategoryInterface";
import React from "react";
import { FaFolder } from "react-icons/fa";

export default function Supcategorycard({
  data,
}: {
  data: supcategoryBasedonCategoryInterface;
}) {
  return (
    <div className="border   group  hover:scale-[1.01] rounded-2xl px-3 py-5 cursor-pointer  hover:shadow transition duration-75 shadow">
      <div className="content  flex flex-col gap-1.5 justify-start items-start">
        <div className="top bg-green-300  p-4 rounded-2xl">
          <FaFolder className="text-sprinGreen" />
        </div>
        <div className="bottom">
          <h3 className=" group-hover:text-sprinGreen transition-all duration-300">
            {data.name}
          </h3>
        </div>
      </div>
    </div>
  );
}
