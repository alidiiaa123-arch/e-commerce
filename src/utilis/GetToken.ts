import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function GetToken() {
  const CockieToken = await cookies();
  const EncryptedToken =
    CockieToken.get("next-auth.session-token")?.value ||
    CockieToken.get("__Secure-next-auth.session-token")?.value;
  const token = await decode({
    token: EncryptedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return token?.token;
}
