import { NextResponse } from "next/server";
import { saveImage } from "@/lib/classifieds-store";

// Vercel caps request bodies at 4.5 MB; the admin page shrinks photos before upload.
const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Please upload a JPG, PNG, WebP or GIF image." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image is too large (max 4 MB)." }, { status: 400 });
  }

  try {
    return NextResponse.json({ url: await saveImage(file) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
