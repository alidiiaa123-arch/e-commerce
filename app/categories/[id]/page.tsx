import GetAllProduct from "@/apis/GetAllProduct";
import ProductCard from "@/Componenets/ui/ProductCard";
import Image from "next/image";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const AllProduct = (await GetAllProduct()) || [];
  const filteredProduct = AllProduct?.filter(
    (product) => product.category?._id === id,
  );
  if (filteredProduct?.length === 0) {
    return (
      <h1 className=" min-h-screen flex justify-center items-center  ">
        No product for this category
      </h1>
    );
  }
  return (
    <div className="bg-[#F9FAFB80] min-h-screen">
      <header className="  bg-sprinGreen w-full py-8">
        <main className="px-3 md:px-10 lg:px-20 py-4 ">
          <p className="text-white">
            Home / Categories / {filteredProduct[0]?.category?.name}
          </p>
          <div className=" flex justify-start items-center gap-4">
            <div className="bg-white/20 size-14  flex justify-center items-center object-cover rounded-[16px]">
              <Image
                src={filteredProduct[0]?.category?.image}
                alt="img"
                width={34.38}
                height={30.577150344848633}
                className="  object-cover "
              />
            </div>
            <div className=" flex flex-col ">
              <h2 className="font-bold m-0 text-[36px] text-white">
                {filteredProduct[0]?.category?.name}
              </h2>
              <p className=" font-medium m-0 text-white/80">
                {" "}
                Browse products in {filteredProduct[0]?.category?.name}
              </p>
            </div>
          </div>
        </main>
      </header>
      <div className="px-3 min-h-full grid grid-cols-1 md:grid-cols-4  gap-5 md:px-10 lg:px-20 py-4">
        {filteredProduct.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
}
