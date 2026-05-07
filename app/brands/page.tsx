import GetAllBrands from "@/apis/Brands/GetAllBrands";
import BrandsComponent from "./BrandsComponent";
import { BrandsInterface } from "@/interfaces/GetAllBrandsInterface";

export default async function Brands() {
  const data: BrandsInterface[] = await GetAllBrands();
  return (
    <>
      <div>
        <BrandsComponent data={data} />
      </div>
    </>
  );
}
