import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

/**
 * 비밀번호 해싱
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * 비밀번호 비교
 */
export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

/**
 * JWT 토큰 생성
 */
export function generateToken(userId: string, email: string): string {
  return jwt.sign({ id: userId, email }, SECRET_KEY, { expiresIn: "1h" });
}
