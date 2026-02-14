import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { SiteModel } from "@/models/Site";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const sites = await SiteModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ sites });
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });

  const body = await req.json().catch(() => null);
  const { item, value } = body ?? {};

  if (typeof item !== "string" || typeof value !== "boolean") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await connectDB();
  const created = await SiteModel.create({ item: item.trim(), value });
  return NextResponse.json({ site: created }, { status: 201 });
}