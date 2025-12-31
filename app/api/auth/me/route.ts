import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";


export async function GET(req: NextRequest) {
  const res = requireAdmin(req);
  if (!res.ok) return NextResponse.json({ error: res.error }, { status: 401 });
  return NextResponse.json({ admin: res.admin });
}
