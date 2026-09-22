"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, X } from "lucide-react";

function Counter({ from, to, suffix, label }: { from: number; to: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(from, { bounce: 0, duration: 2500 });
  
  const display = useTransform(spring, (current) => 
    Math.round(current) + suffix
  );

  useEffect(() => {
    if (inView) {
      spring.set(to);
    }
  }, [inView, spring, to]);

  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <motion.span ref={ref} className="text-5xl md:text-6xl font-black text-[#70503f] tracking-tighter">
        {display}
      </motion.span>
      <span className="text-sm font-bold text-neutral-600 tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}

export default function ExperienceSection({ strapiData }: { strapiData?: any }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const displayStats = strapiData?.Stats || [
    { from: 0, to: 40, suffix: "+", label: "Years of experience" },
    { from: 0, to: 50, suffix: "+", label: "Projects Completed" },
    { from: 0, to: 100, suffix: "L+", label: "Square Feet covered" },
    { from: 0, to: 90, suffix: "%", label: "Positive Feedbacks" }
  ];

  const displayVisionTitle = strapiData?.VisionTitle || "Our Vision in Motion";
  const displayVisionDesc = strapiData?.VisionDescription || "How Imagination Takes Flight, and Excellence Blossoms";

  return (
    <section id="experience" className="py-20 bg-[#fcfbfa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-neutral-200 py-12">
          {displayStats.map((stat: any, idx: number) => (
            <Counter key={idx} from={stat.from} to={stat.to} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>

        {/* Vision in Motion Heading */}
        <div className="relative mb-12">
          <div className="absolute top-[-2rem] left-0 w-full pointer-events-none opacity-5 overflow-hidden">
             <span className="text-[100px] md:text-[140px] font-black text-[#70503f] tracking-tighter whitespace-nowrap leading-none select-none">
               Vision
             </span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#70503f] mb-4 tracking-tight">
              {displayVisionTitle}
            </h2>
            <p className="text-neutral-600 font-medium">
              {displayVisionDesc}
            </p>
          </motion.div>
        </div>

        {/* Vision Block 1 - Text Left, Media Right */}
        <div className="bg-[#70503f] text-white p-8 md:p-16 relative overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Showcasing Our Project<br />Excellence
              </h3>
              <p className="text-white/80 mb-8 font-light text-sm">
                Witness our digital end-to-end integration.
              </p>
              
              <ul className="space-y-4 mb-12">
                {["In-field Vision", "Collaborative Design", "Flawless Innovation"].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-sm font-semibold tracking-wide">
                    <ArrowRight className="w-5 h-5 text-white" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button className="text-sm font-bold tracking-widest uppercase border-b border-white pb-1 hover:text-neutral-200 transition-colors">
                Download Brochure
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative cursor-pointer group" onClick={() => setIsVideoOpen(true)}>
                <img 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop" 
                  alt="Video Thumbnail 1" 
                  className="w-full h-64 object-cover border border-white/20 shadow-lg group-hover:brightness-75 transition-all"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                     <Play className="w-8 h-8 text-white fill-white ml-1" />
                   </div>
                </div>
              </div>
              <div className="absolute -bottom-12 -left-12 w-3/4 hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2070&auto=format&fit=crop" 
                  alt="Video Thumbnail 2" 
                  className="w-full h-40 object-cover border-4 border-[#70503f] shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Vision Block 2 - Media Left, Text Right (Alternating Layout) */}
        <div className="bg-[#70503f] text-white p-8 md:p-16 relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 md:order-1"
            >
              <div className="relative cursor-pointer group" onClick={() => setIsVideoOpen(true)}>
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                  alt="Video Thumbnail 3" 
                  className="w-full h-64 object-cover border border-white/20 shadow-lg group-hover:brightness-75 transition-all"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                     <Play className="w-8 h-8 text-white fill-white ml-1" />
                   </div>
                </div>
              </div>
              <div className="absolute -bottom-12 -right-12 w-3/4 hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=2070&auto=format&fit=crop" 
                  alt="Video Thumbnail 4" 
                  className="w-full h-40 object-cover border-4 border-[#70503f] shadow-xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Architectural<br />Mastery
              </h3>
              <p className="text-white/80 mb-8 font-light text-sm">
                Engineering excellence through advanced modeling.
              </p>
              
              <ul className="space-y-4 mb-12">
                {["Structural Integrity", "Sustainable Practices", "Premium Materials"].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-sm font-semibold tracking-wide">
                    <ArrowRight className="w-5 h-5 text-white" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button className="text-sm font-bold tracking-widest uppercase border-b border-white pb-1 hover:text-neutral-200 transition-colors">
                View Gallery
              </button>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setIsVideoOpen(false)}
          >
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
