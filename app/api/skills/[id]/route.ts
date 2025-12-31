import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { SkillModel } from "@/models/Skills";
import { requireAdmin } from "@/lib/auth";
import { isCategory, isNonEmptyString } from "@/lib/validator";


export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });


  const body = await req.json().catch(() => null);
  const updates: any = {};


  if (body?.name !== undefined) {
    if (!isNonEmptyString(body.name)) return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    updates.name = body.name.trim();
  }
  if (body?.category !== undefined) {
    if (!isCategory(body.category)) return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    updates.category = body.category;
  }
  if (body?.iconUrl !== undefined) {
    if (!isNonEmptyString(body.iconUrl)) return NextResponse.json({ error: "Invalid iconUrl" }, { status: 400 });
    updates.iconUrl = body.iconUrl.trim();
  }
  if (body?.order !== undefined) updates.order = Number(body.order) || 0;


  await connectDB();
  const updated = await SkillModel.findByIdAndUpdate(params.id, updates, { new: true });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });


  return NextResponse.json({ skill: updated });
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });


  await connectDB();
  const deleted = await SkillModel.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });


  return NextResponse.json({ ok: true });
}
