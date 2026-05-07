"use server";
import GetToken from "@/src/utilis/GetToken";
export async function DeleteCartItem(id: string) {
  const token = await GetToken();
  if (!token) throw new Error("please login first");
  try {
    const request = await fetch(`${process.env.Apiroute_v2}/cart/${id}`, {
      method: "DELETE",
      headers: {
        token: `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!request.ok) throw new Error(request.statusText);
    const payload = await request.json();
    return payload;
  } catch (error) {
    throw new Error("server error");
  }
}
