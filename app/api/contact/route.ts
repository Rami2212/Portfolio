import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim();
  const message = String(body?.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 });
  }

  await connectDB();
  const Contact = mongoose.connection.collection("contacts");
  await Contact.insertOne({ name, email, message, createdAt: new Date() });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  await connectDB();
  const Contact = mongoose.connection.collection("contacts");
  const contacts = await Contact.find().sort({ createdAt: -1 }).toArray();
  return NextResponse.json({ contacts });
}
