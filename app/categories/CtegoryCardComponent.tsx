import { CategoryInterface } from "@/interfaces/CategoryInterface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function CtegoryCardComponent({
  data,
}: {
  data: CategoryInterface;
}) {
  return (
    <Link
      href={`/categories/${data?._id}`}
      className="bg-white  border border-[#F3F4F6] p-6.25 rounded-[16px] group "
    >
      <div className="  bg-[#F9FAFB] rounded-[12px] overflow-hidden  m-auto size-57.75">
        <Image
          alt="category image"
          src={data?.image}
          width={231.58999633789062}
          height={231.58999633789062}
          className=" object-cover  m-auto size-57.75 h-full w-full group-hover:scale-[1.1] duration-500 transition-all ease-in-out"
        />
      </div>
      <div className=" text-center pt-3">
        <h3 className="font-semibold group-hover:text-sprinGreen duration-300">
          {data?.name}
        </h3>
        <p className="flex justify-center text-[10px] text-sprinGreen items-center gap-3 opacity-0 group-hover:opacity-100 ease-in-out transition-opacity duration-300">
          View Subcategories <FaArrowRight />
        </p>
      </div>
    </Link>
  );
}
