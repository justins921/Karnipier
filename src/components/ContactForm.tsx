"use client";

import { useState, useRef, useEffect } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const loadTimeRef = useRef(Date.now());

  useEffect(() => {
    loadTimeRef.current = Date.now();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check — bots auto-fill this hidden field
    if (formData.get("website")) {
      // Silently "succeed" so bots think it worked
      setSubmitted(true);
      return;
    }

    // Time-based check — reject submissions faster than 3 seconds
    const elapsed = Date.now() - loadTimeRef.current;
    if (elapsed < 3000) {
      setSubmitted(true);
      return;
    }

    // Basic client-side validation
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !email || !message) {
      setError("Please fill out all required fields.");
      return;
    }

    // Check for spammy patterns in message
    const urlPattern = /https?:\/\/[^\s]+/gi;
    const urlMatches = message.match(urlPattern);
    if (urlMatches && urlMatches.length > 2) {
      setError("Your message was flagged as spam. Please remove excessive links and try again.");
      return;
    }

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
      {/* Honeypot — hidden from real users, bots will fill it */}
      <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

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

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full sm:w-auto bg-lake text-white font-semibold px-8 py-3 rounded-lg hover:bg-lake-dark transition-colors"
      >
        Send Message
      </button>
      <p className="text-sm text-gray-500">
        We&apos;ll get back to you within 24 hours during the season (March&ndash;November).
      </p>
    </form>
  );
}
