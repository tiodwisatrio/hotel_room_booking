import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/libs/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      // The token object now correctly includes `role`
      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});
