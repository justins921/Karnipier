import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dock & Boat Lift Services",
  description:
    "Piers 2U offers stationary docks, floating docks, roll-in dock systems, boat lifts, and full installation services across Wisconsin. Aluminum framing, maintenance-free polymer.",
};

const dockTypes = [
  {
    title: "Stationary Docks",
    description:
      "Our permanent dock systems are engineered for durability. Built with aluminum framing and maintenance-free polymer decking, stationary docks provide a rock-solid platform for decades of enjoyment. Ideal for lakefront properties with consistent water levels.",
    features: [
      "Aluminum framing for long-lasting quality",
      "Maintenance-free polymer decking",
      "Custom configurations for any shoreline",
      "Built to withstand Wisconsin weather",
    ],
    image: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1fdc4af280c0_FREMONT-CAMPGROUND-FLOATING-DOCK-2012%20(1).jpeg",
    imageAlt: "Stationary dock system installed at a Wisconsin campground",
  },
  {
    title: "Floating Docks",
    description:
      "Floating sectional dock systems adapt to changing water levels, making them the perfect choice for Wisconsin lakes where shorelines shift with the season. Our floating docks are built with the same premium materials and expert craftsmanship as every Karni-Pier product.",
    features: [
      "Adjusts to fluctuating water levels",
      "Sectional design for flexible layouts",
      "Maintenance-free polymer construction",
      "Ideal for soft or uneven lake bottoms",
    ],
    image: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f05b8f280c9_MENOMENEE-PARK%20(1).jpeg",
    imageAlt: "Floating dock system at Menominee Park Wisconsin",
  },
  {
    title: "Roll-In Dock Systems",
    description:
      "Roll-in docks combine the stability of a permanent dock with the convenience of easy seasonal removal. Simply roll them in each spring and out each fall. Built with maintenance-free polymer in 4-foot by 10-foot sections, they're designed for quick setup.",
    features: [
      "Easy seasonal installation and removal",
      "Wheel-based system for effortless movement",
      "Maintenance-free polymer decking",
      "Available in multiple section sizes",
    ],
    image: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f2f38f280c4_MENOMENEE-PARK-4%20(1).jpeg",
    imageAlt: "Roll-in dock system ready for installation",
  },
  {
    title: "Boat Lifts",
    description:
      "Protect your investment with a quality boat lift. We carry lifts for pontoons, fishing boats, jet skis, and more. Our professional team handles the complete installation so your lift is set up safely and correctly.",
    features: [
      "Lifts for boats, pontoons, and jet skis",
      "Multiple weight capacities available",
      "Professional installation included",
      "Seasonal install and removal services",
    ],
    image: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f0d9af28070_karni-pier-for-sale.jpeg",
    imageAlt: "Boat lift installed on Wisconsin lake by Piers 2U",
  },
];

const additionalServices = [
  "Walkways",
  "Piers",
  "Rails & handrails",
  "Steps & stairs",
  "Benches",
  "Ladders",
  "Dock hardware & accessories",
  "Storm damage repairs",
  "Seasonal installation & removal",
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Beyond offering top quality products, we go the distance to provide excellent service.
            From installations and removals to repairs after a storm, Karni-Pier LLC dba Piers 2U!
            has professional service teams ready to service your waterfront equipment.
          </p>
        </div>
      </section>

      {/* Dock Types */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {dockTypes.map((dock, index) => (
              <div
                key={dock.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h2 className="text-3xl font-bold text-navy-900 mb-4">
                    {dock.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {dock.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {dock.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-gray-700">
                        <svg
                          className="w-5 h-5 text-lake flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-block bg-lake text-white font-semibold px-6 py-3 rounded-lg hover:bg-lake-dark transition-colors"
                  >
                    Get a Quote
                  </Link>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <Image
                    src={dock.image}
                    alt={dock.imageAlt}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Additional Services &amp; Accessories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We also install all walkways, piers, rails, steps, benches and ladders.
              If you want it done right, get Karni-Pier LLC dba Piers 2U! to do it.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {additionalServices.map((service) => (
              <div
                key={service}
                className="bg-white rounded-lg px-6 py-4 shadow-sm flex items-center gap-3"
              >
                <svg
                  className="w-5 h-5 text-lake flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-navy-800 font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact us today for a free quote. We&apos;ll design a dock system tailored to your waterfront.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-lake text-white font-semibold px-8 py-3 rounded-lg hover:bg-lake-dark transition-colors"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:920-231-0841"
              className="inline-block border-2 border-lake text-lake font-semibold px-8 py-3 rounded-lg hover:bg-lake hover:text-white transition-colors"
            >
              Call (920) 231-0841
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
