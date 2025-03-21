import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { createUser, findUserByEmail } from "@/lib/db";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return NextResponse.json({ message: "Email already in use" }, { status: 400 });
  }

  const hashedPassword = await hashPassword(password);
  const user = await createUser({ name, email, password: hashedPassword });

  return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });
}
