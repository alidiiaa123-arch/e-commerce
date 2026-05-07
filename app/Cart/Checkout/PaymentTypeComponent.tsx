"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FaCheck, FaCreditCard, FaMoneyBill } from "react-icons/fa";

export default function PaymentTypeComponent() {
  const { watch, setValue } = useFormContext();
  const paymentMethod = watch("paymentmethod");

  return (
    <div className=" cursor-pointer flex flex-col gap-3 justify-start items-start w-full">
      <div
        onClick={() => setValue("paymentmethod", "cash")}
        className={`section1 p-2 w-full md:p-5  rounded-[12px] border-2 ${paymentMethod === "cash" ? "border-sprinGreen bg-[#F0FDF4]" : ""} flex justify-between items-center gap-3`}
      >
        <div
          className={`${paymentMethod === "cash" ? "bg-sprinGreen" : "bg-[#F3F4F6]"} rounded-[12px] size-14 flex justify-center items-center`}
        >
          <FaMoneyBill className="text-white" />
        </div>
        <div className=" flex gap-6 justify-between items-center w-full">
          <div className="left flex  justify-start items-start  flex-col ">
            <p
              className={`font-bold ${paymentMethod === "cash" ? "text-sprinGreen" : ""}`}
            >
              Cash on Delivery
            </p>
            <p className="text-azure  font-medium text-[12px]  text">
              Pay when your order arrives at your doorstep
            </p>
          </div>
          <div
            className={` size-6 ${paymentMethod === "cash" ? "bg-sprinGreen" : "border-2 border-[#E5E7EB]"} rounded-full flex justify-center items-center`}
          >
            {paymentMethod === "cash" ? <FaCheck className="text-white" /> : ""}
          </div>
        </div>
      </div>

      <div
        onClick={() => setValue("paymentmethod", "online")}
        className={`section2 p-2 w-full md:p-5  rounded-[12px] border-2 ${paymentMethod === "online" ? "border-sprinGreen bg-[#F0FDF4]" : ""} flex justify-between items-center gap-3`}
      >
        <div
          className={`${paymentMethod === "online" ? "bg-sprinGreen" : "bg-[#F3F4F6]"} rounded-[12px] size-14 flex justify-center items-center`}
        >
          <FaCreditCard className="text-white" />
        </div>
        <div className=" flex gap-6 justify-between items-center w-full">
          <div className="left flex  justify-start items-start  flex-col ">
            <p
              className={`font-bold ${paymentMethod === "online" ? "text-sprinGreen" : ""}`}
            >
              Pay Online
            </p>
            <p className="text-azure  font-medium text-[12px]  text">
              Secure payment with Credit/Debit Card via Stripe
            </p>
          </div>
          <div
            className={` size-6 ${paymentMethod === "online" ? "bg-sprinGreen" : "border-2 border-[#E5E7EB]"} rounded-full flex justify-center items-center`}
          >
            {paymentMethod === "online" ? (
              <FaCheck className="text-white" />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
