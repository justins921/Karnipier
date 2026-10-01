"use client";

import { useState, useRef, useEffect } from "react";

const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const startedAtRef = useRef(0);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.set("startedAt", String(startedAtRef.current));

    const files = formData.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
    if (files.length > MAX_FILES) {
      setError(`Please attach ${MAX_FILES} photos or fewer.`);
      return;
    }
    if (files.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_BYTES) {
      setError("Attachments are too large (4 MB total max). Try fewer or smaller photos.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", body: formData });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error || "Oops! Something went wrong while submitting the form.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Oops! Something went wrong while submitting the form. Please call (920) 231-0841.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Thank you! Your submission has been received!
        </h3>
        <p className="text-green-700">
          We will get back to you within 48 hours.
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
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
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
          Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="address"
          name="address"
          required
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

      <div>
        <label
          htmlFor="files"
          className="block text-sm font-medium text-navy-800 mb-2"
        >
          Photos <span className="text-gray-500 font-normal">(optional &mdash; your shoreline, old dock, etc.)</span>
        </label>
        <input
          type="file"
          id="files"
          name="files"
          multiple
          accept="image/*,application/pdf"
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-navy-50 file:text-navy-800 file:font-medium hover:file:bg-navy-100"
        />
        <p className="text-xs text-gray-500 mt-1">Up to 5 files, 4 MB total.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full sm:w-auto bg-lake text-white font-semibold px-8 py-3 rounded-lg hover:bg-lake-dark transition-colors disabled:opacity-60 disabled:cursor-wait"
      >
        {sending ? "Sending..." : "Send Message"}
      </button>
      <p className="text-sm text-gray-500">
        We will get back to you within 48 hours.
      </p>
    </form>
  );
}
