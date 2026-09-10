"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    title: "Building Landmark\nLegacies",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=2070&auto=format&fit=crop",
    stripImages: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Crafting Timeless\nArchitecture",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    stripImages: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    title: "Pioneering Luxury\nResidences",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    stripImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
    ]
  }
];

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-[85vh] mt-24">
      <Swiper
        modules={[Navigation, Autoplay, Pagination, EffectFade]}
        effect="fade"
        navigation={{
          prevEl: ".hero-prev-btn",
          nextEl: ".hero-next-btn",
        }}
        pagination={{ clickable: true, el: ".custom-hero-pagination" }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col md:flex-row w-full h-full">
              {/* Left Side: Brown text area */}
              <div className="w-full md:w-5/12 bg-[#70503f] flex flex-col justify-center px-8 md:px-16 lg:px-24 h-full pt-12 pb-24 relative">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight whitespace-pre-line mb-8">
                  {slide.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 mt-4">
                  <button className="px-6 py-2 border border-white text-white text-sm uppercase tracking-widest font-semibold hover:bg-white hover:text-[#70503f] transition-colors">
                    Our Creations
                  </button>
                  <button className="px-8 py-2 bg-[#fcfbfa] text-[#70503f] text-sm uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors">
                    Realty
                  </button>
                </div>
              </div>

              {/* Right Side: Main Image */}
              <div className="w-full md:w-7/12 h-full relative">
                <img
                  src={slide.image}
                  alt="Building"
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation controls embedded in the right side like the screenshot */}
                <div className="absolute right-0 bottom-[25%] flex flex-col z-20">
                  <button className="hero-prev-btn w-12 h-12 bg-[#70503f] flex items-center justify-center text-white hover:bg-[#52382c] transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button className="hero-next-btn w-12 h-12 bg-[#fcfbfa] flex items-center justify-center text-[#70503f] hover:bg-neutral-200 transition-colors">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Lower Image Strip */}
            <div className="absolute bottom-0 left-0 w-full h-32 md:h-40 flex z-10">
              {slide.stripImages.map((src, idx) => (
                <div key={idx} className="flex-1 h-full relative overflow-hidden">
                  <img src={src} alt="Strip thumbnail" className="w-full h-full object-cover border-r border-white/20" />
                  <div className="absolute inset-0 bg-black/30 hover:bg-transparent transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-hero-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2" />
    </section>
  );
}
