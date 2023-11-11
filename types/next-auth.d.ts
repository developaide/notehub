import NextAuth, { Account, DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Token {
    userId: string;
    accessToken: string;
  }

  interface Session {
    accessToken: string;
    user: {
      /** The user's id. */
      userId: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: Account.accessToken;
    userId: Account.userId;
  }
}
