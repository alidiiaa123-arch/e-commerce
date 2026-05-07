import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token)
    return NextResponse.json({
      status: "failed",
      message: "unuthorized please login first",
    });
  try {
    const request = await fetch(`${process.env.Apiroute_v2}/cart`, {
      headers: {
        token: `${token?.token}`,
      },
    });
    if (!request.ok)
      return NextResponse.json({
        statusMsg: request.status,
        massege: request.statusText,
      });
    const payload = await request.json();
    return NextResponse.json(payload);
  } catch (error) {
    throw new Error("server error");
  }
}
