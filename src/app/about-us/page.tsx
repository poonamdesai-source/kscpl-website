import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { ArrowRight } from "lucide-react";

async function getAboutPageData() {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/about-page?populate=*`;
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

async function getManagementMembers() {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/management-members?sort=DisplayOrder:asc`;
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

const fallbackManagementTeam = [
  { name: "Mr. Ramesh K. Nakarani", title: "Director", desc: "With over 25 years of expertise in construction and real estate, Mr. Nakarani has been instrumental in executing Top Realty Projects in India. He excels in design development, planning, and project management, always innovating to drive organizational growth." },
  { name: "Mr. Mansukh D. Thumar", title: "Director", desc: "With 25 years of experience in the construction industry, Mr. Mansukh's leadership has been pivotal in executing complex projects successfully. His expertise strengthens the company's position as a Best Realty Company with many large projects in Maharashtra." },
  { name: "Mr. Jagdish Thumar", title: "Chief Executive Officer & Chief Technical...", desc: "A diploma civil engineer, Mr. Jagdish keeps the company ahead of its peers by implementing groundbreaking techniques. He ensures flawless execution and smooth operations across all projects." },
  { name: "Mr. Pathik Thumar", title: "Vice President", desc: "Carrying forward the family legacy, Mr. Thumar leads the Real Estate division with precision and creativity, ensuring every project reflects the company's commitment to excellence in the industry." },
  { name: "Mr. Ajit Thumar", title: "Director Finance", desc: "A fresh commerce graduate, Mr. Thumar manages the company's financial operations with precision, ensuring cost-effectiveness while maintaining the highest standards for clients." },
  { name: "Mr. Harshad Thumar", title: "Director Administration", desc: "A results-driven commerce graduate, Mr. Harshad oversees workforce management and site operations, ensuring every project aligns with the company's vision for growth and quality." },
  { name: "Mr. Mahesh Thumar", title: "Chief Operating Officer (Liaison)", desc: "Joining the business in 1999, Mr. Thumar combines technical knowledge and strategic insight to oversee daily operations. His ability to connect the smallest details to the larger picture ensures smooth execution of Top Realty Projects in India." },
  { name: "Mr. Rajanikant Thumar", title: "Project Director", desc: "Joining the business in 2005, Mr. Rajanikant brings over a decade of experience in supervising industrial, residential, and commercial projects with independent oversight and dedication." },
  { name: "Mr. Arvind Gondalia", title: "General Manager", desc: "Joining the company in 2004, Mr. Gondalia sets world-class standards for material performance. His data-driven approach continues to improve organizational efficiency and outcomes." }
];

export default async function AboutUs() {
  const aboutData = await getAboutPageData();
  const managementData = await getManagementMembers();

  const displayManagementTeam = managementData?.length > 0 
    ? managementData.map((m: any) => ({ name: m.Name, title: m.Title, desc: m.Description }))
    : fallbackManagementTeam;

  const title = aboutData?.Title || "Precision. Passion. Perfection !";
  const desc1 = aboutData?.Description1 || "Crafting Top Largest Construction Projects in India, Kalpana Struct-Con Pvt. Ltd. transforms visions into reality. From awe-inspiring arches and breathtaking skyscrapers to precision-engineered bridges and state-of-the-art sports complexes, we redefine skylines with every project.";
  const desc2 = aboutData?.Description2 || "Founded in Mumbai in 2003 as \"Kalpana Builders\" and rebranded as Kalpana Struct-Con Pvt. Ltd. in 2008. We take pride in our robust infrastructure, cutting-edge equipment, and a professional, committed team. As one of the Top Builders and Developers in India, quality remains at the core of our work, monitored at every stage with on-site labs to ensure superior materials. Be it a small housing project or a multi-crore shopping mall, we are here to build your dreams.";

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950">
      <Header />
      
      {/* Spacer for fixed header */}
      <div className="h-24 md:h-32 bg-white"></div>

      {/* About Us Title Section */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden flex flex-col items-center justify-center">
        {/* Large faint background typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] md:text-[220px] font-extrabold text-neutral-100/60 whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter" style={{ WebkitTextStroke: '2px rgba(0,0,0,0.02)' }}>
          About Us
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#5c3a21] mb-6">About Us</h1>
          <p className="text-xl md:text-2xl font-medium text-neutral-700 max-w-3xl mx-auto">
            We Build Dreams with Passion, Vision, and Sheer Expertise
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Left Image */}
            <div className="w-full lg:w-1/2 relative min-h-[400px]">
              <div className="absolute inset-0 bg-neutral-200 rounded-l-xl overflow-hidden">
                {/* Placeholder for actual image */}
                <img 
                  src={aboutData?.MainImage?.url || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80"} 
                  alt="Team collaborating on plans"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Right Brown Content Block */}
            <div className="w-full lg:w-1/2 bg-[#5c3a21] p-10 md:p-16 lg:p-20 flex flex-col justify-center rounded-r-xl lg:rounded-l-none rounded-b-xl lg:rounded-tr-xl lg:rounded-bl-none text-white relative lg:-ml-8 lg:mt-16 lg:mb-16 z-10 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
              <p className="text-neutral-200 leading-relaxed mb-6 text-sm md:text-base">
                {desc1}
              </p>
              <p className="text-neutral-300 leading-relaxed text-xs md:text-sm">
                {desc2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders & Management Section */}
      <section className="py-20 bg-[#faf8f5] relative overflow-hidden">
        {/* Large faint background typography */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[150px] md:text-[250px] font-extrabold text-neutral-200/50 whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter" style={{ WebkitTextStroke: '2px rgba(0,0,0,0.02)' }}>
          Team
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#5c3a21] mb-4">Our Founders &amp; Management</h2>
            <p className="text-lg md:text-xl font-medium text-neutral-700">
              Steering Success with Dynamic Leadership &amp; Unmatched Excellence
            </p>
          </div>

          {/* Large Chairman Card */}
          <div className="bg-[#fcf5e3] border border-[#f0dfb3] rounded-xl p-8 md:p-12 mb-12 shadow-sm">
            <h3 className="text-2xl md:text-4xl font-bold text-[#4a2e1b] mb-2">Mr. Chatur K. Thumar</h3>
            <h4 className="text-lg text-[#8b6533] font-semibold mb-6">Chairman and Managing Director</h4>
            <p className="text-neutral-700 leading-relaxed max-w-5xl text-sm md:text-base">
              A visionary leader driving excellence, Mr. Thumar&apos;s dynamism, expertise, and commitment have propelled the company to deliver Top Largest Construction Projects in India. Under his leadership, Kalpana Struct-Con Pvt. Ltd. has built iconic structures and a solid reputation. He believes in empowering people, fostering innovation, and ensuring quality and timely project completion, placing the company among Top Builders and Developers in India.
            </p>
          </div>

          {/* 3-Column Grid for Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-16">
            {displayManagementTeam.map((member: any, idx: number) => (
              <div key={idx} className="flex flex-col">
                <h4 className="text-xl font-bold text-[#4a2e1b] mb-1">{member.name}</h4>
                <div className="text-xs text-[#8b6533] uppercase tracking-wider font-semibold mb-4 border-b border-[#e5d0a3] pb-2 inline-block self-start">
                  {member.title}
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authorized Member Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Large faint background typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] md:text-[200px] font-extrabold text-neutral-100/60 whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter" style={{ WebkitTextStroke: '2px rgba(0,0,0,0.02)' }}>
          Authorized
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#5c3a21] mb-2">Authorized Member of</h2>
          <p className="text-lg md:text-xl font-medium text-neutral-600 mb-16">these esteemed organisations.</p>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-80 mix-blend-multiply">
            {/* Using text placeholders as actual logos aren't provided */}
            <div className="h-16 flex items-center justify-center font-bold text-2xl text-green-800">CREDAI</div>
            <div className="h-16 flex items-center justify-center font-bold text-2xl text-blue-800">banm</div>
            <div className="h-16 flex items-center justify-center font-bold text-2xl text-black">BAI</div>
            <div className="h-16 flex items-center justify-center font-bold text-xl text-blue-600">NACC</div>
            <div className="h-16 flex items-center justify-center font-bold text-2xl text-green-800">YOUTHCON</div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-12 bg-white pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xl overflow-hidden shadow-2xl bg-neutral-900">
            {/* Background image / tint */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e22] to-[#2c180e]/80"></div>
            
            <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 md:mb-0 max-w-xl leading-tight">
                Your Questions Deserve More Than Auto-Replies
              </h2>
              
              <a href="/#contact" className="inline-flex items-center justify-center px-8 py-4 bg-[#fdf5e6] text-[#5c3a21] font-bold rounded hover:bg-white transition-colors flex-shrink-0">
                Let's Connect <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <ScrollToTopButton />
    </main>
  );
}
