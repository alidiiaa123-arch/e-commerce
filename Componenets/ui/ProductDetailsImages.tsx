"use client";
import { ProductDetailsInterFace } from "@/interfaces/ProductDetailsInterface";
import Image from "next/image";
import { useState } from "react";
import Carousil from "./Swipper";

export default function ProductDetailsImages({
  ProductDetails,
}: {
  ProductDetails: ProductDetailsInterFace;
}) {
  const [activeImage, setActiveImage] = useState(ProductDetails?.imageCover);
  return (
    <div className="left  rounded-[12px] py-3  border border-border w-full  md:w-1/3  md-px-10   lg:px-20 ">
      <div className=" flex m-auto flex-col gap-3">
        <Image
          src={activeImage}
          width={344}
          height={469.08}
          alt={ProductDetails?.title}
          className="m-auto"
        />
        <div className="images">
          <Carousil
            onSlideChange={setActiveImage}
            slidesPerView={3}
            imagesList={ProductDetails?.images}
          />
        </div>
      </div>
    </div>
  );
}
