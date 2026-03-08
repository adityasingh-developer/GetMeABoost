import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user?.email) {
        token.email = user.email;
      }

      if (trigger === "update" && session) {
        token.name = session?.name || token.name || null;
        token.email = session?.email || token.email || null;
        token.username = session?.username || token.username || null;
        token.profileImage = session?.profileImage || token.profileImage || "";
      }

      const shouldHydrateUser =
        trigger === "signIn" || !token.username || token.profileImage === undefined;

      if (shouldHydrateUser && token?.email) {
        await connectDB();
        const dbUser = await User.findOne({
          email: String(token.email).trim().toLowerCase(),
        })
          .select("name username profileImage")
          .lean();

        token.name = dbUser?.name || token.name || null;
        token.username = dbUser?.username || null;
        token.profileImage = dbUser?.profileImage || "";
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.name = token?.name || session.user.name || null;
        session.user.email = token?.email || session.user.email || null;
        session.user.username = token?.username || null;
        session.user.profileImage = token?.profileImage || "";
      }

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        identifier: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const identifier = credentials?.identifier?.trim().toLowerCase();
        const password = credentials?.password;
        const recaptchaToken = credentials?.recaptchaToken;
        const recaptchaAction = credentials?.recaptchaAction;

        if (!identifier || !password || !recaptchaToken) {
          return null;
        }

        const recaptchaResult = await verifyRecaptchaToken(
          recaptchaToken,
          recaptchaAction || "login"
        );
        if (!recaptchaResult.success) {
          return null;
        }

        await connectDB();

        const user = await User.findOne({
          $or: [{ email: identifier }, { username: identifier }],
        });

        if (!user?.password) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Discord({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
    })
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
