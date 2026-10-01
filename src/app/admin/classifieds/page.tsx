"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { ClassifiedListing, ListingInput } from "@/lib/classifieds";

const emptyListing: ListingInput = {
  title: "",
  description: "",
  price: "Call for quote",
  status: "available",
  imageUrl: "",
};

const inputClass =
  "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lake focus:border-transparent outline-none";

// Shrink phone photos before upload so they stay under the 4 MB request limit.
async function resizeImage(file: File, maxSize = 1600): Promise<Blob> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b ?? file), "image/jpeg", 0.85)
  );
}

export default function AdminClassifiedsPage() {
  const router = useRouter();
  const [listings, setListings] = useState<ClassifiedListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null); // "new" for a new listing
  const [form, setForm] = useState<ListingInput>(emptyListing);
  const [uploading, setUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const api = useCallback(
    async (url: string, init?: RequestInit) => {
      const res = await fetch(url, init);
      if (res.status === 401) {
        router.replace("/admin");
        throw new Error("Your session expired. Please sign in again.");
      }
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      return body;
    },
    [router]
  );

  const loadListings = useCallback(async () => {
    try {
      setListings(await api("/api/admin/classifieds", { cache: "no-store" }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    loadListings();
  }, [loadListings]);

  async function run(action: () => Promise<unknown>) {
    setBusy(true);
    setError("");
    try {
      await action();
      await loadListings();
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  function startAdd() {
    setForm(emptyListing);
    setEditingId("new");
  }

  function startEdit(l: ClassifiedListing) {
    setForm({
      title: l.title,
      description: l.description,
      price: l.price,
      status: l.status,
      imageUrl: l.imageUrl,
    });
    setEditingId(l.id);
  }

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const data = new FormData();
      data.append("file", await resizeImage(file), file.name.replace(/\.\w+$/, "") + ".jpg");
      const { url } = await api("/api/admin/upload", { method: "POST", body: data });
      setForm((f) => ({ ...f, imageUrl: url }));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    const isNew = editingId === "new";
    const ok = await run(() =>
      api(isNew ? "/api/admin/classifieds" : `/api/admin/classifieds/${editingId}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
    );
    if (ok) setEditingId(null);
  }

  function setStatus(l: ClassifiedListing, status: ClassifiedListing["status"]) {
    run(() =>
      api(`/api/admin/classifieds/${l.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...l,
          status,
          price: status === "sold" ? "SOLD" : l.price === "SOLD" ? "Call for quote" : l.price,
        }),
      })
    );
  }

  function move(id: string, direction: "up" | "down") {
    run(() =>
      api(`/api/admin/classifieds/${id}/move`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction }),
      })
    );
  }

  function handleDelete(id: string) {
    setConfirmDelete(null);
    run(() => api(`/api/admin/classifieds/${id}`, { method: "DELETE" }));
  }

  const btn = "px-3 py-2 text-xs font-medium rounded-md transition-colors disabled:opacity-50";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Manage Classifieds</h1>
          <p className="text-gray-600 text-sm mt-1">
            Changes show up on the{" "}
            <a href="/classifieds" target="_blank" className="text-lake underline">
              Classifieds page
            </a>{" "}
            right away.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={startAdd}
            className="bg-lake text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-lake-dark transition-colors text-sm"
          >
            + Add Listing
          </button>
          <button
            onClick={handleLogout}
            className="border border-gray-300 text-gray-700 font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Log Out
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Add / Edit form */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6"
          >
            <h2 className="text-xl font-bold text-navy-900 mb-4">
              {editingId === "new" ? "Add New Listing" : "Edit Listing"}
            </h2>
            <div className="space-y-4">
              <div>
                <span className="block text-sm font-medium text-navy-800 mb-1">Photo</span>
                {form.imageUrl ? (
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={form.imageUrl} alt="" className="w-full max-h-56 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, imageUrl: "" })}
                      className="absolute top-2 right-2 bg-white/90 text-red-600 text-xs font-medium px-3 py-1.5 rounded-md shadow"
                    >
                      Remove photo
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg py-8 cursor-pointer hover:border-lake text-sm text-gray-500">
                    {uploading ? "Uploading..." : "Tap to add a photo"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      disabled={uploading}
                      className="sr-only"
                    />
                  </label>
                )}
              </div>
              <div>
                <label htmlFor="edit-title" className="block text-sm font-medium text-navy-800 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="edit-title"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputClass}
                  placeholder="e.g. USED 3000# Aqua-Matic Pontoon Lift"
                />
              </div>
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-navy-800 mb-1">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  className={`${inputClass} resize-vertical`}
                  placeholder="Condition, size, what's included..."
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-price" className="block text-sm font-medium text-navy-800 mb-1">
                    Price
                  </label>
                  <input
                    id="edit-price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className={inputClass}
                    placeholder='e.g. $2,850 or "Call for quote"'
                  />
                </div>
                <div>
                  <label htmlFor="edit-status" className="block text-sm font-medium text-navy-800 mb-1">
                    Status
                  </label>
                  <select
                    id="edit-status"
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value as ListingInput["status"] })
                    }
                    className={`${inputClass} bg-white`}
                  >
                    <option value="available">For Sale</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={!form.title.trim() || busy || uploading}
                className="flex-1 bg-lake text-white font-semibold py-2.5 rounded-lg hover:bg-lake-dark transition-colors disabled:opacity-50"
              >
                {busy ? "Saving..." : editingId === "new" ? "Add Listing" : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="flex-1 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading listings...</p>
      ) : listings.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
          No listings yet. Click &quot;+ Add Listing&quot; to create one.
        </div>
      ) : (
        <ul className="space-y-3">
          {listings.map((l, i) => {
            const sold = l.status === "sold";
            return (
              <li
                key={l.id}
                className={`border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4 ${
                  sold ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-16 h-16 flex-shrink-0 rounded-md bg-navy-50 overflow-hidden">
                    {l.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={l.imageUrl} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${
                          sold ? "bg-gray-200 text-gray-600" : "bg-green-100 text-green-700"
                        }`}
                      >
                        {sold ? "Sold" : "For Sale"}
                      </span>
                      {l.price && <span className="text-lake text-sm font-medium truncate">{l.price}</span>}
                    </div>
                    <h3 className={`font-semibold truncate ${sold ? "text-gray-500" : "text-navy-900"}`}>
                      {l.title}
                    </h3>
                    {l.description && <p className="text-gray-600 text-sm truncate">{l.description}</p>}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 flex-shrink-0">
                  <button
                    onClick={() => move(l.id, "up")}
                    disabled={busy || i === 0}
                    className={`${btn} border border-gray-300 hover:bg-gray-50`}
                    aria-label="Move up"
                  >
                    &uarr;
                  </button>
                  <button
                    onClick={() => move(l.id, "down")}
                    disabled={busy || i === listings.length - 1}
                    className={`${btn} border border-gray-300 hover:bg-gray-50`}
                    aria-label="Move down"
                  >
                    &darr;
                  </button>
                  <button
                    onClick={() => setStatus(l, sold ? "available" : "sold")}
                    disabled={busy}
                    className={`${btn} border border-gray-300 hover:bg-gray-50`}
                  >
                    {sold ? "Mark For Sale" : "Mark Sold"}
                  </button>
                  <button
                    onClick={() => startEdit(l)}
                    disabled={busy}
                    className={`${btn} text-lake border border-lake hover:bg-lake hover:text-white`}
                  >
                    Edit
                  </button>
                  {confirmDelete === l.id ? (
                    <>
                      <button
                        onClick={() => handleDelete(l.id)}
                        className={`${btn} bg-red-600 text-white hover:bg-red-700`}
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className={`${btn} border border-gray-300 hover:bg-gray-50`}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(l.id)}
                      disabled={busy}
                      className={`${btn} text-red-600 border border-red-300 hover:bg-red-50`}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
