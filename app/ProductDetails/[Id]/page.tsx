import GetProductDetails from "@/apis/GetProductDetails";
import AddtoCartButton from "@/Componenets/ui/AddtoCartButton";
import ProductDetailsImages from "@/Componenets/ui/ProductDetailsImages";
import QuantityInProductDetails from "@/Componenets/ui/QuantityInProductDetails";
import { Button } from "@/components/ui/button";
import { ProductDetailsInterFace } from "@/interfaces/ProductDetailsInterface";
import { FaCarTunnel } from "react-icons/fa6";
export default async function page({
  params,
}: {
  params: Promise<{ Id: string }>;
}) {
  const { Id } = await params;
  const ProductDetails: ProductDetailsInterFace = await GetProductDetails(Id);

  return (
    <div>
      <div className="top px-6 md-px-10 animate-fade-in  lg:px-20 py-10 flex gap-4 justify-center items-center flex-col md:flex-row">
        <ProductDetailsImages ProductDetails={ProductDetails} />
        <div className="right border border-border  p-6 rounded-[12px] bg-white w-full md:w-2/3 ">
          <div className=" flex flex-col justify-start items-start gap-4">
            <div className="text flex justify-start items-center gap-2">
              <p className="text-[12px] text-sprinGreen pt-2.5 px-4 hover:bg-green-200 rounded-[12px] p-1 cursor-pointer">
                {ProductDetails.category.name}
              </p>
              <p className="text-azure m-0 text-[12px] pt-2.5 px-4 p-1">
                {ProductDetails.brand.name}
              </p>
            </div>
            <h2 className=" font-bold  text-textGray text-[30px] m-0">
              {ProductDetails.title}
            </h2>
            <h3 className=" font-bold text-[30px] text-textGray">
              {ProductDetails.price} EGP
            </h3>
            <div className="  flex justify-start items-center gap-1.5">
              <span className="bg-sprinGreen animate-pulse size-2 rounded-full"></span>
              <p className=" text-sprinGreen  text-[14px]">In Stock </p>
            </div>
            <p className=" font-medium text-azure">
              {ProductDetails.description}
            </p>
            <QuantityInProductDetails productDetails={ProductDetails} />
            <div className=" grid grid-cols-2  w-full gap-3">
              <AddtoCartButton
                id={ProductDetails._id}
                className="bg-sprinGreen  text-white flex justify-center items-center gap-2 rounded-[12px]  cursor-pointer"
              >
                <FaCarTunnel />
                Add to cart{" "}
              </AddtoCartButton>
              <Button className="bg-textGray rounded-[12px] py-6 cursor-pointer">
                Buy Now{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
