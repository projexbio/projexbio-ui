"use client";

import { Accordion, AccordionItem } from "@heroui/react";

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
  return (
    <section
      id="faq"
      className="pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]"
      style={{ scrollMarginTop: "5rem" }}
    >
      <div className="max-w-4xl mx-auto text-center mb-6 md:mb-10">
        <h2 className="font-norwester text-2xl md:text-5xl font-bold text-black mb-2">
          FAQs / Address Objections
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          Clear FAQs reduce hesitation and build confidence
        </p>
      </div>

      <div className="max-w-full sm:max-w-3xl mx-auto">
        <Accordion>
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              title={
                <span className="text-base md:text-lg font-semibold text-black text-center w-full block">
                  {faq.question}
                </span>
              }
              className="border border-black rounded-3xl transition-all duration-300 bg-white text-black px-2 sm:px-4 py-2 font-medium mb-4"
            >
              <div className="pt-2 px-1 sm:px-2 text-black text-sm md:text-base text-center w-full">
                {faq.answer}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
