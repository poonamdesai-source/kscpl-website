"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowRight, Building, Home, Construction, Droplet, Dumbbell, Car, Trees } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const projects = [
  {
    id: 1,
    title: "HORIZON",
    mainImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=2070&auto=format&fit=crop",
    smallImages: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    ],
    features: [
      { icon: Droplet, text: "Swimming Pool" },
      { icon: Dumbbell, text: "Gym" },
      { icon: Home, text: "Clubhouse" },
      { icon: Building, text: "Multipurpose Hall" },
      { icon: Trees, text: "Kids Play Area" },
      { icon: Car, text: "Ample Parking" }
    ]
  },
  {
    id: 2,
    title: "SOLITAIRE",
    mainImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    smallImages: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop"
    ],
    features: [
      { icon: Droplet, text: "Infinity Pool" },
      { icon: Dumbbell, text: "Fitness Center" },
      { icon: Home, text: "Spa & Sauna" },
      { icon: Building, text: "Business Lounge" },
      { icon: Trees, text: "Zen Garden" },
      { icon: Car, text: "Valet Parking" }
    ]
  }
];

export default function ProjectsSlider() {
  return (
    <section id="creations" className="py-20 bg-[#fcfbfa] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="relative mb-12 flex flex-col md:flex-row md:items-end justify-between z-10">
          <div className="absolute top-[-3rem] left-[-2rem] pointer-events-none opacity-5 overflow-hidden">
             <span className="text-[100px] md:text-[140px] font-black text-[#70503f] tracking-tighter whitespace-nowrap leading-none select-none">
               Projects
             </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#70503f] mb-4 tracking-tight">
              Our Creations
            </h2>
            <p className="text-neutral-600 font-medium border-l-2 border-[#70503f] pl-4">
              Where Imagination Meets Reality in Every Frame
            </p>
          </motion.div>

          <motion.a
            href="#all-projects"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 md:mt-0 flex items-center space-x-2 text-sm font-bold tracking-widest uppercase text-[#70503f] hover:text-neutral-900 transition-colors"
          >
            <span>All Projects</span>
            <ChevronRight className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, EffectFade, Autoplay]}
            effect="fade"
            navigation={{
              prevEl: ".proj-prev",
              nextEl: ".proj-next",
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="w-full"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                  
                  {/* Left Main Image */}
                  <div className="w-full lg:w-5/12 relative rounded-[2rem] overflow-hidden shadow-2xl h-[500px]">
                    <img 
                      src={project.mainImage} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-8 py-2 rounded-full shadow-lg">
                      <span className="font-bold tracking-widest text-[#70503f]">
                        — {project.title} —
                      </span>
                    </div>
                  </div>

                  {/* Center Small Images */}
                  <div className="w-full lg:w-3/12 flex flex-col gap-4 justify-between h-[500px]">
                    {project.smallImages.map((src, idx) => (
                      <div key={idx} className="flex-1 rounded-[1.5rem] overflow-hidden shadow-md relative group">
                        <img 
                          src={src} 
                          alt="Detail" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Right Content */}
                  <div className="w-full lg:w-4/12 flex flex-col justify-center py-8 lg:px-8">
                    <h3 className="text-3xl md:text-4xl font-serif text-[#70503f] italic mb-2">
                      Architecture
                    </h3>
                    <p className="text-xl font-medium text-neutral-500 mb-8">
                      that feels like <span className="font-serif italic text-3xl text-[#70503f]">Art</span>
                    </p>

                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-12">
                      {project.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center space-x-3 text-neutral-600">
                          <feat.icon className="w-5 h-5 text-[#70503f] shrink-0" />
                          <span className="text-xs font-semibold tracking-wide">{feat.text}</span>
                        </div>
                      ))}
                    </div>

                    <button className="self-start px-8 py-3 border border-[#70503f] text-[#70503f] font-bold tracking-widest text-sm hover:bg-[#70503f] hover:text-white transition-colors">
                      View Project
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls Below */}
          <div className="flex justify-center mt-12 space-x-4">
            <button className="proj-prev w-12 h-12 bg-neutral-100 flex items-center justify-center text-[#70503f] hover:bg-[#70503f] hover:text-white transition-colors rounded">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="proj-next w-12 h-12 bg-[#70503f] flex items-center justify-center text-white hover:bg-[#52382c] transition-colors rounded">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
