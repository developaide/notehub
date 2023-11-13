import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { AuthOptions } from "next-auth";
import clientPromise from "./mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { findUserByName } from "@/services/users.service";
export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "notehub",
  }),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRETS as string,
      httpOptions: {
        timeout: 3000,
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRETS as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", placeholder: "e.g foo", type: "text" },
        password: {
          label: "Password",
          placeholder: "e.g foo123",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const username = encodeURIComponent(credentials?.name as string);
        const password = encodeURIComponent(credentials?.password as string);

        const res = await fetch(
          `http:localhost:3000/api/users?name=${username}&password=${password}`,
          {
            method: "GET",
          }
        );

        const data = await res.json();
        if (res.ok && data.data) {
          return data.data;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const user = await findUserByName({ name: token.name as string });

        if (user) {
          token.userId = user._id;
        }
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ token, session }) {
      session.accessToken = token.accessToken;
      session.user.userId = token.userId;
      return session;
    },
  },
};
