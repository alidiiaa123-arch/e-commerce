import GetspecificCatygory from "@/apis/GetspecificCategory";
import { SpecificCategoryInterface } from "@/interfaces/SpecificCategoryInterface";
import React from "react";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import GetAllSubCategoriesOnCategory from "@/apis/GetAllSubCategoriesOnCategory";
import { supcategoryBasedonCategoryInterface } from "@/interfaces/supcategoryBasedonCategoryInterface";
import Supcategorycard from "./supcategorycard";
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data: SpecificCategoryInterface = await GetspecificCatygory(id);

  const subcategoryData: supcategoryBasedonCategoryInterface[] =
    await GetAllSubCategoriesOnCategory(id);
  return (
    <div className=" w-full py-3">
      <header className="w-full text-white bg-sprinGreen h-50 ">
        <div className="p-4 px-6 md-px-20 lg:px-52 ">
          <p className="m-0">Home / Categories /{data.name} </p>
          <div className="mainHeader flex items-center gap-2 pt-4">
            <Image
              src={data.image}
              alt={data.name}
              width={100}
              height={100}
              className=" backdrop-blur-2xl object-cover rounded-[8px]"
            />
            <div className="">
              {" "}
              <h2 className=" text-3xl">{data.name}</h2>
              <p className="text-muted">
                Choose a subcategory to browse products
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="px-6 md-px-20 lg:px-52 ">
        <div className=" pt-5 flex justify-start items-start flex-col gap-2">
          <Link
            href={"/"}
            className="flex   justify-start  items-center gap-3  hover:text-sprinGreen"
          >
            {" "}
            <FaArrowLeft /> Back to Categories
          </Link>
          <h2 className="mb-3">
            {subcategoryData.length} Subcategories in {data.name}
          </h2>
        </div>
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-2">
          {subcategoryData.map((supcategory) => {
            return <Supcategorycard key={supcategory._id} data={supcategory} />;
          })}
        </div>
      </main>
    </div>
  );
}
