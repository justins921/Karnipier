import { promises as fs } from "fs";
import path from "path";
import { put, list, del } from "@vercel/blob";
import {
  seedListings,
  sortListings,
  type ClassifiedListing,
  type ListingInput,
} from "./classifieds";

// Listings are stored as one JSON document. In production that lives in
// Vercel Blob (BLOB_READ_WRITE_TOKEN); locally it falls back to .data/.
//
// Each save writes a new uniquely-named blob and deletes the old ones, so
// readers never hit a CDN-cached stale copy of an overwritten file.

const DATA_PREFIX = "classifieds/data";
const IMAGE_PREFIX = "classifieds/images/";
const LOCAL_DATA_FILE = path.join(process.cwd(), ".data", "classifieds.json");
const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function hasBlobStore(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function assertWritableStorage() {
  if (!hasBlobStore() && process.env.VERCEL) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is not set. Connect a Vercel Blob store to this project."
    );
  }
}

export async function getListings(): Promise<ClassifiedListing[]> {
  if (hasBlobStore()) {
    const { blobs } = await list({ prefix: DATA_PREFIX });
    if (blobs.length === 0) return sortListings(seedListings);
    const latest = blobs.reduce((a, b) =>
      new Date(a.uploadedAt) > new Date(b.uploadedAt) ? a : b
    );
    const res = await fetch(latest.url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to read classifieds (${res.status})`);
    return sortListings(await res.json());
  }

  try {
    const raw = await fs.readFile(LOCAL_DATA_FILE, "utf8");
    return sortListings(JSON.parse(raw));
  } catch {
    return sortListings(seedListings);
  }
}

async function writeListings(listings: ClassifiedListing[]): Promise<void> {
  assertWritableStorage();
  const body = JSON.stringify(sortListings(listings), null, 2);

  if (hasBlobStore()) {
    const { blobs: old } = await list({ prefix: DATA_PREFIX });
    await put(`${DATA_PREFIX}.json`, body, {
      access: "public",
      addRandomSuffix: true,
      contentType: "application/json",
    });
    if (old.length) await del(old.map((b) => b.url));
    return;
  }

  await fs.mkdir(path.dirname(LOCAL_DATA_FILE), { recursive: true });
  await fs.writeFile(LOCAL_DATA_FILE, body);
}

export async function createListing(input: ListingInput): Promise<ClassifiedListing> {
  const listings = await getListings();
  const now = new Date().toISOString();
  const listing: ClassifiedListing = {
    ...input,
    id: crypto.randomUUID(),
    // New listings go to the top.
    sortOrder: Math.min(0, ...listings.map((l) => l.sortOrder)) - 1,
    createdAt: now,
    updatedAt: now,
  };
  await writeListings([...listings, listing]);
  return listing;
}

export async function updateListing(
  id: string,
  input: ListingInput
): Promise<ClassifiedListing | null> {
  const listings = await getListings();
  const existing = listings.find((l) => l.id === id);
  if (!existing) return null;
  const updated = { ...existing, ...input, updatedAt: new Date().toISOString() };
  await writeListings(listings.map((l) => (l.id === id ? updated : l)));
  if (existing.imageUrl && existing.imageUrl !== updated.imageUrl) {
    await deleteImage(existing.imageUrl);
  }
  return updated;
}

export async function deleteListing(id: string): Promise<boolean> {
  const listings = await getListings();
  const existing = listings.find((l) => l.id === id);
  if (!existing) return false;
  await writeListings(listings.filter((l) => l.id !== id));
  if (existing.imageUrl) await deleteImage(existing.imageUrl);
  return true;
}

export async function moveListing(id: string, direction: "up" | "down"): Promise<boolean> {
  const listings = await getListings(); // already sorted
  const i = listings.findIndex((l) => l.id === id);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= listings.length) return false;
  [listings[i], listings[j]] = [listings[j], listings[i]];
  await writeListings(listings.map((l, idx) => ({ ...l, sortOrder: idx })));
  return true;
}

export async function saveImage(file: File): Promise<string> {
  assertWritableStorage();
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const name = `${crypto.randomUUID()}.${ext || "jpg"}`;

  if (hasBlobStore()) {
    const blob = await put(`${IMAGE_PREFIX}${name}`, file, {
      access: "public",
      contentType: file.type,
    });
    return blob.url;
  }

  await fs.mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(LOCAL_UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}

// Only removes images we uploaded; seed images on the Webflow CDN are left alone.
async function deleteImage(url: string): Promise<void> {
  try {
    if (hasBlobStore() && url.includes(".blob.vercel-storage.com/") && url.includes(IMAGE_PREFIX)) {
      await del(url);
    } else if (!hasBlobStore() && url.startsWith("/uploads/")) {
      await fs.unlink(path.join(LOCAL_UPLOAD_DIR, path.basename(url)));
    }
  } catch (err) {
    console.error("Failed to delete image", url, err);
  }
}
