"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Thank you! Your submission has been received!
        </h3>
        <p className="text-green-700">
          We&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-navy-800 mb-2"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lake focus:border-transparent outline-none transition-shadow"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-navy-800 mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lake focus:border-transparent outline-none transition-shadow"
            placeholder="(xxx) xxx-xxxx"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-navy-800 mb-2"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lake focus:border-transparent outline-none transition-shadow"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-navy-800 mb-2"
        >
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lake focus:border-transparent outline-none transition-shadow"
          placeholder="Your lake property address"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-navy-800 mb-2"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lake focus:border-transparent outline-none transition-shadow resize-vertical"
          placeholder="Tell us about your dock project — type of dock, lake name, any special requirements..."
        />
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto bg-lake text-white font-semibold px-8 py-3 rounded-lg hover:bg-lake-dark transition-colors"
      >
        Send Message
      </button>
      <p className="text-sm text-gray-500">
        We&apos;ll get back to you within 24 hours during the season (March–November).
      </p>
    </form>
  );
}
