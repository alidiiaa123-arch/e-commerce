import GetspesificBrand from "@/apis/Brands/GetSpecificBrand";
import Image from "next/image";
import React from "react";
import GetbrandProduct from "./GetbrandProduct";
import { ProductInterface } from "@/interfaces/ProductInterface";
import ProductCard from "@/Componenets/ui/ProductCard";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await GetspesificBrand(id);
  const FilteredData: ProductInterface[] = await GetbrandProduct({
    brandName: data?.name,
  });
  return (
    <div>
      <header className=" bg-sprinGreen w-full py-8">
        <main className="px-3 md:px-10 lg:px-20 py-4 ">
          <p className="text-white">Home / Brand/ {data?.name}</p>
          <div className=" flex justify-start items-center gap-4">
            <div className="bg-white/20 size-14  flex justify-center items-center object-cover rounded-[16px]">
              <Image
                src={data?.image}
                alt="img"
                width={34.38}
                height={30.577150344848633}
                className="  object-cover "
              />
            </div>
            <div className=" flex flex-col ">
              <h2 className="font-bold m-0 text-[36px] text-white">
                All Products
              </h2>
              <p className=" font-medium m-0  text-white/80">
                {" "}
                Explore our complete product collection
              </p>
            </div>
          </div>
        </main>
      </header>
      <div className="grid grid-cols-1  px-3 md:px-10 lg:px-20 py-4 md:grid-cols-4 w-full gap-5">
        {FilteredData?.length === 0 ? (
          <h1 className="text-center">No product for this brand name</h1>
        ) : (
          FilteredData?.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })
        )}
      </div>
    </div>
  );
}
