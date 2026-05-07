import { BrandsInterface } from "@/interfaces/GetAllBrandsInterface";
export default async function GetAllBrands(): Promise<BrandsInterface[]> {
  try {
    const data = await fetch(`${process.env.Apiroute_v1}/brands`, {
      cache: "force-cache",
    });
    if (!data.ok) {
      throw new Error(data?.statusText);
    }
    const product = await data?.json();

    return product?.data;
  } catch {
    throw new Error("sever not found");
  }
}
