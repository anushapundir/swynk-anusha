import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";
import { Features } from "@/components/ui/Features";
import { DetailedFeatures } from "@/components/ui/DetailedFeatures";
import { Testimonials } from "@/components/ui/Testimonials";
import { CallToAction } from "@/components/ui/CallToAction";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <DetailedFeatures />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
