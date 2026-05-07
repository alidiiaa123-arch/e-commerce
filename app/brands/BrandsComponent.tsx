import Image from "next/image";
import src from "../../public/Vector2.png";
import { BrandsInterface } from "@/interfaces/GetAllBrandsInterface";
import BrandCard from "./BrandCard";
export default function BrandsComponent({ data }: { data: BrandsInterface[] }) {
  return (
    <div className="">
      <header className=" bg-[#7F22FE] w-full py-8">
        <main className="px-3 md:px-10 lg:px-20 py-4 ">
          <p className="text-white">Home / Brands</p>
          <div className=" flex justify-start items-center gap-4">
            <div className="bg-white/20 size-14  flex justify-center items-center object-cover rounded-[16px]">
              <Image
                src={src}
                alt="img"
                width={34.38}
                height={30.577150344848633}
                className="  object-cover "
              />
            </div>
            <div className=" flex flex-col ">
              <h2 className="font-bold m-0 text-[36px] text-white">
                Top Brands
              </h2>
              <p className=" font-medium m-0 text-white/80">
                {" "}
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </main>
      </header>
      <div className="bg-[#F9FAFB80] min-h-screen  pb-10 px-3 md:px-10 lg:px-20 py-4">
        <div className=" grid animate-fade-in sm:grid-cols-2 gap-5 md:grid-cols-4 w-full lg:grid-cols-5 items-center">
          {data?.map((Brand) => {
            return <BrandCard data={Brand} key={Brand?._id} />;
          })}
        </div>
      </div>
    </div>
  );
}
