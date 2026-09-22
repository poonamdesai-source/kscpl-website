"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactClient({ strapiData }: { strapiData?: any }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const displayCompanyName = strapiData?.CompanyName || "Kalpana Struct-Con Pvt. Ltd.";
  const displayAddressLine1 = strapiData?.AddressLine1 || "1006-1008, Cyber One, Plot No - 4&6, Sector-";
  const displayAddressLine2 = strapiData?.AddressLine2 || "30A, Near Odisha Bhavan, Vashi, Navi Mumbai.";
  const displayPincode = strapiData?.Pincode || "400703.";
  const displayEmail = strapiData?.Email || "info@kscpl.com";

  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      setCaptchaVerified(true);
      if (submitStatus === "error" && statusMessage === "Please complete the security verification.") {
        setSubmitStatus("idle");
        setStatusMessage("");
      }
    } else {
      setCaptchaVerified(false);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", phone: "", email: "", message: "" };

    if (!formData.name.trim() || !/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Please enter a valid name (letters and spaces only).";
      isValid = false;
    }

    if (!formData.phone.trim() || !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number.";
      isValid = false;
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setStatusMessage("");

    if (!validate()) {
      return;
    }

    if (!captchaVerified) {
      setSubmitStatus("error");
      setStatusMessage("Please complete the security verification.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setStatusMessage("Your enquiry has been sent successfully.");
        setFormData({ name: "", phone: "", email: "", message: "" });
        setCaptchaVerified(false);
        recaptchaRef.current?.reset();
      } else {
        setSubmitStatus("error");
        setStatusMessage(data.error || "Unable to send your enquiry. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage("Unable to send your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#fdf9f4] text-neutral-900 flex flex-col font-sans">
      <Header />

      <div className="flex-1 pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Section: Let's Connect & Address/Map */}
          <div className="mb-24">
            <div className="relative mb-16">
              {/* Faint Background Text */}
              <div className="absolute -top-12 -left-4 md:-left-8 pointer-events-none select-none opacity-[0.03] overflow-hidden w-full">
                <span className="text-[100px] md:text-[180px] font-black text-[#70503f] tracking-tighter uppercase" style={{ WebkitTextStroke: "2px #70503f", color: "transparent" }}>
                  Contact
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 pl-4 md:pl-12"
              >
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#70503f] mb-2 tracking-tight">
                  Let's Connect
                </h1>
                <p className="text-neutral-600 text-lg md:text-xl font-medium">
                  Reach out to bring your dream spaces to life
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start pl-4 md:pl-12">
              {/* Address */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="pt-4"
              >
                <h2 className="text-3xl font-extrabold text-[#70503f] mb-6 tracking-tight">Address:</h2>
                <div className="border-l-2 border-[#70503f] pl-6 text-sm font-medium text-neutral-700 space-y-1">
                  <p className="font-bold text-neutral-900 text-base">{displayCompanyName}</p>
                  <p>{displayAddressLine1}</p>
                  <p>{displayAddressLine2}</p>
                  <p>{displayPincode}</p>
                  <p className="pt-2"><strong className="text-neutral-900">For info:</strong> {displayEmail}</p>
                </div>
                
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-8 inline-flex items-center space-x-2 text-sm font-bold text-neutral-900 hover:text-[#70503f] transition-colors"
                >
                  <span>View on Map</span>
                  <ArrowRight className="w-5 h-5 font-light" />
                </a>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="h-64 md:h-80 w-full overflow-hidden shadow-lg border border-neutral-200"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.7930834246877!2d72.99617307604473!3d19.0728108520743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1341c2105e1%3A0x673dbb1d8396c21e!2sCyber%20One!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KSCPL Office Location"
                ></iframe>
              </motion.div>
            </div>
          </div>

          {/* Bottom Section: Inquiry & Form */}
          <div>
            <div className="relative mb-16 mt-32">
              {/* Faint Background Text */}
              <div className="absolute -top-12 -left-4 md:-left-8 pointer-events-none select-none opacity-[0.03] overflow-hidden w-full">
                <span className="text-[100px] md:text-[180px] font-black text-[#70503f] tracking-tighter uppercase" style={{ WebkitTextStroke: "2px #70503f", color: "transparent" }}>
                  Inquiry
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 pl-4 md:pl-12"
              >
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#70503f] mb-2 tracking-tight max-w-3xl">
                  Thinking about investing or moving in?
                </h2>
                <p className="text-neutral-600 text-lg md:text-xl font-medium border-l-2 border-[#70503f] pl-4 ml-1">
                  Write us directly - Let's talk & turn that thought into action.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch pl-0 md:pl-12">
              {/* Left Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-full min-h-[350px] w-full"
              >
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop" 
                  alt="Interior Room" 
                  className="w-full h-full object-cover shadow-sm"
                />
              </motion.div>

              {/* Right Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col justify-between"
              >
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name" 
                        className={`w-full border ${errors.name ? 'border-red-500' : 'border-[#70503f]'} bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#70503f] placeholder-neutral-400`}
                        disabled={isSubmitting}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number" 
                        className={`w-full border ${errors.phone ? 'border-red-500' : 'border-[#70503f]'} bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#70503f] placeholder-neutral-400`}
                        disabled={isSubmitting}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email" 
                        className={`w-full border ${errors.email ? 'border-red-500' : 'border-[#70503f]'} bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#70503f] placeholder-neutral-400`}
                        disabled={isSubmitting}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <textarea 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message" 
                      rows={6}
                      className={`w-full border ${errors.message ? 'border-red-500' : 'border-[#70503f]'} bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#70503f] placeholder-neutral-400 resize-none`}
                      disabled={isSubmitting}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {/* Security Verification */}
                  <div className="pt-2">
                    <p className="text-xs text-neutral-500 mb-2 font-medium">Security Verification *</p>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY !== 'PASTE_RECAPTCHA_SITE_KEY_HERE' ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY : "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                      onChange={handleCaptchaChange}
                    />
                  </div>

                  {/* Submit Button & Status */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 gap-4">
                    {submitStatus === "success" && (
                      <div className="flex items-center text-green-600 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        {statusMessage}
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="flex items-center text-red-600 text-sm font-medium">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {statusMessage}
                      </div>
                    )}
                    {submitStatus === "idle" && <div className="hidden sm:block"></div>}

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`border border-[#70503f] text-[#70503f] px-8 py-3 flex items-center justify-center space-x-3 font-extrabold text-sm transition-colors ml-auto ${
                        (!formData.name || !formData.phone || !formData.email || !formData.message || !captchaVerified) && !isSubmitting
                          ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-[#70503f]"
                          : "hover:bg-[#70503f] hover:text-white"
                      }`}
                    >
                      <span>{isSubmitting ? "Sending..." : "Send message"}</span>
                      {!isSubmitting && <ArrowRight className="w-5 h-5 font-light" />}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-12">
        <CTASection />
      </div>
      <Footer />

      {/* Floating back-to-top button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-[#70503f] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#52382c] transition-colors z-50 focus:outline-none"
        aria-label="Back to top"
      >
        <span className="text-xl leading-none -mt-1">↑</span>
      </button>
    </main>
  );
}
