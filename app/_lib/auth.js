import NextAuth from "next-auth";
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
    // authorized if returns true means user is authenticated
    authorized({ auth, request }) {
      // !! convert to boolean
      return !!auth?.user;
    },
    // will be called before user sign in
    // like middleware
    async signIn({ user, account, profile }) {
      console.log("calleddd");
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          console.log(2);

          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    // add guestId to session
    // here will be called after user sign in or sign out
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
