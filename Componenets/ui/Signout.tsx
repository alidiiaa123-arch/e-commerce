"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

export default function Signout() {
  const route = useRouter();
  async function Logout() {
    await signOut({ redirect: false });
    route.push("/auth/login");
  }
  return (
    <Button
      onClick={Logout}
      className=" bg-transparent flex items-center gap-2 text-azure cursor-pointer hover:text-sprinGreen"
    >
      <FaArrowRight />
      <p>Sign Out</p>
    </Button>
  );
}
