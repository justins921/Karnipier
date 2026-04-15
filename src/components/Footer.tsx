import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* CTA Band */}
      <div className="bg-lake">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Build Your Dream Dock?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Contact us today for a free, no-obligation quote. We handle every step of the installation process.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-lake font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Karni-Pier LLC dba Piers 2U!</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Full-service dock company proudly serving Wisconsin lake country since the 1950s.
              Family owned and operated.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>
                <a
                  href="tel:920-231-0841"
                  className="hover:text-white transition-colors"
                  aria-label="Call us at 920-231-0841"
                >
                  <span className="mr-2" aria-hidden="true">&#9742;</span>
                  (920) 231-0841
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@karnipier.com"
                  className="hover:text-white transition-colors"
                >
                  <span className="mr-2" aria-hidden="true">&#9993;</span>
                  info@karnipier.com
                </a>
              </p>
              <p>
                <span className="mr-2" aria-hidden="true">&#9993;</span>
                PO Box 2291, Oshkosh, WI 54903
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 text-sm">
                {[
                  { href: "/", label: "Home" },
                  { href: "/designs", label: "Designs" },
                  { href: "/services", label: "Services" },
                  { href: "/projects", label: "Projects" },
                  { href: "/about", label: "About" },
                  { href: "/classifieds", label: "Classifieds" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Hours & Service Area */}
          <div>
            <h3 className="text-lg font-bold mb-4">Hours &amp; Service Area</h3>
            <div className="text-sm text-gray-400 space-y-3">
              <p>
                <strong className="text-gray-300">Season:</strong><br />
                Open 24/7 March through November
              </p>
              <p>
                <strong className="text-gray-300">Off-Season:</strong><br />
                By appointment only
              </p>
              <p>
                <strong className="text-gray-300">Service Area:</strong><br />
                Fox Valley, Northeast Wisconsin, and expanding nationally
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Karni-Pier LLC dba Piers 2U! All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
