"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is it really free for students and faculty?",
    answer: "Yes, forever free.",
  },
  {
    question: "Can alumni and external contributors join?",
    answer: "Yes, as long as they are approved by the institution or invited.",
  },
  {
    question: "What about data privacy?",
    answer:
      "We take data privacy seriously. All information is encrypted and secure.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 px-6 bg-[#f5f5f5] border-t border-gray-300">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold font-anton text-black mb-2">
          FAQ’s/Address Objections
        </h2>
        <p className="text-gray-600 text-lg">
          Clear FAQs reduce hesitation and build confidence
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-black rounded-xl transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(i)}
              className="w-full text-left px-6 py-4 text-lg font-medium flex justify-between items-center"
            >
              <span>{faq.question}</span>
              <span>{openIndex === i ? "▲" : "▼"}</span>
            </button>

            {openIndex === i && (
              <div className="px-6 pb-4 text-gray-700 transition-all duration-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
