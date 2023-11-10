import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { AuthOptions } from "next-auth";
import clientPromise from "./mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";
export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "notehub",
  }),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
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
};
