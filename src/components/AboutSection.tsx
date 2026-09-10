"use client";

import { motion } from "framer-motion";

const features = [
  {
    num: "01",
    title: "Innovation Beyond Boundaries",
    desc: "With a legacy of delivery, we expect to become the leading innovator in building design and engineering, and continue to push the envelope in sustainable construction.",
  },
  {
    num: "02",
    title: "Visionaries at Work",
    desc: "Investment in people is our foundational value. We stand out with deep expertise across sectors and the imagination to develop visionary solutions that surpass client expectations.",
  },
  {
    num: "03",
    title: "Awards and Acclaim",
    desc: "Our commitment to excellence has led to multiple awards and recognitions, making us a leader in the industry, and solidifying our place in the sector.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#fcfbfa] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Heading Area */}
        <div className="relative mb-16 pt-10">
          {/* Faint Background Text */}
          <div className="absolute top-0 left-0 w-full text-center pointer-events-none opacity-5 overflow-hidden">
            <span className="text-[120px] md:text-[180px] font-black text-[#70503f] tracking-tighter whitespace-nowrap leading-none select-none">
              Construction
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#70503f] mb-6 tracking-tight">
              Construction
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed font-medium">
              Our pioneering spirit is driven by cutting-edge infrastructure, state-of-the-art equipment, and a highly skilled team, shaping iconic structures that stand the test of time.
            </p>
          </motion.div>
        </div>

        {/* Brown Feature Block */}
        <div className="bg-[#70503f] text-white flex flex-col md:flex-row shadow-2xl relative">
          
          {/* Left Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-5/12 relative h-80 md:h-auto"
          >
            {/* The screenshot shows the image offset to the left and overlapping slightly */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[-2rem] w-[110%] h-[110%] md:h-[120%] z-10 shadow-xl hidden md:block">
               <img 
                 src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=2070&auto=format&fit=crop" 
                 alt="Construction Site" 
                 className="w-full h-full object-cover"
               />
               {/* Small overlay image on bottom left of the main image */}
               <div className="absolute -bottom-4 left-4 w-48 h-32 border-4 border-white shadow-lg">
                 <img 
                   src="https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2070&auto=format&fit=crop" 
                   alt="Site View" 
                   className="w-full h-full object-cover"
                 />
               </div>
            </div>
            
            {/* Mobile fallback image */}
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=2070&auto=format&fit=crop" 
              alt="Construction Site" 
              className="w-full h-full object-cover block md:hidden"
            />
          </motion.div>

          {/* Right Features List */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-full md:w-7/12 py-12 px-8 md:px-16 lg:px-24 flex flex-col justify-center space-y-8"
          >
            {features.map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-6 group">
                <span className="text-4xl md:text-5xl font-black text-white/20 group-hover:text-white/40 transition-colors shrink-0">
                  {feature.num}
                </span>
                <div>
                  <h3 className="text-xl font-bold mb-2 tracking-wide text-white">{feature.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
