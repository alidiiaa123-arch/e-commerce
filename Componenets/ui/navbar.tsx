"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/Component 1.svg";
import {
  FaBars,
  FaHeadphones,
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { CartData } from "@/interfaces/CartData";
import src from "../../public/Component 1.svg";
import Header from "./Header";
import Navmenu from "./Navmenu";
import { CiHeart } from "react-icons/ci";
import { useRouter } from "next/navigation";

export function NavigationMenuDemo() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [active, Setactive] = useState("");
  const { data, status } = useSession();
  const Name = data?.user?.name;
  const isLogin = status === "authenticated";
  const { data: Cartdata } = useQuery({
    queryKey: ["Cart"],
    queryFn: async () => {
      return fetch(`/api/Cart`, { credentials: "include" }).then((payload) =>
        payload.json(),
      );
    },
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
  const Products: CartData = Cartdata?.data;
  const NumberofCartItem = Products?.products?.length || 0;
  const [scroll, setscroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setscroll(window.scrollY >= 5);
    });
  }, []);
  const handleAuthAction = () => {
    if (isLogin) {
      signOut();
    } else {
      router.push("/auth/login");
    }
  };
  return (
    <div className="">
      <Header />
      <nav
        className={`bg-white h-16 px-3 md:px-10 lg:px-20 py-4 flex  fixed z-50 left-0 right-0  ${scroll ? "top-0" : ""}   justify-between w-full m-auto items-center`}
      >
        {" "}
        <div className="">
          <Image
            src={logo}
            alt="logo image "
            width={200}
            height={100}
            className=""
          />
        </div>
        <ul className="hidden  md:flex justify-center items-center  gap-6 ">
          <li>
            <Link
              className="hover:text-sprinGreen duration-75 rounded-xl p-3"
              href={"/"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-sprinGreen duration-75 rounded-xl p-3"
              href={"/shop"}
            >
              Shop
            </Link>
          </li>
          <Navmenu />
          <li>
            <Link
              className="hover:text-sprinGreen duration-75 rounded-xl p-3"
              href={"/brands"}
            >
              Brands
            </Link>
          </li>
        </ul>
        <div className="  justify-center   flex items-center gap-3">
          <div className="  flex justify-center  items-center gap-3 pr-3 ">
            <div className="rounded-full size-10  bg-green-100 hidden lg:flex justify-center items-center">
              <FaHeadphones className="text-sprinGreen  " />
            </div>
            <div className="   hidden lg:flex  flex-col gap-1.5 border-r border-[#E5E7EB] p-1">
              <p className=" text-gray-600">Support</p>
              <p className=" font-semibold">24/7 Help</p>
            </div>
            <Link href={"/Cart"} className=" group relative  ">
              <FaShoppingCart className="text-azure group-hover:text-sprinGreen  text-2xl " />
              {isLogin && NumberofCartItem > 0 && (
                <span className=" absolute -top-3.5 -right-2.5 font-bold text-[10px]   rounded-full text-white flex justify-center items-center  bg-sprinGreen size-5">
                  {NumberofCartItem}
                </span>
              )}
            </Link>
          </div>
          <button
            className="md:hidden bg-sprinGreen flex justify-center items-center size-10 rounded-full"
            onClick={() => setOpen(true)}
          >
            <FaBars className="text-white" />
          </button>
        </div>
        {/* الخلفية */}
        {/* Sidebar */}
        <div
          className={`fixed top-0   z-100 right-0 p-2 h-full w-70 bg-white shadow-lg transform transition-transform duration-300 md:hidden ${
            open ? "translate-x-0" : "  translate-x-full"
          }`}
        >
          <div className=" flex justify-between items-center">
            <Image alt="logo Image " src={src} />

            <button className="p-4" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>
          <ul className="p-4 space-y-4">
            <li
              className={`${active === "Home" && "bg-gray-200 rounded-[12px] "} px-2 py-2`}
              onClick={() => Setactive("Home")}
            >
              <Link href={"/"}>Home</Link>
            </li>
            <li
              className={`${active === "Shop" && "bg-gray-200 rounded-[12px] px-2 py-2"} px-2 py-2`}
              onClick={() => Setactive("Shop")}
            >
              <Link href={"/shop"}>Shop</Link>
            </li>
            <li
              className={`${active === "Categories" && "bg-gray-200 rounded-[12px] px-2 py-2"} px-2 py-2`}
              onClick={() => Setactive("Categories")}
            >
              <Link href={"/categories"}>Categories</Link>
            </li>
            <li
              className={`${active === "Brands" && "bg-gray-200 rounded-[12px] px-2 py-2"} px-2 py-2 m-0`}
              onClick={() => Setactive("Brands")}
            >
              <Link href={"/brands"}>Brands</Link>
            </li>
          </ul>

          <ul className="border-t pt-4 space-y-4 border-border w-full">
            <li>
              <Link
                href={"/"}
                className=" flex justify-start items-center gap-2"
              >
                <div className="size-9 bg-[#FEF2F2] flex justify-center items-center rounded-full">
                  <CiHeart className=" text-[#FB2C36] " />
                </div>
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                href={"/Cart"}
                className=" flex justify-start items-center gap-2"
              >
                <div className="size-9 bg-[#F0FDF4] flex justify-center items-center rounded-full">
                  <FaShoppingCart className=" text-sprinGreen " />
                </div>
                Cart
              </Link>
            </li>
            <Link
              href={"/"}
              className={
                isLogin
                  ? "border-t border-gray-200 w-full pt-4 flex justify-start items-center gap-2"
                  : "hidden"
              }
            >
              <div className="size-9 bg-[#F3F4F6] flex justify-center items-center rounded-full">
                <FaUser className="" />
              </div>
              {Name}
            </Link>
            <button
              onClick={() => handleAuthAction()}
              className={
                isLogin
                  ? "flex justify-start items-center gap-2 text-[#E7000B]"
                  : "hidden"
              }
            >
              <div className="size-9 bg-[#FEF2F2] font-medium flex justify-center items-center rounded-full">
                <FaSignOutAlt className="" />
              </div>
              Sign Out
            </button>
          </ul>
          <div className=" flex flex-col gap-2">
            {!isLogin && (
              <Link
                href={"/auth/login"}
                className="text-white w-full  hover:scale-[1.02] duration-75 flex justify-center items-center gap-1 bg-sprinGreen rounded-3xl p-3  cursor-pointer"
              >
                <FaUser /> Sign in
              </Link>
            )}
            {isLogin ? (
              ""
            ) : (
              <Link
                href={"/auth/register"}
                className="text-white w-full    hover:scale-[1.02] duration-75 flex justify-center items-center gap-1 bg-sprinGreen rounded-3xl p-3  cursor-pointer"
              >
                <FaUser /> Register
              </Link>
            )}
          </div>
          <div className="  justify-center    mt-30 flex items-center gap-3">
            <div className=" flex justify-center items-center gap-3 pr-3 border-r border-[#E5E7EB]">
              <div className="rounded-full size-10 bg-green-100 flex justify-center items-center">
                <FaHeadphones className="text-sprinGreen  " />
              </div>
              <div className=" flex flex-col gap-1.5">
                <p className=" text-gray-600">Support</p>
                <p className=" font-semibold">24/7 Help</p>
              </div>
            </div>
            <Link href={"/Cart"} className=" relative">
              <FaShoppingCart className="text-azure  text-2xl " />
              <span className=" absolute -top-3.5 -right-2.5 font-bold text-[10px]   rounded-full text-white flex justify-center items-center  bg-sprinGreen size-5">
                {NumberofCartItem}
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
