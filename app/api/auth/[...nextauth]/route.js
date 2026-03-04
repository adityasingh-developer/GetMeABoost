import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;

        const allowedEmail = process.env.AUTH_EMAIL?.trim().toLowerCase();
        const allowedPassword = process.env.AUTH_PASSWORD;
        const allowedName = process.env.AUTH_NAME || "User";

        if (!email || !password || !allowedEmail || !allowedPassword) {
          return null;
        }

        if (email !== allowedEmail || password !== allowedPassword) {
          return null;
        }

        return {
          id: email,
          name: allowedName,
          email,
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
