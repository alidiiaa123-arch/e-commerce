"use server";

import { PaymentIntergface } from "@/app/Cart/Checkout/PaymentValidation";
import GetToken from "@/src/utilis/GetToken";
export default async function Payment({
  id,
  data,
}: {
  id: string;
  data: PaymentIntergface;
}) {
  const token = await GetToken();
  if (!token) {
    throw new Error("please login first");
  }

  try {
    const request = await fetch(`${process.env.Apiroute_v1}/orders/${id}`, {
      method: "POST",
      body: JSON.stringify(data.shippingAddress),
      headers: {
        token: `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!request.ok) {
      throw new Error(request.statusText);
    } else {
      const payload = await request.json();
      return payload;
    }
  } catch (error) {
    throw new Error("server error");
  }
}
