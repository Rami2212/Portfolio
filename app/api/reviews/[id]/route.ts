import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ReviewModel } from "@/models/Reviews";
import { requireAdmin } from "@/lib/auth";


export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });


  const body = await req.json().catch(() => null);
  const approved = Boolean(body?.approved);


  await connectDB();
  const updated = await ReviewModel.findByIdAndUpdate(params.id, { approved }, { new: true });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });


  return NextResponse.json({ review: updated });
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });


  await connectDB();
  const deleted = await ReviewModel.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });


  return NextResponse.json({ ok: true });
}


