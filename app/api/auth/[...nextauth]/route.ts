import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Підключаємо базу
      await connectDB();

      // Перевіряємо, чи є користувач у MongoDB
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        // Якщо нема — створюємо
        const newUser = new User({
          username: user.name,
          email: user.email,
          favorites: [],
          googleId: profile?.sub,
        });
        await newUser.save();
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
