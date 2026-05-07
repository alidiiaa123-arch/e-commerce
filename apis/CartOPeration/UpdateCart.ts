"use server";
import GetToken from "@/src/utilis/GetToken";
export async function UpdateCartQuntity({
  count,
  id,
}: {
  count: number;
  id: string;
}) {
  const token = await GetToken();
  if (!token) throw new Error("please login first");
  try {
    const request = await fetch(`${process.env.Apiroute_v2}/cart/${id}`, {
      method: "PUT",
      headers: {
        token: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count }),
    });
    if (!request.ok) throw new Error(request.statusText);
    const payload = await request.json();
    return payload;
  } catch (error) {
    throw new Error("server error");
  }
}
