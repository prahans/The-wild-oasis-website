import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async session({ session }) {
      if (!session.user.email) return session;

      const guest = await getGuest(session.user.email);
      if (guest) {
        session.user.guestId = guest.id;
      }

      return session;
    },
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          await createGuest({
            email: user.email,
            fullName: user.name ?? "Guest",
          });
        }
        return true;
      } catch {
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
