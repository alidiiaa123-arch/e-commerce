import { SpecificCategory } from "@/interfaces/SpesificBrands";

export default async function GetspesificBrand(
  id: string,
): Promise<SpecificCategory> {
  try {
    const data = await fetch(`${process.env.Apiroute_v1}/brands/${id}`);
    if (!data.ok) {
      throw new Error(`something went wrong`);
    }
    const ProductDetails = await data?.json();

    return ProductDetails?.data;
  } catch {
    throw new Error("server error");
  }
}
