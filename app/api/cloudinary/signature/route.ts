import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/auth";


export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });


  const body = await req.json().catch(() => null);
  const folder = String(body?.folder || "portfolio");


  const timestamp = Math.round(Date.now() / 1000);


  // Optional: restrict allowed params included in signature
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET!
  );


  return NextResponse.json({
    timestamp,
    signature,
    folder,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
  });
}
