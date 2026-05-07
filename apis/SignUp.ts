"use server";
import { TypesignUpSchema } from "@/app/auth/register/SignupSchema";

export default async function SignUp(formdata: TypesignUpSchema) {
  try {
    const data = await fetch(`${process.env.Apiroute_v1}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data.ok;
  } catch (error) {
    throw error;
  }
}
