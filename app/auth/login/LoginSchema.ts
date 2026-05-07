import * as z from "zod";

export const SigninSchema = z.object({
  email: z.string().nonempty("email is required").email(),
  password: z.string().nonempty("please enter your password"),
});

export type TypesignInSchema = z.infer<typeof SigninSchema>;
