import { db } from "@/lib/mongodb";
import argon2 from "argon2";
export interface User {
  _id?: string;
  username: string;
  email: string;
  image?: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function createUser(payload: User) {
  try {
    await (await db()).collection<User>("users").insertOne(payload);
    return true;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function findUserByUserName({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const user = await (await db())
      .collection<User>("users")
      .findOne({ username }, { projection: { password: 0 } });

    if (!user)
      throw new Error(`Could not found user with username = ${username}`);

    const authPassword = await argon2.verify(user.password, password);

    if (!authPassword) throw new Error(`Invalid password!`);

    return user;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
