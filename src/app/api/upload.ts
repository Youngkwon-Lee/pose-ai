import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public/uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  const filePath = path.join(uploadDir, file.name);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ message: "File uploaded successfully", url: `/uploads/${file.name}` });
}
