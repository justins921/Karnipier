import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us — Our Story Since the 1950s",
  description:
    "Learn about Karni-Pier LLC dba Piers 2U — a family owned dock company in Oshkosh, Wisconsin since the 1950s. Over 70 years of quality dock building.",
};

const customerValues = [
  "Our Customer is not only the most important person in our business, they are our business.",
  "Our Customer is not dependent on us, but we are dependent on them.",
  "Our Customer is not an interruption in our busy day, but is the purpose of our business day.",
  "Our Customer is our most precious asset and lifeblood of our business. We are here to service all their waterfront equipment needs.",
  "Our Customer is a real person that will be treated with honesty, courtesy and respect.",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About Karni-Pier LLC dba Piers 2U!
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            A family dock company proudly serving Wisconsin lake country for over 70 years.
          </p>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-6">Our History</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Karni-Pier LLC dba Piers 2U! is your local Karni-Pier dealer. The Karni-Pier
                  has been providing service and support to its owners for over 70 years in
                  Oshkosh, Wisconsin.
                </p>
                <p>
                  When a local family man and inventor, Sylvester Karst, and a local businessman
                  Rudy Nigl teamed up, the first KARNI-PIER was produced.
                </p>
                <p>
                  They remained partners and continued Karni-Pier as a part-time business for
                  over 20 years.
                </p>
                <p>
                  It went through a few owner changes in the late 70s and early 80s and in 1985
                  became a full-time business.
                </p>
                <p>
                  Through all of these changes, ownership remained local and the Karni-Pier has
                  established a reputation for quality and service in the Fox Valley and Northeast
                  Wisconsin areas.
                </p>
                <p>
                  Now Karni-Pier LLC dba Piers 2U! carries on the Karni-Pier tradition and is
                  moving it into a new direction to offer our piers nationally.
                </p>
              </div>
            </div>
            <div>
              <Image
                src="https://cdn.prod.website-files.com/62f11fa14e9a1f17e8f28013/62f11fa14e9a1f8c65f28066_4b-New-Logo-with-KARNI-PIER-LLC-plus-dba-PIERS-2-U-300x178.jpeg"
                alt="Karni-Pier LLC dba Piers 2U company logo"
                width={300}
                height={178}
                className="mx-auto"
              />
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="bg-navy-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-navy-900">70+</p>
                  <p className="text-sm text-gray-600">Years</p>
                </div>
                <div className="bg-navy-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-navy-900">Local</p>
                  <p className="text-sm text-gray-600">Owned</p>
                </div>
                <div className="bg-navy-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-navy-900">Family</p>
                  <p className="text-sm text-gray-600">Business</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Our Mission</h2>
          <div className="bg-white rounded-lg p-8 sm:p-10 shadow-sm space-y-4 text-gray-600 leading-relaxed">
            <p>
              Karni-Pier LLC dba Piers 2U! totally dedicates all employees and resources to
              provide the highest quality products with exceptional customer service, while
              meeting, or exceeding, all customers&apos; expectations and needs.
            </p>
            <p>
              Karni-Pier LLC dba Piers 2U! strives to establish good working relationships with
              our customers and works even harder to maintain these relationships for the long
              term.
            </p>
            <p>Every customer relationship is based on respect and mutual trust.</p>
            <p>
              Karni-Pier LLC dba Piers 2U! provides personalized and cost efficient solutions for
              all of our customers&apos; by meeting and exceeding their expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Philosophy */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
            What Is a Karni-Pier LLC dba Piers 2U! Customer?
          </h2>
          <div className="space-y-4">
            {customerValues.map((value, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-navy-50 rounded-lg p-6"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-lake text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-navy-900 text-white rounded-lg p-8 text-center">
            <p className="text-lg leading-relaxed">
              Today, Karni-Pier LLC dba Piers 2U! offers a full line of quality products and
              accessories to meet every waterfront need.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">
            Experience the Karni-Pier Difference
          </h2>
          <p className="text-gray-600 mb-6">
            Join the family of satisfied customers who trust Piers 2U for their waterfront needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-lake text-white font-semibold px-8 py-3 rounded-lg hover:bg-lake-dark transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/projects"
              className="inline-block border-2 border-lake text-lake font-semibold px-8 py-3 rounded-lg hover:bg-lake hover:text-white transition-colors"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
