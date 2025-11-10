import NextAuth, {
  NextAuthOptions,
  User as NextAuthUser,
  Session,
  Account,
  Profile,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";


declare module "next-auth" {
  interface User {
    id?: string;
  }

  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

// Типи для callback параметрів
interface SignInCallbackParams {
  user: NextAuthUser;
  account: Account | null;
  profile?: Profile | undefined;
}

interface JWTCallbackParams {
  token: JWT;
  user?: NextAuthUser;
}

interface SessionCallbackParams {
  session: Session;
  token: JWT;
}

export const authOptions: NextAuthOptions = {
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
    async signIn({
      user,
      profile,
    }: SignInCallbackParams): Promise<boolean> {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
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

    async jwt({ token, user }: JWTCallbackParams): Promise<JWT> {
      if (user) token.id = user.id;
      return token;
    },

    async session({ session, token }: SessionCallbackParams): Promise<Session> {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
