"use client";
import { ProductDetailsInterFace } from "@/interfaces/ProductDetailsInterface";
import React, { useState } from "react";

export default function QuantityInProductDetails({
  productDetails,
}: {
  productDetails: ProductDetailsInterFace;
}) {
  const [value, setValue] = useState(0);

  return (
    <div className="w-full">
      <p className=" text-azure text-[14px]">Quantity</p>
      <div className="mt-6 flex  items-center w-full gap-3">
        <div className=" border-2  border-border w-full md:w-1/4 lg:w-1/3  py-2  rounded-2xl px-3   flex justify-between items-center">
          <button
            onClick={() => {
              if (value > 0) setValue(value - 1);
            }}
            className=" text-2xl"
          >
            -
          </button>
          <p className=" text-2xl">{value}</p>
          <button
            className=" text-2xl"
            onClick={() => {
              if (value < productDetails.quantity) setValue(value + 1);
            }}
          >
            +
          </button>
        </div>
        <p className="">{productDetails.quantity} available</p>
      </div>
      <div className=" flex justify-between items-center  mt-6">
        <p className=" text-azure font-medium">Total Price:</p>
        <p className=" text-sprinGreen text-2xl font-medium">
          {productDetails.price * value} EGP
        </p>
      </div>
    </div>
  );
}
