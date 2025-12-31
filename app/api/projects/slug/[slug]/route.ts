import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ProjectModel } from "@/models/Projects";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { slug } = await params;

  await connectDB();

  try {
    const project = await ProjectModel.findOne({ slug }).lean();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (e: any) {
    console.error("Error fetching project:", e);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}