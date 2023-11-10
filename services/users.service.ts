import { db } from "@/lib/mongodb";
import argon2 from "argon2";
export interface User {
  _id?: string;
  name: string;
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
  name,
  password,
}: {
  name: string;
  password: string;
}) {
  try {
    const user = await (await db()).collection<User>("users").findOne({ name });

    if (!user) throw new Error(`Could not found user with name = ${name}`);

    const authPassword = await argon2.verify(user.password, password);

    if (!authPassword) throw new Error(`Invalid password!`);

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      image: user.image,
    };
  } catch (e: any) {
    throw new Error(e.message);
  }
}
