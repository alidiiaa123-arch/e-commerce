import GetAllProduct from "@/apis/GetAllProduct";

export default async function GetbrandProduct({
  brandName,
}: {
  brandName: string;
}) {
  const AllProduct = await GetAllProduct();
  if (!AllProduct) throw new Error("Server error");
  const All = structuredClone(AllProduct);
  const SpecifcProduct = All?.filter(
    (product) => product?.brand?.name === brandName,
  );
  return SpecifcProduct;
}
