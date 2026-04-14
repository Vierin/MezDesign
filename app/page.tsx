import { About } from "@/components/sections/About";
import { ContactForm } from "@/components/sections/ContactForm";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Partners />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Faq />
      <ContactForm />
      <Footer />
    </main>
  );
}
