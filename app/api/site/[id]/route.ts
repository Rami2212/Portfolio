import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { SiteModel } from "@/models/Site";
import { requireAdmin } from "@/lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  req: NextRequest,
  { params }: RouteContext
) {
  const { id } = await params;

  const auth = requireAdmin(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const updates: any = {};

  if (body?.item !== undefined) {
    if (typeof body.item !== "string") {
      return NextResponse.json({ error: "Invalid item" }, { status: 400 });
    }
    updates.item = body.item.trim();
  }

  if (body?.value !== undefined) {
    if (typeof body.value !== "boolean") {
      return NextResponse.json({ error: "Invalid value" }, { status: 400 });
    }
    updates.value = body.value;
  }

  await connectDB();

  const updated = await SiteModel.findByIdAndUpdate(id, updates, {
    new: true,
  });

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ site: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteContext
) {
  const { id } = await params;

  const auth = requireAdmin(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  await connectDB();

  const deleted = await SiteModel.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
