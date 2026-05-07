"use client";
import { FaArrowLeft, FaLock, FaShoppingCart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { CartData } from "@/interfaces/CartData";
import { useEffect } from "react";
import { toast } from "react-toastify";
import UserCartComponent from "./UserCartComponent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/Componenets/ui/Spinner";
export default function CartComponent() {
  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["Cart"],
    queryFn: async () => {
      try {
        const request = await fetch(`/api/Cart`);
        if (!request.ok) throw new Error(request.statusText);
        const payload = await request.json();
        return payload;
      } catch (error) {
        throw new Error("server error");
      }
    },
  });
  const UserCart: CartData = data?.data;

  useEffect(() => {
    if (isSuccess && UserCart) {
      toast.success(UserCart?.message);
    }
  }, [isSuccess, UserCart]);
  if (isPending)
    return (
      <Spinner className="min-h-screen flex justify-center m-auto items-center" />
    );

  return (
    <div className="m-auto px-3 md:px-10 lg:px-20 py-4  min-h-screen">
      <header className="flex flex-col gap-3">
        <div className=" flex justify-start items-center gap-2">
          <div className=" text-white size-12 p-2 bg-sprinGreen rounded-[12px]">
            <FaShoppingCart className=" size-9" />
          </div>
          <h2 className="m-0 font-bold text-2xl text-textGray">
            Shopping Cart
          </h2>
        </div>
        <p className=" font-medium">
          You have{" "}
          <span className="text-sprinGreen">
            {UserCart?.products?.length} items
          </span>{" "}
          in your cart
        </p>
      </header>
      <div className="mainContent flex flex-col items-start w-full md:flex-row gap-3 pt-5">
        <div className="flex flex-col gap-4  w-full md:w-2/3 ">
          {UserCart?.products?.map((product) => {
            return (
              <UserCartComponent
                key={product?.product?._id}
                product={product?.product}
                price={product?.price}
                count={product?.count}
              />
            );
          })}
        </div>
        <div className="bg-white  border border-[#F3F4F6] w-full md:w-1/3 rounded-[16px] ">
          <div className="bg-sprinGreen rounded-t-[16px] px-6 py-4">
            <p className=" font-bold text-[18px] text-white ">Order Summary</p>
            <p className=" font-medium text-[14px] text-[#DCFCE7]">
              {UserCart?.products?.length} items in your cart
            </p>
          </div>
          <div className="p-6 flex flex-col gap-6 justify-center items-center w-full">
            <div className=" flex justify-between items-center w-full">
              <span className=" font-medium text-azure">Subtotal</span>
              <span className=" font-medium text-textGray">
                {UserCart?.totalCartPrice} EGP
              </span>
            </div>
            <div className=" flex justify-between items-center w-full">
              <span className=" font-medium text-azure">Shipping</span>
              <span className=" font-medium text-sprinGreen">FREE</span>
            </div>
            <div className="border-t border-[#E5E7EB] border-dashed flex justify-between items-center w-full ">
              <span className=" font-semibold text-textGray">Total</span>
              <span className="flex justify-center items-center gap-1">
                <p className="font-bold text-[24px]">
                  {UserCart?.totalCartPrice}
                </p>
                <span className="font-medium text-[14px] text-azure ">EGP</span>
              </span>
            </div>
            <div className="w-full ">
              <Link href={"Cart/Checkout"} className="">
                <Button className="py-6 px-6 font-semibold text-white w-full cursor-pointer rounded-[12px] bg-sprinGreen">
                  <FaLock />
                  Secure Checkout
                </Button>
              </Link>
            </div>
            <Link
              href={"/"}
              className="text-sprinGreen flex justify-center items-center gap-3"
            >
              <FaArrowLeft /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
