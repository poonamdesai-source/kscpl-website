"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function CTASection() {
  return (
    <section id="contact" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative w-full overflow-hidden bg-[#002f31] flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 md:py-20"
        >
          {/* Background overlay image (Leaves) */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=2070&auto=format&fit=crop" 
              alt="Leaves background" 
              className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            />
          </div>

          {/* Left Text */}
          <div className="relative z-10 w-full md:w-7/12 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Your Questions Deserve More<br />Than Auto-Replies
            </h2>
          </div>

          {/* Right Button */}
          <div className="relative z-10 w-full md:w-auto flex justify-start md:justify-end">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#70503f] px-8 py-3 flex items-center space-x-2 font-semibold text-sm hover:bg-neutral-100 transition-colors"
            >
              <span>Let's Connect</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
