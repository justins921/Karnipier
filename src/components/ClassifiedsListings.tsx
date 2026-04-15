"use client";

import { useState, useEffect } from "react";
import { getListings, type ClassifiedListing } from "@/lib/classifieds";

const fallbackActive = [
  {
    title: "New Vinyl Karni Sections",
    description: "Great to use to upgrade that old wood pier! No legs — just sections.",
    price: "$500 each",
    badge: "New" as const,
  },
  {
    title: "2025 New Dock Sale",
    description: "Call for details and deals! SPECIAL now!! 25% OFF NEW DOCKS!!!",
    price: "Call for Quote",
    badge: "Sale" as const,
  },
  {
    title: "Two Used/Like New 10-Section Complete Vinyl Karni-Piers",
    description: "FREE LOCAL DELIVERY AND INSTALL. Complete vinyl Karni-Pier systems in excellent condition.",
    price: "$7,500 each (Originally $12,500)",
    badge: "Used — Like New" as const,
  },
  {
    title: "Used Vinyl Sections for Wood Pier Conversion",
    description: "All hardware, with legs. Perfect for upgrading your existing wood pier.",
    price: "$850 per section",
    badge: "Used" as const,
  },
];

const fallbackSold = [
  "Used dock, ladder, bench",
  "3000# Aqua-Matic pontoon lift",
  "1000# Hewitt cantilever jet ski lift",
  "ShoreStation canopy frame",
  "ShoreStation vinyl boat cover",
  "ShoreStation lift tires/hubs",
];

function BadgeLabel({ badge }: { badge: string }) {
  const colors =
    badge === "Sale"
      ? "bg-red-100 text-red-700"
      : badge === "New"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700";

  return (
    <span className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${colors}`}>
      {badge}
    </span>
  );
}

export default function ClassifiedsListings() {
  const [listings, setListings] = useState<ClassifiedListing[] | null>(null);

  useEffect(() => {
    setListings(getListings());
  }, []);

  // Before hydration, show fallback static content
  if (listings === null) {
    return (
      <>
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-8">Available Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fallbackActive.map((listing) => (
                <div
                  key={listing.title}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-navy-900">{listing.title}</h3>
                    <BadgeLabel badge={listing.badge} />
                  </div>
                  <p className="text-gray-600 mb-4">{listing.description}</p>
                  <p className="text-lg font-bold text-lake">{listing.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">Recently Sold</h2>
            <p className="text-gray-600 mb-8">
              These items have been sold. Check back regularly for new listings!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fallbackSold.map((item) => (
                <div key={item} className="bg-gray-100 rounded-lg px-6 py-4 text-gray-500 line-through">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  const activeListings = listings.filter((l) => !l.sold);
  const soldListings = listings.filter((l) => l.sold);

  return (
    <>
      {/* Active Listings */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-8">Available Now</h2>
          {activeListings.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
              No listings available right now. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeListings.map((listing) => (
                <div
                  key={listing.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-navy-900">{listing.title}</h3>
                    <BadgeLabel badge={listing.badge} />
                  </div>
                  {listing.description && (
                    <p className="text-gray-600 mb-4">{listing.description}</p>
                  )}
                  {listing.price && (
                    <p className="text-lg font-bold text-lake">{listing.price}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sold Listings */}
      {soldListings.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">Recently Sold</h2>
            <p className="text-gray-600 mb-8">
              These items have been sold. Check back regularly for new listings!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {soldListings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-gray-100 rounded-lg px-6 py-4 text-gray-500 line-through"
                >
                  {listing.title}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
