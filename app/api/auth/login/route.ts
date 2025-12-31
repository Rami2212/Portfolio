import { NextResponse } from "next/server";
import { signAdminToken } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = body?.email;
  const password = body?.password;

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signAdminToken(email);
  return NextResponse.json({ token });
}
