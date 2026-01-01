import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ReviewModel } from "@/models/Reviews";
import { isNonEmptyString } from "@/lib/validator";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await connectDB();

  // If admin token present -> return all, else only approved
  const auth = requireAdmin(req);
  const filter = auth.ok ? {} : { approved: true };

  const reviews = await ReviewModel.find(filter).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ reviews, admin: auth.ok });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { name, position, company, text } = body ?? {};

  if (!isNonEmptyString(name) || !isNonEmptyString(text, 5)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await connectDB();
  const created = await ReviewModel.create({
    name: name.trim(),
    position: isNonEmptyString(position) ? position.trim() : undefined,
    company: isNonEmptyString(company) ? company.trim() : undefined,
    text: text.trim(),
    approved: false,
  });

  return NextResponse.json(
    { review: created, message: "Thanks! Your review will appear after approval." },
    { status: 201 }
  );
}
