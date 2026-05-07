"use client";
import { DeleteCartItem } from "@/apis/CartOPeration/DaleteCart";
import { UpdateCartQuntity } from "@/apis/CartOPeration/UpdateCart";
import { Spinner } from "@/Componenets/ui/Spinner";
import { Button } from "@/components/ui/button";
import { Product2 } from "@/interfaces/CartData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
export default function UserCartComponent({
  product,
  price,
  count,
}: {
  product: Product2;
  price: number;
  count: number;
}) {
  const invalidat = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: UpdateCartQuntity,
    onSuccess: (data) => {
      setTimeout(() => {
        toast.success(data.message);
      }, 2000);
      invalidat.invalidateQueries({
        queryKey: ["Cart"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: muteateDelete, isPending: isloading } = useMutation({
    mutationFn: DeleteCartItem,
    onSuccess: (data) => {
      toast.success(data.message);
      invalidat.invalidateQueries({
        queryKey: ["Cart"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function HandelUpdateQuta(count: number, id: string) {
    mutate({ count: count, id: id });
  }
  return (
    <div className="left flex justify-between   items-start   flex-col gap-5  md:flex-row      border-2 border-[#F3F4F6] bg-whit px-4 py-3 rounded-[16px]  ">
      <div className="flex    justify-start items-center gap-4.5">
        <div className="main_left     relative">
          <div className="  rounded-[12px] border border-[#F3F4F6] size-32">
            <Image
              src={product?.imageCover}
              width={102}
              height={102}
              alt="image"
              className=" object-cover size-25.5   m-auto "
            />
          </div>
          <span className=" bottom-0  text-[10px] right-0 capitalize bg-sprinGreen px-2 py-2 text-white rounded-[10px]  absolute">
            In stock
          </span>
        </div>
        <div className="main_right flex justify-start  flex-wrap items-start flex-col gap-3">
          <h2 className=" font-semibold text-[18px] ">{product?.title}</h2>
          <div className=" flex justify-center gap-8  items-center">
            <span className="px-2.5 py-1 text-start rounded-[12px] bg-[#F0FDF4] text-sprinGreen text-[12px] font-medium  ">
              {product?.category?.name}
            </span>
            <span className="font-medium  text-azure text-[12px] ">
              SKU: 5CA0AD
            </span>
          </div>
          <div className=" flex items-center gap-2">
            <p className="text-sprinGreen font-bold text-[18px]">{price} EGP</p>
            <p className="text-azure text-[12px] font-medium">per unit</p>
          </div>
          <div className="flex  items-center gap-2">
            <div className="bg-[#F9FAFB] flex justify-center gap-4 items-center rounded-[12px] p-1 blur-[2] border border-[#E5E7EB]">
              <Button
                disabled={isPending}
                onClick={() => HandelUpdateQuta(count - 1, product._id)}
                className="size-8 cursor-pointer rounded-[8px] bg-white blur-[2] text-black"
              >
                {isPending ? <Spinner /> : "-"}
              </Button>
              <p className="font-bold">{count}</p>
              <Button
                disabled={isPending}
                onClick={() => {
                  HandelUpdateQuta(count + 1, product._id);
                }}
                className="size-8 rounded-[8px] cursor-pointer bg-sprinGreen text-white blur-[2]"
              >
                {isPending ? <Spinner /> : "+"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="  flex justify-center items-center mt-auto gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-azure text-center font-medium text-[12px]">
            Total
          </p>
          <div className="flex justify-center items-center">
            <h2 className="font-bold text-[20px]">{count * price} </h2>
            <p className="text-azure font-medium text-[14px]">EGP</p>
          </div>
        </div>

        {isloading ? (
          <Spinner className="flex justify-center items-center" />
        ) : (
          <Button
            disabled={isloading || isPending}
            onClick={() => muteateDelete(product?._id)}
            className={`size-10 cursor-pointer ${isloading ? "bg-white" : "bg-[#FEF2F2] border border-[#FFC9C9]"}  rounded-[12px] flex justify-center items-center`}
          >
            {isloading ? (
              <Spinner />
            ) : (
              <FaTrashCan className="text-[#FB2C36]" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
