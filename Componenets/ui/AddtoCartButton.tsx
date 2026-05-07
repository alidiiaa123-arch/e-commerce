"use client";
import AddToCart from "@/apis/AddToCart";
import { Spinner } from "@/components/ui/spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { toast } from "react-toastify";

export default function AddtoCartButton({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className: string;
  id: string;
}) {
  const Invalidatequery = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["AddtToCart", id],
    mutationFn: AddToCart,
    onSuccess: (data) => {
      toast.success(data.message);
      Invalidatequery.invalidateQueries({
        queryKey: ["Cart"],
      });
    },
    onError: (error) => {
      toast.error("please login first");
    },
  });
  return (
    <>
      <button
        disabled={isPending}
        onClick={() => mutate({ id })}
        className={className}
      >
        {isPending ? <Spinner className="m-auto" /> : children}
      </button>
    </>
  );
}
