import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CertificationModel } from "@/models/Certifications";
import { isNonEmptyString } from "@/lib/validator";
import { requireAdmin } from "@/lib/auth";

function buildOrganizationLogoUrl(organization: string) {
  const encodedDomain = `${organization.trim().toLowerCase().replace(/\s+/g, "")}.com`;
  return `https://img.logo.dev/${encodedDomain}?token=pk_X4zAdAXtQVGczC7dYQmUeQ`;
}

export async function GET() {
  await connectDB();
  const certifications = await CertificationModel.find()
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return NextResponse.json({ certifications });
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });

  const body = await req.json().catch(() => null);
  const {
    name,
    organization,
    organizationUrl: incomingOrganizationUrl,
    issuedDate,
    credentialUrl,
    order = 0,
  } = body ?? {};

  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(organization) ||
    !isNonEmptyString(issuedDate)
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const organizationUrl = isNonEmptyString(incomingOrganizationUrl)
    ? incomingOrganizationUrl.trim()
    : buildOrganizationLogoUrl(organization);

  await connectDB();

  const created = await CertificationModel.create({
    name: name.trim(),
    organization: organization.trim(),
    organizationUrl,
    issuedDate: issuedDate.trim(),
    credentialUrl: isNonEmptyString(credentialUrl) ? credentialUrl.trim() : "",
    order: Number(order) || 0,
  });

  return NextResponse.json({ certification: created }, { status: 201 });
}
