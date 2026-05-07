import Image from "next/image";
import src from "../../public/Vector (1).png";
import { ProductInterface } from "@/interfaces/ProductInterface";
import ProductCard from "@/Componenets/ui/ProductCard";
export default function ShopComponent({ data }: { data: ProductInterface[] }) {
  return (
    <div className="">
      <header className=" bg-sprinGreen w-full py-8">
        <main className="px-3 md:px-10 lg:px-20 py-4 ">
          <p className="text-white">Home / AllProduct</p>
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
                All Products
              </h2>
              <p className=" font-medium m-0 text-white/80">
                {" "}
                Explore our complete product collection
              </p>
            </div>
          </div>
        </main>
      </header>
      <section className=" flex flex-col px-3 md:px-10 lg:px-20 py-4 justify-start items-start gap-6">
        <p className="text-[14px] font-medium text-azure">
          Showing {data?.length} products
        </p>
        <div className="grid animate-fade-in grid-cols-1 md:grid-cols-4 gap-3">
          {data?.map((product) => {
            return <ProductCard product={product} key={product._id} />;
          })}
        </div>
      </section>
    </div>
  );
}
