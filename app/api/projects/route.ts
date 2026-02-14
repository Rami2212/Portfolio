import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ProjectModel } from "@/models/Projects";
import { requireAdmin } from "@/lib/auth";
import { isCategory, isNonEmptyString, toSlug } from "@/lib/validator";


export async function GET() {
  await connectDB();
  const projects = await ProjectModel.find().sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json({ projects });
}


export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });


  const body = await req.json().catch(() => null);
  const {
    title,
    slug: slugIn,
    category,
    shortDescription,
    longDescription = "",
    tags = [],
    coverImage = "",
    galleryImages = [],
    techStack = [],
    liveUrl = "",
    demoUrl = "",
    githubUrl = "",
    isFeatured = false,
    order = 0,
  } = body ?? {};


  if (!isNonEmptyString(title) || !isCategory(category) || !isNonEmptyString(shortDescription, 5)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }


  const slug = isNonEmptyString(slugIn) ? toSlug(slugIn) : toSlug(title);


  await connectDB();
  try {
    const created = await ProjectModel.create({
      title: title.trim(),
      slug,
      category,
      shortDescription: shortDescription.trim(),
      longDescription,
      tags,
      coverImage,
      galleryImages,
      techStack,
      liveUrl,
      demoUrl,
      githubUrl,
      isFeatured: Boolean(isFeatured),
      order: Number(order) || 0,
    });
    return NextResponse.json({ project: created }, { status: 201 });
  } catch (e: any) {
    if (e?.code === 11000) return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
