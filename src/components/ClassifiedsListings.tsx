import Image from "next/image";
import type { ClassifiedListing } from "@/lib/classifieds";

function ListingCard({ listing }: { listing: ClassifiedListing }) {
  const sold = listing.status === "sold";
  return (
    <article
      className={`border border-gray-200 rounded-lg overflow-hidden flex flex-col ${
        sold ? "bg-gray-50" : "bg-white hover:shadow-md transition-shadow"
      }`}
    >
      <div className={`relative bg-navy-50 ${listing.imageUrl ? "aspect-[4/3]" : "h-24"}`}>
        {listing.imageUrl ? (
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover ${sold ? "grayscale opacity-70" : ""}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-navy-300">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V9.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        )}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
            sold ? "bg-gray-700 text-white" : "bg-lake text-white"
          }`}
        >
          {sold ? "Sold" : "For Sale"}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className={`text-lg font-semibold mb-2 ${sold ? "text-gray-500" : "text-navy-900"}`}>
          {listing.title}
        </h3>
        {listing.description && (
          <p className={`mb-4 whitespace-pre-line ${sold ? "text-gray-400" : "text-gray-600"}`}>
            {listing.description}
          </p>
        )}
        {listing.price && (
          <p className={`mt-auto text-lg font-bold ${sold ? "text-gray-400" : "text-lake"}`}>
            {listing.price}
          </p>
        )}
      </div>
    </article>
  );
}

export default function ClassifiedsListings({ listings }: { listings: ClassifiedListing[] }) {
  const available = listings.filter((l) => l.status === "available");
  const sold = listings.filter((l) => l.status === "sold");

  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-8">Available Now</h2>
          {available.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
              No listings available right now. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {available.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      </section>

      {sold.length > 0 && (
        <section className="pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-2">Recently Sold</h2>
            <p className="text-gray-600 mb-8">
              These items are no longer available. Check back regularly for new listings!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sold.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
