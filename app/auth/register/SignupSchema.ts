import * as z from "zod";

export const SignupSchema = z
  .object({
    name: z.string().nonempty("name is required"),
    email: z.string().nonempty("email is required").email(),
    password: z
      .string()
      .nonempty("please enter strong password")
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/,

        ` Ensures that the password contains at least one digit.

 Ensures that the password contains at least one lowercase letter.

 Ensures that the password contains at least one uppercase letter.

 Ensures that the password contains at least one special character from the set @#$%^&+=.

 Ensures that the password does not contain any whitespace characters.

 Ensures that the password is between 8 and 20 characters long.

 Asserts the position at the end of the string.`,
      ),
    rePassword: z.string().nonempty("please enter strong password"),
    phone: z
      .string("")
      .nonempty("phone is required")
      .regex(/^(?:\+20|0)?1[0125]\d{8}$/),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Password don't match",
  });
export type TypesignUpSchema = z.infer<typeof SignupSchema>;
