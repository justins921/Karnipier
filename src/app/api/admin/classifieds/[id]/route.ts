import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { parseListingInput } from "@/lib/classifieds";
import { deleteListing, updateListing } from "@/lib/classifieds-store";

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  const input = parseListingInput(await req.json().catch(() => null));
  if (typeof input === "string") return NextResponse.json({ error: input }, { status: 400 });

  try {
    const listing = await updateListing(params.id, input);
    if (!listing) return NextResponse.json({ error: "Listing not found." }, { status: 404 });
    revalidatePath("/classifieds");
    return NextResponse.json(listing);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not save listing." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    if (!(await deleteListing(params.id))) {
      return NextResponse.json({ error: "Listing not found." }, { status: 404 });
    }
    revalidatePath("/classifieds");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not delete listing." }, { status: 500 });
  }
}
