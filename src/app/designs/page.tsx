import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dock Designs — Decking Options & Custom Layouts",
  description:
    "Explore four decking options for your Karni-Pier dock: polymeric, cedar, treated wood, and more. Custom dock layouts available. Call for info and prices.",
};

const deckingOptions = [
  {
    title: "Option One — Polymeric Decking",
    description:
      "Our flagship maintenance-free polymeric decking in 4' x 10' sections. The premium choice for a dock that looks great year after year with zero upkeep.",
    image: "https://cdn.prod.website-files.com/62f11fa14e9a1f17e8f28013/62f11fa14e9a1f0816f2807d_Option%20One.png",
    imageAlt: "Option One polymeric decking for Karni-Pier dock",
    detailImage: "https://cdn.prod.website-files.com/62f11fa14e9a1f17e8f28013/62f11fa14e9a1f5d0ff2807e_1.png",
    detailImageAlt: "Close-up of polymeric dock decking material",
  },
  {
    title: "Option Two — Cedar Decking",
    description:
      "Beautiful natural cedar decking in 4' x 8' sections. Cedar offers a classic look and natural resistance to decay.",
    image: "https://cdn.prod.website-files.com/62f11fa14e9a1f17e8f28013/62f11fa14e9a1f0735f2807f_option%20two.png",
    imageAlt: "Option Two cedar decking for Karni-Pier dock",
    detailImage: "https://cdn.prod.website-files.com/62f11fa14e9a1f17e8f28013/62f11fa14e9a1f3575f28080_2.png",
    detailImageAlt: "Close-up of cedar dock decking material",
  },
  {
    title: "Option Three — Treated Wood Decking",
    description:
      "Pressure-treated wood in 4' x 8' sections. An economical option that provides reliable durability.",
    image: "https://cdn.prod.website-files.com/62f11fa14e9a1f17e8f28013/62f11fa14e9a1f5d3df28084_option%20three.png",
    imageAlt: "Option Three treated wood decking for Karni-Pier dock",
    detailImage: "https://cdn.prod.website-files.com/62f11fa14e9a1f17e8f28013/62f11fa14e9a1fc11df28085_3.png",
    detailImageAlt: "Close-up of treated wood dock decking material",
  },
  {
    title: "Option Four — Premium Composite",
    description:
      "Premium composite decking for superior performance and aesthetics. A modern, low-maintenance choice.",
    image: "https://cdn.prod.website-files.com/62f11fa14e9a1f17e8f28013/62f11fa14e9a1f3166f28087_option%20four.png",
    imageAlt: "Option Four premium composite decking for Karni-Pier dock",
    detailImage: "https://cdn.prod.website-files.com/62f11fa14e9a1f17e8f28013/62f11fa14e9a1f829cf28086_4.png",
    detailImageAlt: "Close-up of premium composite dock decking material",
  },
];

export default function DesignsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Dock Designs</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Introducing four decking options for your new Karni-Pier. Don&apos;t see what would
            work for you? Custom dock layouts are always an option!
          </p>
        </div>
      </section>

      {/* Decking Options */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {deckingOptions.map((option, index) => (
              <div
                key={option.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">{option.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{option.description}</p>
                  <Link
                    href="/contact"
                    className="inline-block bg-lake text-white font-semibold px-6 py-3 rounded-lg hover:bg-lake-dark transition-colors"
                  >
                    Get a Quote for This Option
                  </Link>
                </div>
                <div className={`grid grid-cols-2 gap-4 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Image
                    src={option.image}
                    alt={option.imageAlt}
                    width={400}
                    height={300}
                    className="rounded-lg w-full h-auto"
                  />
                  <Image
                    src={option.detailImage}
                    alt={option.detailImageAlt}
                    width={400}
                    height={300}
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ramps Section */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-4">Ramps</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Complete your dock with a custom ramp for safe, easy access from shore to dock.
                Available in all decking materials to match your pier system.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-lake text-white font-semibold px-6 py-3 rounded-lg hover:bg-lake-dark transition-colors"
              >
                Ask About Ramps
              </Link>
            </div>
            <div>
              <Image
                src="https://cdn.prod.website-files.com/62f11fa14e9a1f17e8f28013/62f11fa14e9a1ffcecf28088_ramps.png"
                alt="Dock ramp designs and configurations"
                width={600}
                height={400}
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Note */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-navy-800 font-medium italic">
            &ldquo;Although the options have changed, the quality is still in the 70-year
            tradition of Karni-Pier!&rdquo;
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">
            Need a Custom Layout?
          </h2>
          <p className="text-gray-600 mb-6">
            Custom dock layouts are always an option. Call for info and prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:920-231-0841"
              className="inline-block bg-lake text-white font-semibold px-8 py-3 rounded-lg hover:bg-lake-dark transition-colors"
            >
              Call (920) 231-0841
            </a>
            <Link
              href="/contact"
              className="inline-block border-2 border-lake text-lake font-semibold px-8 py-3 rounded-lg hover:bg-lake hover:text-white transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
