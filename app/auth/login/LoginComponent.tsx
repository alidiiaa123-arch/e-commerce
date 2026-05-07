"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SigninSchema, TypesignInSchema } from "./LoginSchema";
import { useState } from "react";
import { Spinner } from "@/Componenets/ui/Spinner";
import { signIn } from "next-auth/react";
export default function LoginComponenet() {
  const [loading, Setloading] = useState(false);
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function SendData(data: TypesignInSchema) {
    Setloading(true);
    const IsLoggedIn = await signIn("credentials", {
      redirect: false,
      ...data,
    });
    if (IsLoggedIn?.ok) {
      toast.success("loogged in sucsessfuly");
      Setloading(false);
      reset();
      window.location.href = "/";
    } else {
      toast.error("user or password is not correct");
      Setloading(false);
    }
  }

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(SendData)}
        className=" w-full md:w-1/2 lg:w-1/3 flex flex-col gap-5  m-auto py-10 px-6"
      >
        <div className=" flex flex-col gap-2 text-center">
          <h2 className=" text-[30px]  font-bold  text-azure text-center ">
            <span className=" text-sprinGreen ">Fresh</span>
            Cart
          </h2>
          <p className=" font-medium text-azure">
            Sign in to continue your fresh shopping experience
          </p>

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className=" text-azure font-medium"
                  htmlFor={field.name}
                >
                  Email *
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="ali@example.com"
                  autoComplete="off"
                  type="mail"
                  className=" rounded-[6px] border border-azure pt-2.25  px-3 pb-2.5"
                />
                {/* <FieldDescription>
              Provide a concise title for your bug report.
            </FieldDescription> */}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className=" text-azure font-medium"
                  htmlFor={field.name}
                >
                  Password *
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Ali"
                  autoComplete="off"
                  className=" rounded-[6px] border border-azure pt-2.25  px-3 pb-2.5"
                />
                {/* <FieldDescription>
              Provide a concise title for your bug report.
            </FieldDescription> */}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Button
          disabled={loading}
          type="submit"
          className=" rounded-[8px] w-full bg-sprinGreen py-6 cursor-pointer"
        >
          <FaUser /> {loading ? <Spinner /> : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
