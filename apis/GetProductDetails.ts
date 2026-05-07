import { ProductDetailsInterFace } from "../interfaces/ProductDetailsInterface";
export default async function GetProductDetails(
  id: string,
): Promise<ProductDetailsInterFace> {
  try {
    const data = await fetch(`${process.env.Apiroute_v1}/products/${id}`);
    if (!data.ok) {
      throw new Error(`something went wrong`);
    }
    const ProductDetails = await data?.json();

    return ProductDetails?.data;
  } catch {
    throw new Error("server error");
  }
}
