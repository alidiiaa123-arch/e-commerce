import { CategoryInterface } from "@/interfaces/CategoryInterface";
import src from "../../public/Vector2.png";
import Image from "next/image";
import CategoryCard from "@/Componenets/ui/CategoryCard";
import CtegoryCardComponent from "./CtegoryCardComponent";

export default function CtegoriesComponent({
  data,
}: {
  data: CategoryInterface[];
}) {
  return (
    <div className="bg-[#F9FAFB80]">
      <header className="  bg-sprinGreen w-full py-8">
        <main className="px-3 md:px-10 lg:px-20 py-4 ">
          <p className="text-white">Home / Categories</p>
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
                All Categories
              </h2>
              <p className=" font-medium m-0 text-white/80">
                {" "}
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </main>
      </header>
      <div className="px-3 grid grid-cols-1 md:grid-cols-4  gap-5 md:px-10 lg:px-20 py-4">
        {data?.map((category) => {
          return <CtegoryCardComponent data={category} key={category._id} />;
        })}
      </div>
    </div>
  );
}
