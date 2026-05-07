import GetAllProduct from "@/apis/GetAllProduct";
import ShopComponent from "./ShopComponent";
import { ProductInterface } from "@/interfaces/ProductInterface";

export default async function Shop() {
  const data: ProductInterface[] = await GetAllProduct();

  return (
    <>
      <div>
        <ShopComponent data={data} />
      </div>
    </>
  );
}
