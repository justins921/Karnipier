"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout } from "@/lib/auth";
import {
  getListings,
  saveListing,
  deleteListing,
  type ClassifiedListing,
} from "@/lib/classifieds";

type BadgeType = ClassifiedListing["badge"];
const badgeOptions: BadgeType[] = ["New", "Sale", "Used", "Used — Like New"];

const emptyListing: Omit<ClassifiedListing, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  description: "",
  price: "",
  badge: "New",
  sold: false,
};

export default function AdminClassifiedsPage() {
  const router = useRouter();
  const [listings, setListings] = useState<ClassifiedListing[]>([]);
  const [editing, setEditing] = useState<ClassifiedListing | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const loadListings = useCallback(() => {
    setListings(getListings());
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/admin");
      return;
    }
    loadListings();
  }, [router, loadListings]);

  function handleLogout() {
    logout();
    router.push("/admin");
  }

  function handleAdd() {
    setEditing({
      ...emptyListing,
      id: "",
      createdAt: "",
      updatedAt: "",
    });
    setIsNew(true);
  }

  function handleEdit(listing: ClassifiedListing) {
    setEditing({ ...listing });
    setIsNew(false);
  }

  function handleSave() {
    if (!editing) return;
    if (!editing.title.trim()) return;
    saveListing(editing);
    setEditing(null);
    setIsNew(false);
    loadListings();
  }

  function handleDelete(id: string) {
    deleteListing(id);
    setConfirmDelete(null);
    loadListings();
  }

  function handleToggleSold(listing: ClassifiedListing) {
    saveListing({ ...listing, sold: !listing.sold });
    loadListings();
  }

  const activeListings = listings.filter((l) => !l.sold);
  const soldListings = listings.filter((l) => l.sold);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">
            Manage Classifieds
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Add, edit, or remove classified listings.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleAdd}
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

      {/* Edit / Add Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-navy-900 mb-4">
                {isNew ? "Add New Listing" : "Edit Listing"}
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="edit-title"
                    className="block text-sm font-medium text-navy-800 mb-1"
                  >
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="edit-title"
                    value={editing.title}
                    onChange={(e) =>
                      setEditing({ ...editing, title: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lake focus:border-transparent outline-none"
                    placeholder="e.g. New Vinyl Karni Sections"
                  />
                </div>
                <div>
                  <label
                    htmlFor="edit-description"
                    className="block text-sm font-medium text-navy-800 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="edit-description"
                    value={editing.description}
                    onChange={(e) =>
                      setEditing({ ...editing, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lake focus:border-transparent outline-none resize-vertical"
                    placeholder="Describe the item..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="edit-price"
                      className="block text-sm font-medium text-navy-800 mb-1"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      id="edit-price"
                      value={editing.price}
                      onChange={(e) =>
                        setEditing({ ...editing, price: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lake focus:border-transparent outline-none"
                      placeholder="e.g. $500 each"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="edit-badge"
                      className="block text-sm font-medium text-navy-800 mb-1"
                    >
                      Badge
                    </label>
                    <select
                      id="edit-badge"
                      value={editing.badge}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          badge: e.target.value as BadgeType,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lake focus:border-transparent outline-none bg-white"
                    >
                      {badgeOptions.map((badge) => (
                        <option key={badge} value={badge}>
                          {badge}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="edit-sold"
                    checked={editing.sold}
                    onChange={(e) =>
                      setEditing({ ...editing, sold: e.target.checked })
                    }
                    className="w-4 h-4 text-lake rounded border-gray-300 focus:ring-lake"
                  />
                  <label
                    htmlFor="edit-sold"
                    className="text-sm font-medium text-navy-800"
                  >
                    Mark as sold
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={handleSave}
                  disabled={!editing.title.trim()}
                  className="flex-1 bg-lake text-white font-semibold py-2.5 rounded-lg hover:bg-lake-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isNew ? "Add Listing" : "Save Changes"}
                </button>
                <button
                  onClick={() => {
                    setEditing(null);
                    setIsNew(false);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Listings */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-navy-900 mb-4">
          Active Listings ({activeListings.length})
        </h2>
        {activeListings.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
            No active listings. Click &quot;+ Add Listing&quot; to create one.
          </div>
        ) : (
          <div className="space-y-3">
            {activeListings.map((listing) => (
              <div
                key={listing.id}
                className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-navy-900 truncate">
                      {listing.title}
                    </h3>
                    <span
                      className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        listing.badge === "Sale"
                          ? "bg-red-100 text-red-700"
                          : listing.badge === "New"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {listing.badge}
                    </span>
                  </div>
                  {listing.description && (
                    <p className="text-gray-600 text-sm truncate">
                      {listing.description}
                    </p>
                  )}
                  {listing.price && (
                    <p className="text-lake font-medium text-sm mt-1">
                      {listing.price}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleToggleSold(listing)}
                    className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Mark Sold
                  </button>
                  <button
                    onClick={() => handleEdit(listing)}
                    className="px-3 py-1.5 text-xs font-medium text-lake border border-lake rounded-md hover:bg-lake hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                  {confirmDelete === listing.id ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(listing.id)}
                      className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sold Listings */}
      <section>
        <h2 className="text-lg font-bold text-navy-900 mb-4">
          Sold Items ({soldListings.length})
        </h2>
        {soldListings.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
            No sold items.
          </div>
        ) : (
          <div className="space-y-3">
            {soldListings.map((listing) => (
              <div
                key={listing.id}
                className="border border-gray-200 bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-500 line-through truncate">
                    {listing.title}
                  </h3>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleToggleSold(listing)}
                    className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md hover:bg-white transition-colors"
                  >
                    Mark Available
                  </button>
                  <button
                    onClick={() => handleEdit(listing)}
                    className="px-3 py-1.5 text-xs font-medium text-lake border border-lake rounded-md hover:bg-lake hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                  {confirmDelete === listing.id ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(listing.id)}
                      className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
