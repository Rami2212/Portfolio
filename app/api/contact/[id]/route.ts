import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const auth = requireAdmin(req);

    if (!auth.ok) {
        return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    await connectDB();
    const Contact = mongoose.connection.collection("contacts");
    await Contact.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    return NextResponse.json({ ok: true });
}