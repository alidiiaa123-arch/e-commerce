import { BrandsInterface } from "@/interfaces/GetAllBrandsInterface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function BrandCard({ data }: { data: BrandsInterface }) {
  return (
    <Link href={`brands/${data._id}`}>
      <div className="BranCard bg-white border p-5.25 border-[#F3F4F6] rounded-[16px] group ">
        <div className="top bg-[#F9FAFB] p-4 rounded-[12px]">
          <div className="image">
            <Image
              src={data?.image}
              width={160}
              height={160}
              alt="brandImage"
              className="object-cover m-auto group-hover:scale-[1.1] duration-75 "
            />
          </div>
        </div>
        <div className="">
          <h3 className="font-semibold text-center mt-3 group-hover:text-[#7F22FE]:">
            {data?.name}
          </h3>
          <p className=" capitalize group-hover:text-[#7F22FE] text-center flex justify-center items-center gap-3 opacity-0 group-hover:opacity-100 duration-75">
            view products <FaArrowRight />
          </p>
        </div>
      </div>
    </Link>
  );
}
