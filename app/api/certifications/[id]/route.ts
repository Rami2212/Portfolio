import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CertificationModel } from "@/models/Certifications";
import { requireAdmin } from "@/lib/auth";
import { isNonEmptyString } from "@/lib/validator";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function buildOrganizationLogoUrl(organization: string) {
  const encodedDomain = `${organization.trim().toLowerCase().replace(/\s+/g, "")}.com`;
  return `https://img.logo.dev/${encodedDomain}?token=pk_X4zAdAXtQVGczC7dYQmUeQ`;
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  const auth = requireAdmin(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const updates: {
    name?: string;
    organization?: string;
    organizationUrl?: string;
    issuedDate?: string;
    credentialUrl?: string;
    order?: number;
  } = {};

  if (body?.name !== undefined) {
    if (!isNonEmptyString(body.name)) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }
    updates.name = body.name.trim();
  }

  if (body?.organization !== undefined) {
    if (!isNonEmptyString(body.organization)) {
      return NextResponse.json({ error: "Invalid organization" }, { status: 400 });
    }
    updates.organization = body.organization.trim();

    if (body?.organizationUrl === undefined) {
      updates.organizationUrl = buildOrganizationLogoUrl(body.organization);
    }
  }

  if (body?.organizationUrl !== undefined) {
    if (!isNonEmptyString(body.organizationUrl)) {
      return NextResponse.json({ error: "Invalid organizationUrl" }, { status: 400 });
    }
    updates.organizationUrl = body.organizationUrl.trim();
  }

  if (body?.issuedDate !== undefined) {
    if (!isNonEmptyString(body.issuedDate)) {
      return NextResponse.json({ error: "Invalid issuedDate" }, { status: 400 });
    }
    updates.issuedDate = body.issuedDate.trim();
  }

  if (body?.credentialUrl !== undefined) {
    if (typeof body.credentialUrl !== "string") {
      return NextResponse.json({ error: "Invalid credentialUrl" }, { status: 400 });
    }
    updates.credentialUrl = body.credentialUrl.trim();
  }

  if (body?.order !== undefined) {
    updates.order = Number(body.order) || 0;
  }

  await connectDB();

  const updated = await CertificationModel.findByIdAndUpdate(id, updates, {
    new: true,
  });

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ certification: updated });
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  const auth = requireAdmin(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  await connectDB();

  const deleted = await CertificationModel.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
