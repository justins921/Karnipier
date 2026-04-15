import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Classifieds — Docks & Lifts For Sale",
  description:
    "Browse docks, dock sections, and boat lifts for sale from Karni-Pier LLC dba Piers 2U in Oshkosh, Wisconsin. New and used equipment available.",
};

const activeListings = [
  {
    title: "New Vinyl Karni Sections",
    description:
      "Great to use to upgrade that old wood pier! No legs — just sections.",
    price: "$500 each",
    badge: "New",
  },
  {
    title: "2025 New Dock Sale",
    description:
      "Call for details and deals! SPECIAL now!! 25% OFF NEW DOCKS!!!",
    price: "Call for Quote",
    badge: "Sale",
  },
  {
    title: "Two Used/Like New 10-Section Complete Vinyl Karni-Piers",
    description:
      "FREE LOCAL DELIVERY AND INSTALL. Complete vinyl Karni-Pier systems in excellent condition.",
    price: "$7,500 each (Originally $12,500)",
    badge: "Used — Like New",
  },
  {
    title: "Used Vinyl Sections for Wood Pier Conversion",
    description: "All hardware, with legs. Perfect for upgrading your existing wood pier.",
    price: "$850 per section",
    badge: "Used",
  },
];

const soldItems = [
  "Used dock, ladder, bench",
  "3000# Aqua-Matic pontoon lift",
  "1000# Hewitt cantilever jet ski lift",
  "ShoreStation canopy frame",
  "ShoreStation vinyl boat cover",
  "ShoreStation lift tires/hubs",
];

export default function ClassifiedsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Classifieds</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Browse new and used docks, dock sections, boat lifts, and accessories.
            Call or email to inquire about any listing.
          </p>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Image
            src="https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f1a59f280cd_Website%20Photo%20copy%202%20smaller.jpg"
            alt="Dock equipment available for sale from Piers 2U"
            width={800}
            height={500}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Active Listings */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-8">Available Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeListings.map((listing) => (
              <div
                key={listing.title}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-semibold text-navy-900">{listing.title}</h3>
                  <span
                    className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
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
                <p className="text-gray-600 mb-4">{listing.description}</p>
                <p className="text-lg font-bold text-lake">{listing.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Listings */}
      <section className="py-12 bg-navy-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">
            Interested in a Listing?
          </h2>
          <p className="text-gray-600 mb-6">
            Call or email us to inquire about any item, schedule a viewing, or ask about
            delivery and installation options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:920-231-0841"
              className="inline-block bg-lake text-white font-semibold px-8 py-3 rounded-lg hover:bg-lake-dark transition-colors"
            >
              Call (920) 231-0841
            </a>
            <a
              href="mailto:info@karnipier.com"
              className="inline-block border-2 border-lake text-lake font-semibold px-8 py-3 rounded-lg hover:bg-lake hover:text-white transition-colors"
            >
              Email info@karnipier.com
            </a>
          </div>
        </div>
      </section>

      {/* Sold Items */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">Recently Sold</h2>
          <p className="text-gray-600 mb-8">
            These items have been sold. Check back regularly for new listings!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {soldItems.map((item) => (
              <div
                key={item}
                className="bg-gray-100 rounded-lg px-6 py-4 text-gray-500 line-through"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">
            Looking for a New Dock Instead?
          </h2>
          <p className="text-gray-600 mb-6">
            We build custom docks for any waterfront. Contact us for a free quote on a brand-new system.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-lake text-white font-semibold px-8 py-3 rounded-lg hover:bg-lake-dark transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
