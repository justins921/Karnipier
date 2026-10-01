import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { moveListing } from "@/lib/classifieds-store";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { direction } = await req.json().catch(() => ({ direction: "" }));
  if (direction !== "up" && direction !== "down") {
    return NextResponse.json({ error: "Invalid direction." }, { status: 400 });
  }
  try {
    await moveListing(params.id, direction);
    revalidatePath("/classifieds");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not reorder listing." }, { status: 500 });
  }
}
