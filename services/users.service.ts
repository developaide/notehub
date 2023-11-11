import { db } from "@/lib/mongodb";
import argon2 from "argon2";
export interface User {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function createUser({
  createdAt,
  email,
  name,
  password,
  updatedAt,
  image,
}: User) {
  try {
    const user = await (await db()).collection<User>("users").findOne({ name });

    if (user) {
      throw new Error(
        `User already exist with name = ${name}! Name needs to be unique`
      );
    }

    await (await db()).collection<User>("users").insertOne({
      createdAt,
      email,
      name,
      password,
      updatedAt,
      image: image ? image : "no_image",
    });

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
