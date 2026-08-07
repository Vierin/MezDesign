import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { Testimonials } from "@/components/sections/Testimonials";
import { Works } from "@/components/sections/Works";

export default function HomePage() {
  return (
    <main id="top">
      <Hero />
      <Partners />
      <Works />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  );
}
