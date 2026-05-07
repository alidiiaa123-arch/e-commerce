import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
export const NextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Login page",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const data = await fetch(`${process.env.Apiroute_v1}/auth/signin`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const res = await data.json();
          if (data.ok) {
            const { id }: { id: string } = jwtDecode(res.token);
            const { name, email } = res?.user;
            return { name, email, id: id, responseToken: res.token };
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);

          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.token = user.responseToken;
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },

    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name!;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
