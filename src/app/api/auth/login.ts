import { NextResponse } from "next/server";
import { comparePasswords, generateToken } from "@/lib/auth";
import { findUserByEmail } from "@/lib/db";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const isMatch = await comparePasswords(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
  }

  const token = generateToken(user.id, user.email);
  return NextResponse.json({ token }, { status: 200 });
}
