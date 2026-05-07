import { NextAuthConfig } from "@/app/NextAuthConfig";
import NextAuth from "next-auth";

const ProtectedAuth = NextAuth(NextAuthConfig);
export { ProtectedAuth as GET, ProtectedAuth as POST };
