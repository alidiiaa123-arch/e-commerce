import { ProductInterface } from "@/interfaces/ProductInterface";

export default async function GetAllProduct(): Promise<ProductInterface[]> {
  try {
    const data = await fetch(`${process.env.Apiroute_v1}/products`, {
      cache: "force-cache",
    });
    if (!data.ok) {
      throw new Error(`something went wrong`);
    }
    const product = await data?.json();

    return product?.data;
  } catch {
    throw new Error("sever not found");
  }
}
