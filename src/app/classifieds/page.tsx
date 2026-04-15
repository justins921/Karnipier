import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ClassifiedsListings from "@/components/ClassifiedsListings";

export const metadata: Metadata = {
  title: "Classifieds — Docks & Lifts For Sale",
  description:
    "Browse docks, dock sections, and boat lifts for sale from Karni-Pier LLC dba Piers 2U in Oshkosh, Wisconsin. New and used equipment available.",
};

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

      {/* Dynamic Listings (reads from localStorage when available) */}
      <ClassifiedsListings />

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
