import getallCategories from "@/apis/getallCategories";
import CategoryCard from "@/Componenets/ui/CategoryCard";
import ProductCard from "@/Componenets/ui/ProductCard";
import { CategoryInterface } from "@/interfaces/CategoryInterface";
import { ProductInterface } from "@/interfaces/ProductInterface";
import Link from "next/link";
import GetAllProduct from "@/apis/GetAllProduct";
import { FaArrowRight } from "react-icons/fa";

export default async function Home() {
  const Allcategory: CategoryInterface[] = await getallCategories();
  const AllProduct: ProductInterface[] = await GetAllProduct();

  if (!Allcategory || !AllProduct) {
    return <h1>loading</h1>;
  }

  return (
    <div className="px-9 m-auto w-full md:px-10 lg:px-20 py-4  animate-fade-in ">
      <section className="categorySection ">
        <header className=" flex justify-between mb-10 items-center">
          <div className="flex  items-center gap-4 ">
            <span className="spring_line spring "></span>
            <h2 className="m-0  font-bold text-3xl">
              Shop By <span className=" text-sprinGreen">Category</span>
            </h2>
          </div>
          <div className="">
            <Link
              className="text-sprinGreen flex  items-center gap-2 font-bold"
              href={"categories"}
            >
              View All Categories <FaArrowRight />
            </Link>
          </div>
        </header>

        <div className=" grid grid-cols-2 gap-1 md:grid-cols-6">
          {Allcategory?.map((category: CategoryInterface) => {
            return <CategoryCard key={category._id} categoryData={category} />;
          })}
        </div>
      </section>
      <section className="product card mt-20 w-full">
        <div className="top flex justify-start items-center gap-4">
          <span className=" spring_line spring"></span>
          <h2 className="font-bold text-3xl">
            Featured <span className="text-sprinGreen">Products</span>
          </h2>
        </div>
        <div className="main_section animate-fade-in mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          {AllProduct?.map((product: ProductInterface) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      </section>
    </div>
  );
}
