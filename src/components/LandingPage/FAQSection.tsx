"use client";

import { Accordion, AccordionItem } from "@heroui/react";
import Image from "next/image";

const faqs = [
  {
    question: "Is it really free for students and faculty?",
    answer: "Yes, free for students and faculty.",
  },
  {
    question: "Is ProjexBio open to all colleges?",
    answer:
      "Currently, we're starting with selected colleges. You can request to add your college using the form if it isn’t listed yet.",
  },
  {
    question: "Can I collaborate with students from other colleges?",
    answer:
      "Yes! Projects can have contributors from multiple colleges. You can invite others or mark your project as 'Looking for Contributors'.",
  },
  {
    question: "What about data privacy?",
    answer: "We take data privacy seriously. All information is and secure.",
  },
  {
    question: "Can alumni and external contributors join?",
    answer:
      "Yes, as long as they are able to verify their identity with a valid college email address.",
  },
  {
    question: "Do I need to upload code directly to ProjexBio?",
    answer:
      "Right now, you need to upload code directly to ProjexBio. Later, you can link your GitHub instead, and select the repository you want to showcase.",
  },
  {
    question: "How can I become a contributor or ambassador for my college?",
    answer:
      "We’d love that! Fill out the college request form and mention your interest. We’ll get in touch when the feature is rolled out.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="container mx-auto px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="absolute -bottom-16 flex left-0 right-0 items-center justify-center z-0">
        {/* print 3 times and at center */}
        {Array.from({ length: 2 }).map((_, index) => (
          <Image
            key={index}
            src="/assets/landingPageGraphics/5.svg"
            alt="ProjexBio"
            width={500}
            height={500}
            className="object-cover opacity-50 w-32 h-32 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-120 lg:h-120"
          />
        ))}
      </div>
      <div className="max-w-4xl mx-auto text-center mb-6 md:mb-10 relative z-20">
        <h2 className="font-norwester text-2xl md:text-5xl font-bold text-black mb-2">
          FAQ&apos;s/Address Objections
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          Clear FAQ&apos;s and address objections
        </p>
      </div>

      <div className="max-w-full sm:max-w-3xl mx-auto relative z-20">
        <Accordion isCompact variant="splitted" className="cursor-pointer">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              title={faq.question}
              className="px-2 sm:px-4 py-2 font-medium mb-4 text-center"
              classNames={{
                base: "bg-white",
                title: "text-black text-center",
                content: "text-default-600",
              }}
            >
              {faq.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
