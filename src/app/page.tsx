import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProjectsSlider from "@/components/ProjectsSlider";
import ExperienceSection from "@/components/ExperienceSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fcfbfa] text-neutral-900 flex flex-col justify-between selection:bg-amber-500 selection:text-white">
      <Header />
      <div className="flex-1">
        <Hero />
        <AboutSection />
        <ProjectsSlider />
        <ExperienceSection />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
