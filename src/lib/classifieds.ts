export interface ClassifiedListing {
  id: string;
  title: string;
  description: string;
  price: string;
  badge: "New" | "Sale" | "Used" | "Used — Like New";
  sold: boolean;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "piers2u_classifieds";

const defaultListings: ClassifiedListing[] = [
  {
    id: "1",
    title: "New Vinyl Karni Sections",
    description: "Great to use to upgrade that old wood pier! No legs — just sections.",
    price: "$500 each",
    badge: "New",
    sold: false,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "2025 New Dock Sale",
    description: "Call for details and deals! SPECIAL now!! 25% OFF NEW DOCKS!!!",
    price: "Call for Quote",
    badge: "Sale",
    sold: false,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Two Used/Like New 10-Section Complete Vinyl Karni-Piers",
    description: "FREE LOCAL DELIVERY AND INSTALL. Complete vinyl Karni-Pier systems in excellent condition.",
    price: "$7,500 each (Originally $12,500)",
    badge: "Used — Like New",
    sold: false,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "4",
    title: "Used Vinyl Sections for Wood Pier Conversion",
    description: "All hardware, with legs. Perfect for upgrading your existing wood pier.",
    price: "$850 per section",
    badge: "Used",
    sold: false,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "5",
    title: "Used dock, ladder, bench",
    description: "",
    price: "",
    badge: "Used",
    sold: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-06-01T00:00:00.000Z",
  },
  {
    id: "6",
    title: "3000# Aqua-Matic pontoon lift",
    description: "",
    price: "",
    badge: "Used",
    sold: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-06-01T00:00:00.000Z",
  },
  {
    id: "7",
    title: "1000# Hewitt cantilever jet ski lift",
    description: "",
    price: "",
    badge: "Used",
    sold: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-06-01T00:00:00.000Z",
  },
  {
    id: "8",
    title: "ShoreStation canopy frame",
    description: "",
    price: "",
    badge: "Used",
    sold: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-06-01T00:00:00.000Z",
  },
  {
    id: "9",
    title: "ShoreStation vinyl boat cover",
    description: "",
    price: "",
    badge: "Used",
    sold: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-06-01T00:00:00.000Z",
  },
  {
    id: "10",
    title: "ShoreStation lift tires/hubs",
    description: "",
    price: "",
    badge: "Used",
    sold: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-06-01T00:00:00.000Z",
  },
];

export function getListings(): ClassifiedListing[] {
  if (typeof window === "undefined") return defaultListings;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultListings));
    return defaultListings;
  }
  return JSON.parse(stored);
}

export function saveListing(listing: ClassifiedListing): void {
  const listings = getListings();
  const index = listings.findIndex((l) => l.id === listing.id);
  if (index >= 0) {
    listings[index] = { ...listing, updatedAt: new Date().toISOString() };
  } else {
    listings.push({
      ...listing,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}

export function deleteListing(id: string): void {
  const listings = getListings().filter((l) => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}
