import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ProjectModel } from "@/models/Projects";
import { requireAdmin } from "@/lib/auth";
import { isCategory, isNonEmptyString, toSlug } from "@/lib/validator";

interface Context {
  params: { id: string };
}

export async function PATCH(req: NextRequest, { params }: Context) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });


  const body = await req.json().catch(() => null);
  const updates: any = {};


  if (body?.title !== undefined) {
    if (!isNonEmptyString(body.title)) return NextResponse.json({ error: "Invalid title" }, { status: 400 });
    updates.title = body.title.trim();
  }
  if (body?.slug !== undefined) {
    if (!isNonEmptyString(body.slug)) return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    updates.slug = toSlug(body.slug);
  }
  if (body?.category !== undefined) {
    if (!isCategory(body.category)) return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    updates.category = body.category;
  }
  if (body?.shortDescription !== undefined) updates.shortDescription = String(body.shortDescription || "");
  if (body?.longDescription !== undefined) updates.longDescription = String(body.longDescription || "");
  if (body?.tags !== undefined) updates.tags = Array.isArray(body.tags) ? body.tags : [];
  if (body?.coverImage !== undefined) updates.coverImage = String(body.coverImage || "");
  if (body?.galleryImages !== undefined) updates.galleryImages = Array.isArray(body.galleryImages) ? body.galleryImages : [];
  if (body?.techStack !== undefined) updates.techStack = Array.isArray(body.techStack) ? body.techStack : [];
  if (body?.liveUrl !== undefined) updates.liveUrl = String(body.liveUrl || "");
  if (body?.demoUrl !== undefined) updates.demoUrl = String(body.demoUrl || "");
  if (body?.isFeatured !== undefined) updates.isFeatured = Boolean(body.isFeatured);
  if (body?.order !== undefined) updates.order = Number(body.order) || 0;


  await connectDB();
  try {
    const updated = await ProjectModel.findByIdAndUpdate(params.id, updates, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ project: updated });
  } catch (e: any) {
    if (e?.code === 11000) return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, { params }: Context) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });


  await connectDB();
  const deleted = await ProjectModel.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });


  return NextResponse.json({ ok: true });
}
