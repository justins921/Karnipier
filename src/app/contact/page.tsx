import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Get a Free Dock Quote",
  description:
    "Contact Piers 2U for a free dock quote. Call (920) 231-0841 or fill out our form. Custom dock builder in Oshkosh, Wisconsin serving all of lake country.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Ready to start your dock project? Fill out the form below or give us a call.
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">
                Request a Free Quote
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-navy-50 rounded-lg p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-navy-900 mb-3">Call Us</h3>
                  <a
                    href="tel:920-231-0841"
                    className="text-2xl font-bold text-lake hover:text-lake-dark transition-colors"
                  >
                    (920) 231-0841
                  </a>
                  <p className="text-gray-600 text-sm mt-2">
                    Open 24/7 March through November, by appointment only off-season.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-navy-900 mb-3">Email Us</h3>
                  <a
                    href="mailto:info@karnipier.com"
                    className="text-lake font-medium hover:text-lake-dark transition-colors"
                  >
                    info@karnipier.com
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-navy-900 mb-3">Mailing Address</h3>
                  <address className="text-gray-600 not-italic">
                    Karni-Pier LLC dba Piers 2U!<br />
                    PO Box 2291<br />
                    Oshkosh, WI 54903
                  </address>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-navy-900 mb-3">Hours</h3>
                  <div className="text-gray-600 space-y-1 text-sm">
                    <p><strong>In Season (Mar–Nov):</strong> Open 24/7</p>
                    <p><strong>Off Season:</strong> By appointment only</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-navy-900 mb-3">Service Area</h3>
                  <p className="text-gray-600 text-sm">
                    Fox Valley, Northeast Wisconsin, and expanding nationally.
                    Based in Oshkosh, WI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
