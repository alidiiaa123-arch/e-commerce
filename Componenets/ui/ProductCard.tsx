import { ProductInterface } from "@/interfaces/ProductInterface";
import Image from "next/image";
import { FaEye, FaHeart } from "react-icons/fa";
import Link from "next/link";
import AddtoCartButton from "./AddtoCartButton";
export default function ProductCard({
  product,
}: {
  product: ProductInterface;
}) {
  return (
    <div className=" rounded-[8px] border border-border   hover:scale-[1.02] hover:shadow cursor-pointer duration-300 transition-all">
      <div className=" relative">
        <Image
          src={product.imageCover}
          alt={product.title}
          width={273.19000244140625}
          height={240}
          className=" object-cover m-auto"
        />
        <div className="icons absolute flex flex-col gap-4 top-3 right-3">
          <span className=" flex justify-center items-center  bg-white  shadow size-8 rounded-full  text-azure hover:text-sprinGreen duration-75 transition-all">
            {" "}
            <FaHeart className=" " />{" "}
          </span>
          <Link
            href={`/ProductDetails/${product._id}`}
            className=" flex justify-center text-azure hover:text-sprinGreen duration-75 transition-all items-center  bg-white  shadow size-8 rounded-full"
          >
            <FaEye className=" " />
          </Link>
        </div>
      </div>
      <div className="bottom p-4">
        <p className=" text-[12px]  text-muteText">{product.category.name}</p>
        <p className="mt-2 text-[16px] font-medium line-clamp-1 ">
          {product.title}
        </p>
        <div className="price flex justify-between items-center">
          <h2 className=" font-bold text-[18px] ">{product.price} EGP</h2>
          <AddtoCartButton
            id={product._id}
            className="bg-sprinGreen size-10 text-2xl rounded-full text-white cursor-pointer"
          >
            +
          </AddtoCartButton>
        </div>
      </div>
    </div>
  );
}
