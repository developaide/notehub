import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { AuthOptions } from "next-auth";
import clientPromise from "./mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";
export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
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
        username: { label: "Username", placeholder: "e.g foo", type: "text" },
        password: {
          label: "Password",
          placeholder: "e.g foo123",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const username = credentials?.username;
        const password = credentials?.password;
        const { data, status } = await axios.get("/api/users", {
          headers: {
            Accept: "application/json",
          },
        });

        if (status === 200) {
          console.log(data);
        } else {
          return null;
        }
      },
    }),
  ],
};
