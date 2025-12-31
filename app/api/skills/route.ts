import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { SkillModel } from "@/models/Skills";
import { isCategory, isNonEmptyString } from "@/lib/validator";
import { requireAdmin } from "@/lib/auth";


export async function GET() {
  await connectDB();
  const skills = await SkillModel.find().sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json({ skills });
}


export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });


  const body = await req.json().catch(() => null);
  const { name, category, iconUrl, order = 0 } = body ?? {};


  if (!isNonEmptyString(name) || !isCategory(category) || !isNonEmptyString(iconUrl)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }


  await connectDB();
  const created = await SkillModel.create({ name: name.trim(), category, iconUrl: iconUrl.trim(), order });
  return NextResponse.json({ skill: created }, { status: 201 });
}


