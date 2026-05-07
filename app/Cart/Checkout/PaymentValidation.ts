import z from "zod";

export const PaymentSchema = z.object({
  paymentmethod: z.enum(["cash", "online"]),
  shippingAddress: z.object({
    details: z
      .string()
      .nonempty("please enter your street address")
      .min(10, "please enter right describtion"),
    phone: z
      .string()
      .nonempty("Please enter your phone number")
      .regex(/^01[0125][0-9]{8}$/, "please enter valid phone number"),
    city: z.string().nonempty("please enter your city"),
  }),
});
export type PaymentIntergface = z.infer<typeof PaymentSchema>;
//
