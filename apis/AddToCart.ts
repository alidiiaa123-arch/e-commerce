"use server";
import { AddToCartIbterface } from "@/interfaces/AddtoCartINterface";
import GetToken from "@/src/utilis/GetToken";
export default async function AddToCart({
  id,
}: {
  id: string;
}): Promise<AddToCartIbterface> {
  const token = await GetToken();
  if (!token) {
    throw new Error("please login first");
  }

  try {
    const request = await fetch(`${process.env.Apiroute_v2}/cart`, {
      method: "POST",
      body: JSON.stringify({
        productId: id,
      }),
      headers: {
        token: `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!request.ok) {
      throw new Error(" please check your network connection");
    } else {
      const payload = await request.json();
      return payload;
    }
  } catch (error) {
    throw new Error("server error");
  }
}
