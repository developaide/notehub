import { createUser, findUserByUserName } from "@/services/users.service";
import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    const hashPassword = await argon2.hash(password);

    const user = await createUser({
      name,
      email,
      password: hashPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (user) {
      return new NextResponse(
        JSON.stringify({
          success: true,
          message: "Successfully created user",
          status: 201,
        }),
        { status: 201, statusText: "created" }
      );
    } else {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Could not create user",
          status: 500,
        }),
        { status: 500, statusText: "Internal server error" }
      );
    }
  } catch (e: any) {
    return new NextResponse(
      JSON.stringify({ success: false, error: e.message, status: 500 }),
      { status: 500, statusText: "Internal server error" }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get("name");
    const password = searchParams.get("password");

    const user = await findUserByUserName({
      password: password as string,
      name: name as string,
    });

    if (user) {
      return new NextResponse(
        JSON.stringify({
          success: true,
          data: user,
          status: 200,
        }),
        { status: 200, statusText: "user found" }
      );
    } else {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Could not found user",
          status: 500,
        }),
        { status: 500, statusText: "Internal server error" }
      );
    }
  } catch (e: any) {
    return new NextResponse(
      JSON.stringify({ success: false, error: e.message, status: 500 }),
      { status: 500, statusText: "Internal server error" }
    );
  }
}
