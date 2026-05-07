"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { SignupSchema, TypesignUpSchema } from "./SignupSchema";
import SignUp from "@/apis/SignUp";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/Componenets/ui/Spinner";
export default function RegisterComponenet() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });
  async function SendData(data: TypesignUpSchema) {
    setLoading(true);
    const isSignedUp = await SignUp(data);
    if (isSignedUp) {
      reset();
      setLoading(false);

      toast.success("signed up sucsessfully");

      setTimeout(() => {
        router.push("login");
      }, 2000);
    } else {
      toast.error("account already exist");
      setLoading(false);
    }
  }

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(SendData)}
        className=" w-full md:w-1/2 lg:w-1/3 flex flex-col gap-5  m-auto py-10 px-6"
      >
        <div className=" flex flex-col gap-2 text-center">
          <h2 className=" text-[20px] md:text-[30px]  font-semibold  text-azure text-center ">
            Create Your Account
          </h2>
          <p className=" font-medium text-azure">
            Start your fresh journey with us today
          </p>
        </div>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className=" text-azure font-medium"
                htmlFor={field.name}
              >
                Name *
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Ali"
                autoComplete="off"
                className=" rounded-[6px] border border-azure pt-2.25  px-3 pb-2.5"
              />
              {/* <FieldDescription>
              Provide a concise title for your bug report.
            </FieldDescription> */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="rePassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className=" text-azure font-medium"
                htmlFor={field.name}
              >
                Confirm Password *
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Create Strong Password"
                autoComplete="off"
                type="Password"
                className=" rounded-[6px] border border-azure pt-2.25  px-3 pb-2.5"
              />
              {/* <FieldDescription>
              Provide a concise title for your bug report.
            </FieldDescription> */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className=" text-azure font-medium"
                htmlFor={field.name}
              >
                Phone Number *
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="+1 234 567 8900"
                type="tel"
                autoComplete="off"
                className=" rounded-[6px] border border-azure pt-2.25  px-3 pb-2.5"
              />
              {/* <FieldDescription>
              Provide a concise title for your bug report.
            </FieldDescription> */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          type="submit"
          disabled={loading}
          className=" rounded-[8px] w-full bg-sprinGreen py-6 cursor-pointer"
        >
          <FaUser /> {loading ? <Spinner /> : "Create My Account"}
        </Button>
      </form>
    </div>
  );
}
