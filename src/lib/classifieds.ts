// Shared classifieds types and seed data. Safe to import from client or server.

export type ListingStatus = "available" | "sold";

export interface ClassifiedListing {
  id: string;
  title: string;
  description: string;
  /** Short price/status line, e.g. "Call for quote" or "$2,850". */
  price: string;
  status: ListingStatus;
  /** Public image URL (Vercel Blob in production, /uploads/... in local dev). */
  imageUrl: string;
  /** Lower numbers show first. */
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type ListingInput = Pick<
  ClassifiedListing,
  "title" | "description" | "price" | "status" | "imageUrl"
>;

const SEED_DATE = "2025-12-16T00:00:00.000Z";

// Mirrors the live pierstoyou.com/classifieds page as of Dec 2025.
// Used the first time the store is read, before Scott has saved anything.
const seed: Array<Omit<ClassifiedListing, "id" | "sortOrder" | "createdAt" | "updatedAt">> = [
  {
    title: "New vinyl Karni sections to convert old wood pier",
    description: "Great to use to upgrade that old wood pier! No legs - Just sections",
    price: "Call for quote",
    status: "available",
    imageUrl: "",
  },
  {
    title: "Used dock, ladder and bench in great shape",
    description: "No longer available",
    price: "SOLD",
    status: "sold",
    imageUrl:
      "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f1a59f280cd_Website%20Photo%20copy%202%20smaller.jpg",
  },
  {
    title: "2025 NEW DOCK SALE!!!!!",
    description: "Call for details and deals! SPECIAL now!! 25% OFF NEW DOCKS!!!",
    price: "Call for quote",
    status: "available",
    imageUrl: "",
  },
  {
    title: "USED 3000# Aqua-Matic Vertical Pontoon or V-Hull Lift",
    description: "No longer available",
    price: "SOLD",
    status: "sold",
    imageUrl: "",
  },
  {
    title: "USED 1000# Hewitt Cantilever Small Watercraft or Jet Ski Lift - New Bunks",
    description: "No longer available",
    price: "SOLD",
    status: "sold",
    imageUrl: "",
  },
  {
    title: "2 USED/LIKE NEW 10 section 'COMPLETE' Vinyl KARNI-PIER(S)",
    description: "FREE LOCAL DELIVERY AND INSTALL",
    price: "Call for quote",
    status: "available",
    imageUrl: "",
  },
  {
    title:
      "USED Vinyl Sections to convert that Old Wood KARNI-PIER over to MAINTENANCE FREE LAST FOREVER KARNI-PIER",
    description: "All hardware with legs",
    price: "Call for quote",
    status: "available",
    imageUrl: "",
  },
  {
    title: "NEW 26 X 108 ShoreStation Canopy Frame w/Vinyl New $3850 Sale $2850",
    description: "No longer available",
    price: "SOLD",
    status: "sold",
    imageUrl: "",
  },
  {
    title: "LIKE NEW (used 6 mo) 24 x 120 Blue ShoreStation Vinyl",
    description: "No longer available",
    price: "SOLD",
    status: "sold",
    imageUrl: "",
  },
  {
    title: "1 set of Two ShoreStation Boat Lift Install/Removal Tires and Hubs",
    description: "No longer available",
    price: "SOLD",
    status: "sold",
    imageUrl: "",
  },
];

export const seedListings: ClassifiedListing[] = seed.map((l, i) => ({
  ...l,
  id: `seed-${i + 1}`,
  sortOrder: i,
  createdAt: SEED_DATE,
  updatedAt: SEED_DATE,
}));

export function sortListings(listings: ClassifiedListing[]): ClassifiedListing[] {
  return [...listings].sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Validates and normalizes untrusted input from the admin API. */
export function parseListingInput(body: unknown): ListingInput | string {
  if (!body || typeof body !== "object") return "Invalid request.";
  const b = body as Record<string, unknown>;
  const str = (v: unknown, max: number) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const title = str(b.title, 200);
  if (!title) return "Title is required.";
  const status: ListingStatus = b.status === "sold" ? "sold" : "available";
  const imageUrl = str(b.imageUrl, 1000);
  if (imageUrl && !/^(https:\/\/|\/uploads\/)/.test(imageUrl)) {
    return "Image URL must be an uploaded image.";
  }

  return {
    title,
    description: str(b.description, 2000),
    price: str(b.price, 100),
    status,
    imageUrl,
  };
}
