import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ProjectModel } from "@/models/Projects";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(
  _: Request,
  { params }: RouteContext
) {
  const { slug } = await params;

  await connectDB();

  const project = await ProjectModel.findOne({ slug }).lean();

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ project });
}
