"use client";

import { useState } from "react";

const faq = [
  {
    question: "What services do you offer?",
    answer:
      "We provide branding, website design and development, paid campaigns, and ongoing growth support."
  },
  {
    question: "How do I know which plan is right for me?",
    answer:
      "We start with a short discovery call, then recommend a plan based on your goals, timeline, and budget."
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Initial signals usually appear in the first few weeks, while stronger and more stable results build over a few months."
  },
  {
    question: "Can I customize a package based on my needs?",
    answer:
      "Yes. Every scope is modular, so we can tailor the deliverables and pace to your exact needs."
  },
  {
    question: "What makes your agency different from others?",
    answer:
      "We combine creative execution with measurable performance and keep communication fast, direct, and transparent."
  }
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq-section">
      <div className="container">
        <div className="faq-header">
          <p className="faq-pill">
            <span aria-hidden>•</span>
            Sustained Annual Growth
          </p>
          <h2>Got questions?</h2>
          <p className="faq-subtitle">
            We combine strategy, creativity, and data to deliver impactful marketing
            solutions. From discovery to execution.
          </p>
        </div>
        <div className="faq-list">
          {faq.map((item, index) => (
            <article
              key={item.question}
              className={`faq-item${openIndex === index ? " is-open" : ""}`}
            >
              <button
                type="button"
                className="faq-trigger"
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenIndex((prev) => (prev === index ? -1 : index))}
              >
                {item.question}
              </button>
              <div id={`faq-panel-${index}`} className="faq-answer">
                <div className="faq-answer-inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
