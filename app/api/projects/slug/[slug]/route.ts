import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ProjectModel } from "@/models/Projects";


export async function GET(_: Request, { params }: { params: { slug: string } }) {
  await connectDB();
  const project = await ProjectModel.findOne({ slug: params.slug }).lean();
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ project });
}
