"use client";
import src from "../../../public/Vector.png";
import Image from "next/image";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FaArrowLeft, FaHome, FaLock, FaWallet } from "react-icons/fa";
import { FormProvider, useForm } from "react-hook-form";
import PaymentTypeComponent from "./PaymentTypeComponent";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CartData } from "@/interfaces/CartData";
import { Spinner } from "@/Componenets/ui/Spinner";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentIntergface, PaymentSchema } from "./PaymentValidation";
import { useRouter } from "next/navigation";
import Payment from "@/apis/Payment/CashPayment";
import Onlinepayment from "@/apis/Payment/Onlinepayment";
import { useState } from "react";
export default function CheckoutComponent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const methods = useForm<PaymentIntergface>({
    defaultValues: {
      paymentmethod: "cash",
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    resolver: zodResolver(PaymentSchema),
  });

  const { data, isPending, isError } = useQuery({
    queryKey: ["Cart"],

    queryFn: async () => {
      try {
        const request = await fetch(`/api/Cart`, {
          credentials: "include",
        });
        if (!request.ok) throw new Error(request.statusText);
        const payload = await request.json();

        return payload;
      } catch (error) {
        throw new Error("server error");
      }
    },
    staleTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const UserCart: CartData = data?.data;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const Updatequery = useQueryClient();
  const { mutate, isPending: isloading } = useMutation({
    mutationFn: Payment,
    onSuccess: () => {
      toast.success("Transaction done sucssesfully");
      Updatequery.invalidateQueries({
        queryKey: ["Cart"],
      });
      setTimeout(() => {
        router.push("/");
      }, 1000);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  async function handeFormdata(data: PaymentIntergface) {
    if (data.paymentmethod === "cash") {
      mutate({
        data: data,
        id: UserCart?._id,
      });
    }
    if (data.paymentmethod === "online") {
      setLoading(true);
      try {
        const response = await Onlinepayment({ data: data, id: UserCart?._id });
        console.log(response);
        setLoading(false);
        window.location.href = response?.session?.url;
      } catch (error) {
        toast.error("faild transaction");
        setLoading(false);
      }
    }
  }

  if (isPending)
    return (
      <Spinner className="min-h-screen flex justify-center items-center m-auto" />
    );
  return (
    <FormProvider {...methods}>
      <div className="bg-[#F9FAFB]  w-full min-h-screen px-3 md:px-10 lg:px-20 py-4  ">
        <form
          onSubmit={handleSubmit(handeFormdata)}
          className="  w-full flex flex-col gap-8 "
        >
          <div className="TOP">
            <div className="">
              <div className=" flex flex-col gap-2 justify-start items-start w-full">
                <div className="flex justify-start items-center gap-3">
                  <div className=" size-12 rounded-[12px] bg-sprinGreen flex justify-center items-center">
                    <Image
                      className="w-[22.5px] h-7.5"
                      src={src}
                      alt="notebook"
                    />
                  </div>
                  <h2 className="font-bold text-[30px] text-textGray">
                    Complete Your Order
                  </h2>
                </div>
                <p className="text-azure font-medium ">
                  Review your items and complete your purchase
                </p>
              </div>
            </div>
          </div>
          <div className="main flex justify-start flex-col md:flex-row gap-4  items-start ">
            <div className="Left flex flex-col gap-6 w-full md:w-2/3 ">
              <div className=" ">
                <div className="px-6 py-4 bg-sprinGreen flex flex-col gap-1  rounded-t-[12px] ">
                  <div className="flex justify-start items-center gap-3">
                    <FaHome className="text-white" />
                    <p className="font-bold text-[18px] text-white">
                      Shipping Address
                    </p>
                  </div>
                  <p className="font-medium text-[14px] text-[#DCFCE7]">
                    Where should we deliver your order?
                  </p>
                </div>
                <div className="bg-white p-3 flex flex-col gap-5">
                  <Field>
                    <FieldLabel htmlFor="input-field-city">
                      City <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...register("shippingAddress.city")}
                      type="text"
                      id="input-field-city"
                      placeholder="e.g. Cairo, Alexandria, Giza"
                      className={`rounded-[12px] border-2 border-[#E5E7EB] p-5 ${errors.shippingAddress?.city && "border-red-400"}`}
                    />
                    {errors.shippingAddress?.city && (
                      <p className="text-red-400">
                        {errors.shippingAddress.city.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="input-field-streetAdSress">
                      Street Address <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...register("shippingAddress.details")}
                      type="text"
                      id="input-field-streetAdSress"
                      placeholder={` Street name, building number, floor, apartment...`}
                      className={`rounded-[12px]  border-2 border-[#E5E7EB] pt-3.5 pr-5 pl-5 pb-16 ${errors.shippingAddress?.details && "border-red-400"}`}
                    />
                    {errors.shippingAddress?.details && (
                      <p className="text-red-400">
                        {errors.shippingAddress.details.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="input-field-username">
                      Phone Number <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...register("shippingAddress.phone")}
                      type="text"
                      placeholder="01xxxxxxxxx"
                      className={`rounded-[12px] border-2 border-[#E5E7EB] p-5 ${errors.shippingAddress?.phone && "border-red-400"}`}
                    />
                    {errors.shippingAddress?.phone && (
                      <p className="text-red-400">
                        {errors.shippingAddress.phone.message}
                      </p>
                    )}
                  </Field>
                </div>
              </div>
              <div className=" w-full  ">
                <div className="px-6 py-4 bg-sprinGreen flex flex-col gap-1  rounded-t-[12px] ">
                  <div className="flex justify-start items-center gap-3">
                    <FaWallet className="text-white" />
                    <p className="font-bold text-[18px] text-white">
                      Payment Method
                    </p>
                  </div>
                  <p className="font-medium text-[14px] text-[#DCFCE7]">
                    Choose how you d like to pay
                  </p>
                </div>
                <div className="bg-white  p-2 md: ">
                  <PaymentTypeComponent />
                </div>
              </div>
            </div>
            <div className="right bg-white  border border-[#F3F4F6] w-full md:w-1/3 rounded-[16px]">
              <div className=" ">
                <div className="bg-sprinGreen rounded-t-[16px] px-6 py-4">
                  <p className=" font-bold text-[18px] text-white ">
                    Order Summary
                  </p>
                  <p className=" font-medium text-[14px] text-[#DCFCE7]"></p>
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
                      <p className="font-bold text-[24px] text-sprinGreen">
                        {UserCart?.totalCartPrice}
                      </p>
                      <span className="font-medium text-[14px] text-azure ">
                        EGP
                      </span>
                    </span>
                  </div>
                  <div className="w-full ">
                    <Button
                      disabled={isloading}
                      type="submit"
                      className="py-6 px-6 font-semibold text-white w-full cursor-pointer rounded-[12px] bg-sprinGreen"
                    >
                      {isloading || loading ? <Spinner /> : <FaLock />}
                      Place Order
                    </Button>
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
        </form>
      </div>
    </FormProvider>
  );
}
