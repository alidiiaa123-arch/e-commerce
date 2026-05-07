"use client";
import React from "react";
import {
  FaGift,
  FaMailBulk,
  FaPhoneAlt,
  FaTruck,
  FaUser,
} from "react-icons/fa";
import Signout from "./Signout";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const session = useSession();

  const UserName = session?.data?.user?.name;

  const isLogin = session.status === "authenticated";
  return (
    <div className="px-1   hidden lg:flex md:px-4  xl:px-20 py-2 border-b border-[#F3F4F6] w-full m-auto justify-between gap-2  items-center">
      <div className="left flex items-center gap-4">
        <div className=" flex items-center gap-2 justify-center">
          <FaTruck className="text-sprinGreen text[14px]" />
          <p className="text-[14px] font-medium text-azure m-0  text[14px]">
            Free Shipping on Orders 500 EGP
          </p>
        </div>
        <div className=" flex items-center justify-center gap-2">
          <FaGift className="text-sprinGreen text[14px]" />
          <p className="text-[14px] font-medium text-azure m-0 text[14px]">
            New Arrivals Daily
          </p>
        </div>
      </div>
      <div className="right flex justify-center gap-4 items-center">
        <a
          target="_blank"
          href="tel:+18001234567"
          className=" flex items-center gap-2 hover:text-sprinGreen"
        >
          <FaPhoneAlt className="text-azure " />
          <p className="text-azure font-medium text-[14px] ">
            +1 (800) 123-4567
          </p>
        </a>
        <a
          target="_blank"
          href="mailto:support@freshcart.com"
          className=" flex items-center gap-2 hover:text-sprinGreen"
        >
          <FaMailBulk className="text-azure " />
          <p className="text-azure font-medium">support@freshcart.com</p>
        </a>
        <span className=" bg-[#E5E7EB]  w-px h-4"></span>
        {isLogin ? (
          <div className=" flex justify-center items-center gap-3">
            <Link
              href="/profile"
              className=" flex items-center gap-2 hover:text-sprinGreen"
            >
              <FaUser className="text-azure " />
              <p className="text-azure font-medium">
                {UserName?.split(" ")[0]}
              </p>
            </Link>
            <Signout />
          </div>
        ) : (
          <div className=" flex justify-center items-center gap-3">
            <Link href="/auth/login" className=" flex items-center gap-2 group">
              <FaUser className="text-azure  group-hover:text-sprinGreen" />
              <p className="text-azure font-medium group-hover:text-sprinGreen">
                Sign In
              </p>
            </Link>
            <Link
              href="/auth/register"
              className=" flex items-center gap-2  group"
            >
              <FaUser className="text-azure  group-hover:text-sprinGreen" />
              <p className="text-azure font-medium group-hover:text-sprinGreen">
                Register
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
