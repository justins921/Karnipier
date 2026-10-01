import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { parseListingInput } from "@/lib/classifieds";
import { createListing, getListings } from "@/lib/classifieds-store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getListings());
}

export async function POST(req: Request) {
  const input = parseListingInput(await req.json().catch(() => null));
  if (typeof input === "string") return NextResponse.json({ error: input }, { status: 400 });

  try {
    const listing = await createListing(input);
    revalidatePath("/classifieds");
    return NextResponse.json(listing, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not save listing." }, { status: 500 });
  }
}
