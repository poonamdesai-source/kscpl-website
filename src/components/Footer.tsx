"use client";

import { Building2, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#fdf9f4] border-t border-neutral-200 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Socials (Span 4) */}
          <div className="md:col-span-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 border-2 border-[#70503f] flex items-center justify-center rounded">
                <Building2 className="w-6 h-6 text-[#70503f]" />
              </div>
              <span className="text-xl font-bold text-[#70503f] tracking-wider uppercase">
                KSCPL
              </span>
            </div>
            <p className="text-sm font-medium text-[#70503f] mb-6">
              Our Work is Special!
            </p>
            
            <div className="flex items-center space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className="w-8 h-8 rounded-full border border-[#70503f] flex items-center justify-center text-[#70503f] hover:bg-[#70503f] hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (Span 4) */}
          <div className="md:col-span-4">
            <h4 className="font-bold text-[#70503f] mb-6 text-sm uppercase tracking-widest border-b-2 border-[#70503f] inline-block pb-1">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {['News & Updates', 'Testimonials', 'Policy', 'About Us', 'Contact'].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-[#70503f] hover:text-neutral-500 font-medium transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address (Span 4) */}
          <div className="md:col-span-4">
            <h4 className="font-bold text-[#70503f] mb-6 text-sm uppercase tracking-widest border-b-2 border-[#70503f] inline-block pb-1">
              Address
            </h4>
            <div className="space-y-4 text-sm text-[#70503f] font-medium leading-relaxed">
              <p>
                <strong>KUMAR SAMARTHA PVT. LTD.</strong><br />
                Kumar Samartha Towers, 4th Floor,<br />
                Corporate Park, Camp, Pune, Maharashtra 411001, India
              </p>
              <p>
                Email: info@kscpl.com<br />
                Enquiry: sales@kscpl.com<br />
                Call: +91 20 2613 4500
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#70503f]/20 flex flex-col md:flex-row items-center justify-between text-xs text-[#70503f] font-medium">
          <p>© {currentYear} Kumar Samartha Construction Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-neutral-500 transition-colors">Designed by Your Design Studio</a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
