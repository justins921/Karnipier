import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects — Dock Installation Gallery",
  description:
    "Browse photos of custom dock installations by Piers 2U across Wisconsin lakes. Stationary docks, floating docks, roll-in systems, and boat lifts.",
};

const projectImages = [
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f3124f280cc_DEMPSEY-INSTALLED-2%20(1).jpeg",
    alt: "Dempsey dock installation by Piers 2U",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1fe571f280cb_6-28-12-TO-6-30-12-004%20(1).jpeg",
    alt: "Custom dock installation on Wisconsin lake - summer 2012",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1ff0bcf280ca_9-6-12-TO-9-8-12-001%20(1).jpeg",
    alt: "Lakefront dock system installed September 2012",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f05b8f280c9_MENOMENEE-PARK%20(1).jpeg",
    alt: "Dock installation at Menominee Park Wisconsin",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1fdae8f280c8_ANDRASCO-PREMIER-3%20(1).jpeg",
    alt: "Andrasco premier dock system installation",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f94d0f280c7_otterrdwaupaca7-162012004%20(1).jpeg",
    alt: "Dock installation on Otter Road Waupaca Wisconsin",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f0bf3f280c6_otterrdwaupaca7-162012001%20(1).jpeg",
    alt: "Waterfront dock system in Waupaca Wisconsin",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1fdc0cf280c5_TEAL-PREMIER-5%20(1).jpeg",
    alt: "Teal premier dock system by Piers 2U",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f2f38f280c4_MENOMENEE-PARK-4%20(1).jpeg",
    alt: "Menominee Park dock installation - wide view",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f5061f280c3_PRE-TODD-BRELAGE%20(1).jpeg",
    alt: "Todd Brelage dock installation project",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1ffc8ef280c2_OLSEN-INSTALLED%20(1).jpeg",
    alt: "Olsen dock installation completed by Piers 2U",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f6e38f280c1_7-26-12-TO-7-28-12-015-e1576166081191%20(1).jpeg",
    alt: "Lakefront dock project completed July 2012",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1fdc4af280c0_FREMONT-CAMPGROUND-FLOATING-DOCK-2012%20(1).jpeg",
    alt: "Fremont campground floating dock installation 2012",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1fb165f280bf_DUMKEART-INSTALLED%20(1).jpeg",
    alt: "Dumkeart dock installation on Wisconsin lake",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f8980f280b7_CAPPALLANI.KELLY-NEW-DOCK-7-2012%20(1).jpg",
    alt: "Cappallani Kelly new dock installation July 2012",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f417af280a6_5-27-11-TO-6-1-11-001-e1576166279941%20(1).jpeg",
    alt: "Dock project completed May-June 2011",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f33f4f28095_otterrdwaupaca7-162012003%20(1).jpeg",
    alt: "Dock system on Otter Road lake Waupaca",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1fda5ef28083_9-6-12-TO-9-8-12-003%20(1).jpeg",
    alt: "Completed dock installation September 2012",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f7207f28044_my-phone-4-16-13-035%20(1).jpeg",
    alt: "Dock installation photo April 2013",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f9467f28043_2013-INSTALLED-STORED-005%20(1).jpeg",
    alt: "Dock installation and storage setup 2013",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f06dff28042_OLSENS-PREMIER-3.jpeg",
    alt: "Olsen premier dock system - side view",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f59eef28041_in-out-docks-10-21-13-001.jpeg",
    alt: "Seasonal dock removal service October 2013",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f7e86f28040_OLSENS-PREMIER-5.jpeg",
    alt: "Olsen premier dock system - full view",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f7207f28044_my-phone-4-16-13-035%20(1).jpeg",
    alt: "Waterfront dock installation Wisconsin spring 2013",
  },
  {
    src: "https://cdn.prod.website-files.com/62f11fa14e9a1f9b03f2803b/62f11fa14e9a1f487ef28057_WEEKS-INSTALLED-2%20(1).jpeg",
    alt: "Weeks dock installation completed by Piers 2U",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Projects</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Take a look at some of the docks we&apos;ve installed.
            Every project is custom designed, professionally built, and owner-installed
            by the Piers 2U team.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectImages.map((img, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  loading={index < 6 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">
            Want a Dock Like These?
          </h2>
          <p className="text-gray-600 mb-6">
            Every project starts with a free consultation. Tell us about your waterfront and
            we&apos;ll design the perfect dock system for you.
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
