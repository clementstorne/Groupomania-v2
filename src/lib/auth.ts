import prisma from "@/lib/prisma";
import { DbUser } from "@/types";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          const { id, firstname, lastname, role, imageUrl } = user;

          return {
            id,
            email,
            firstname,
            lastname,
            role,
            imageUrl,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const userWithDetails = user as Omit<DbUser, "password">;
        token.firstname = userWithDetails.firstname;
        token.lastname = userWithDetails.lastname;
        token.role = userWithDetails.role;
        token.imageUrl = userWithDetails.imageUrl;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user = {
          // @ts-ignore
          id: token.sub,
          email: token.email,
          firstname: token.firstname,
          lastname: token.lastname,
          role: token.role,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
