import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";


const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("Missing JWT_SECRET");


export type AdminTokenPayload = {
  sub: "admin";
  email: string;
};


export function signAdminToken(email: string) {
  const payload: AdminTokenPayload = { sub: "admin", email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}


export function verifyAdminToken(token: string): AdminTokenPayload {
  return jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
}


export function getBearerToken(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const [type, token] = auth.split(" ");
  if (type !== "Bearer" || !token) return null;
  return token;
}


export function requireAdmin(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return { ok: false as const, error: "Missing token" };


  try {
    const decoded = verifyAdminToken(token);
    if (decoded.sub !== "admin") return { ok: false as const, error: "Forbidden" };
    return { ok: true as const, admin: decoded };
  } catch {
    return { ok: false as const, error: "Invalid/expired token" };
  }
}
