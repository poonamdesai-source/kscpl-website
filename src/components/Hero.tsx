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
    video: "/videos/hero-slide-1.mp4"
  },
  {
    id: 2,
    title: "Crafting Timeless\nArchitecture",
    video: "/videos/hero-slide-2.mp4"
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

              {/* Right Side: Main Video */}
              <div className="w-full md:w-7/12 h-full relative">
                <video
                  src={slide.video}
                  autoPlay
                  muted
                  loop
                  playsInline
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
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-hero-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2" />
    </section>
  );
}
