import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

async function getArchitects() {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/architects?sort=DisplayOrder:asc&filters[Active][$eq]=true`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      console.error("Failed to fetch architects");
      return null;
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching architects from Strapi:", error);
    return null;
  }
}

export default async function Architects() {
  const architects = await getArchitects();
  
  // Graceful fallback if Strapi is down
  const fallbackArchitects = [
    "Arch. Anil Sule & Associates",
    "Architects Cidco Department",
    "Arch. Hafeez Contractor",
    "M/s Dimension",
    "Arch. Milind Pawar",
    "Arch. Soyuz Talib",
    "Arch. Bhaskar Jadhav, Mumbai",
    "Arch. Bharat Yamsanvar – Team One",
    "The Firm, Navi Mumbai",
    "Arch. Suhash Sankpal, Mumbai",
    "Voyants solutions Pvt. Ltd.",
    "Hiten Sethi Architects",
    "Sandeep Shirke & Associates",
    "Design Group India"
  ];

  const displayArchitects = architects && architects.length > 0
    ? architects.map((a: any) => a.Name)
    : fallbackArchitects;

  return (
    <main className="min-h-screen bg-[#fafaf9] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950">
      <Header />
      
      {/* Spacer for fixed header */}
      <div className="h-24 md:h-32 bg-white"></div>

      {/* Banner Section */}
      <section className="relative py-24 md:py-32 bg-[#e4eceb] overflow-hidden flex flex-col items-start justify-center">
        {/* Background Pattern/Image - Architecture Structure */}
        <div 
          className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1541888082470-fa4ca451e506?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-luminosity"
        ></div>
        
        {/* Faint background typography */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] md:text-[200px] font-extrabold text-transparent whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter" 
          style={{ WebkitTextStroke: '1px rgba(0,0,0,0.06)' }}
        >
          Architects
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block">
            <h1 className="text-4xl md:text-6xl font-black text-[#5c3a21] tracking-tight">
              Architects
            </h1>
            <div className="h-0.5 w-16 bg-[#5c3a21] mt-2"></div>
          </div>
        </div>
      </section>

      {/* Main Content - Architects List */}
      <section className="py-20 md:py-28 bg-[#fafaf9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pl-8 md:pl-12 border-l border-[#5c3a21] ml-4 md:ml-8 py-2">
            <ul className="space-y-4 md:space-y-5 list-none">
              {displayArchitects.map((architect: string, idx: number) => (
                <li key={idx} className="relative text-base md:text-lg font-bold text-[#6a5e55]">
                  <span className="absolute -left-6 md:-left-8 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#5c3a21]"></span>
                  {architect}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />

      <ScrollToTopButton />
    </main>
  );
}
