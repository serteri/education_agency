"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Show after scrolling a bit to not overwhelm immediately
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Change phone number to your actual business WhatsApp number
    const phoneNumber = "61400000000"; // Format: country code + number without plus or spaces
    const message = "Hi EduBrisbane, I'm interested in studying in Australia.";
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.5,
                y: isVisible ? 0 : 50
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[90] ${!isVisible ? 'pointer-events-none' : ''}`}
        >
            <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] text-white rounded-full shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all duration-300 relative"
                aria-label="Chat with us on WhatsApp"
            >
                {/* Ping Animation Effect */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping duration-1000 group-hover:block hidden" />

                <MessageCircle size={32} className="relative z-10" />
            </a>
        </motion.div>
    );
}
