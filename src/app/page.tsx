import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Piers 2U | Custom Dock Builder in Wisconsin — Since the 1950s",
  description:
    "Karni-Pier LLC dba Piers 2U builds custom stationary docks, floating docks, roll-in dock systems, and boat lifts across Wisconsin. Family owned since the 1950s. Get a free quote.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Karni-Pier LLC dba Piers 2U!",
  description:
    "Full-service custom dock builder in Wisconsin. Stationary docks, floating docks, roll-in dock systems, and boat lifts. Family owned since the 1950s.",
  url: "https://www.pierstoyou.com",
  telephone: "+1-920-231-0841",
  email: "info@karnipier.com",
  address: {
    "@type": "PostalAddress",
    postOfficeBoxNumber: "2291",
    addressLocality: "Oshkosh",
    addressRegion: "WI",
    postalCode: "54903",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "State",
      name: "Wisconsin",
    },
    {
      "@type": "GeoCircle",
      name: "Fox Valley and Northeast Wisconsin",
    },
  ],
  foundingDate: "1950",
  priceRange: "$$",
  image:
    "https://cdn.prod.website-files.com/62f11fa14e9a1f17e8f28013/62f11fa14e9a1f8c65f28066_4b-New-Logo-with-KARNI-PIER-LLC-plus-dba-PIERS-2-U-300x178.jpeg",
  sameAs: [],
};

const services = [
  {
    title: "Stationary Docks",
    description:
      "Permanent dock systems built with aluminum framing and maintenance-free polymer decking for decades of trouble-free use.",
    href: "/services",
    // Anchor/foundation icon
    icon: "M12 3v18m-6-3h12M9 3h6M7.5 21a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm12 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  },
  {
    title: "Floating Docks",
    description:
      "Floating sectional dock systems that adapt to changing water levels — ideal for Wisconsin lakes with fluctuating shorelines.",
    href: "/services",
    // Water/waves icon
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
  },
  {
    title: "Roll-In Dock Systems",
    description:
      "Easy seasonal install and removal with our roll-in dock systems. Maintenance-free polymer in a variety of configurations.",
    href: "/services",
    // Arrows/movement icon
    icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
  },
  {
    title: "Boat Lifts",
    description:
      "Protect your watercraft with quality boat lifts sized for pontoons, fishing boats, jet skis, and more.",
    href: "/services",
    // Arrow-up/lift icon
    icon: "M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75",
  },
];

const trustSignals = [
  { stat: "70+", label: "Years in Business" },
  { stat: "100%", label: "Owner-Installed" },
  { stat: "Local", label: "Family Owned" },
];

const faqs = [
  {
    question: "How much does a dock cost?",
    answer:
      "Dock pricing depends on the type of system (stationary, floating, or roll-in), the size and layout you need, and any accessories like benches, ladders, or rails. Contact us for a free, no-obligation quote tailored to your waterfront.",
  },
  {
    question: "What type of dock is best for my lake?",
    answer:
      "The best dock depends on your shoreline, water depth, and how you use your waterfront. Stationary docks are great for stable shorelines, floating docks work well where water levels change, and roll-in docks offer easy seasonal removal. We'll help you choose the right fit.",
  },
  {
    question: "Do you remove and install docks seasonally?",
    answer:
      "Yes! We offer full seasonal installation and removal services. Our team handles everything so your dock is in the water when you need it and safely stored when you don't.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We're based in Oshkosh, Wisconsin and serve the Fox Valley, Northeast Wisconsin, and surrounding lake country. We're also expanding to serve customers nationally.",
  },
  {
    question: "What materials do you use?",
    answer:
      "We use aluminum framing for long-lasting quality and maintenance-free polymer decking. Our materials are built to withstand Wisconsin weather year after year.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-navy-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-lake-dark opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
              Need a Custom Built Dock?
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-4 leading-relaxed">
              Karni-Pier LLC dba Piers 2U! has been a full-service dock company since the 1950s.
              We take great pride in providing you with the best quality products.
            </p>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              We personally complete every step of the installation process to ensure it meets our standards.
              Let us build your new dock for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block bg-lake text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-lake-dark transition-colors text-center"
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:920-231-0841"
                className="inline-block border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-colors text-center"
              >
                Call (920) 231-0841
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="bg-navy-800" aria-label="Trust signals">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {trustSignals.map((item) => (
              <div key={item.label}>
                <p className="text-3xl font-bold text-white">{item.stat}</p>
                <p className="text-gray-400 text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Intro */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
                Wisconsin&apos;s Trusted Dock Builder Since the 1950s
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We have a complete line of stationary and floating dock hardware, dock systems, and boat lifts.
                Our hardware and framing is all aluminum for long-lasting quality.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We provide you with creative design concepts to build your own dock systems.
                We have floating sectional, permanent, as well as roll-in dock systems in maintenance-free polymer.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our assortment of parts can be utilized for almost any configuration.
                If you want it done right, get Karni-Pier LLC dba Piers 2U! to do it.
              </p>
              <Link
                href="/about"
                className="text-lake font-semibold hover:text-lake-dark transition-colors"
              >
                Learn more about our story &rarr;
              </Link>
            </div>
            <div className="relative">
              <Image
                src="https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f3124f280cc_DEMPSEY-INSTALLED-2%20(1).jpeg"
                alt="Custom dock installation by Piers 2U on a Wisconsin lake"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Our Dock &amp; Lift Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From custom dock design to full installation, we offer everything you need for your waterfront.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-lake/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-lake"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={service.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2 group-hover:text-lake transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-block bg-lake text-white font-semibold px-6 py-3 rounded-lg hover:bg-lake-dark transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Recent Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take a look at some of the docks we&apos;ve installed across Wisconsin.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1fe571f280cb_6-28-12-TO-6-30-12-004%20(1).jpeg",
                alt: "Custom dock installation on Wisconsin lake",
              },
              {
                src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1fdae8f280c8_ANDRASCO-PREMIER-3%20(1).jpeg",
                alt: "Premier dock system installed by Piers 2U",
              },
              {
                src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1fdc0cf280c5_TEAL-PREMIER-5%20(1).jpeg",
                alt: "Teal premier dock installed on waterfront property",
              },
            ].map((img) => (
              <Image
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="rounded-lg shadow-sm w-full h-64 object-cover"
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/projects"
              className="inline-block border-2 border-lake text-lake font-semibold px-6 py-3 rounded-lg hover:bg-lake hover:text-white transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Why Choose Piers 2U?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "In Business Since the 1950s",
                text: "Over 70 years of dock building expertise. The Karni-Pier has established a reputation for quality and service in the Fox Valley and Northeast Wisconsin.",
              },
              {
                title: "We Handle Every Step",
                text: "We personally complete every step of the installation process to ensure it meets our standards. From design to final installation, you're in expert hands.",
              },
              {
                title: "Family Owned & Local",
                text: "Through all the years, ownership has remained local. We treat every customer with honesty, courtesy, and respect — because that's how family does business.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-8 shadow-sm text-center">
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Common questions about docks, lifts, and our services.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border border-gray-200 rounded-lg"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-navy-900 hover:text-lake transition-colors">
                  <span>{faq.question}</span>
                  <svg
                    className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
