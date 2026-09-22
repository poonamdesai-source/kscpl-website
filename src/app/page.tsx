import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProjectsSlider from "@/components/ProjectsSlider";
import ExperienceSection from "@/components/ExperienceSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

async function getHomePageData() {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/home-page?populate=deep`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      next: { revalidate: 10 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}

async function getProjectsData() {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/projects?populate=*&sort=createdAt:desc`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      next: { revalidate: 10 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const homeData = await getHomePageData();
  const projectsData = await getProjectsData();

  return (
    <main className="min-h-screen bg-[#fcfbfa] text-neutral-900 flex flex-col justify-between selection:bg-amber-500 selection:text-white">
      <Header />
      <div className="flex-1">
        <Hero />
        <AboutSection strapiData={homeData} />
        <ProjectsSlider strapiData={projectsData} />
        <ExperienceSection strapiData={homeData} />
        <CTASection />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
