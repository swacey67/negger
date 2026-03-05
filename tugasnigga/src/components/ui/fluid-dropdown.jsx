"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { ChevronDown } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useClickAway(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const IconWrapper = ({ icon: Icon, isHovered, color }) => {
  if (!Icon) return null;
  return (
    <motion.div 
      className="w-4 h-4 mr-3 relative" 
      initial={false} 
      animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
    >
      <Icon className="w-4 h-4" />
      {isHovered && (
        <motion.div
          className="absolute inset-0"
          style={{ color }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Icon className="w-4 h-4" strokeWidth={2} />
        </motion.div>
      )}
    </motion.div>
  );
};

export function FluidDropdown({ options, value, onChange, placeholder = "Select option" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const dropdownRef = useRef(null);

  useClickAway(dropdownRef, () => setIsOpen(false));

  const handleKeyDown = (e) => {
    if (e.key === "Escape") setIsOpen(false);
  };

  const selectedOption = options.find(o => o.id === value) || { id: "", label: placeholder };

  return (
    <MotionConfig reducedMotion="user">
      <div className="w-full relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-transparent border-none outline-none text-white text-sm font-medium cursor-pointer py-1 pr-6 relative z-10"
        >
          <span className={value ? "text-white" : "text-slate-300"}>
            {selectedOption.label}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 flex items-center justify-center w-5 h-5 text-slate-500"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 1, y: 0, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto", transition: { type: "spring", stiffness: 500, damping: 30, mass: 1 } }}
              exit={{ opacity: 0, y: 0, height: 0, transition: { type: "spring", stiffness: 500, damping: 30, mass: 1 } }}
              className="absolute left-0 right-0 top-full mt-4 z-[100]"
              onKeyDown={handleKeyDown}
            >
              <motion.div
                className="w-full rounded-xl border border-white/10 bg-[#0A1128] p-2 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-md"
                initial={{ borderRadius: 8 }}
                animate={{ borderRadius: 12, transition: { duration: 0.2 } }}
                style={{ transformOrigin: "top" }}
              >
                <motion.div 
                  className="relative" 
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.05 } } }} 
                  initial="hidden" 
                  animate="visible"
                >
                  <motion.div
                    layoutId="hover-highlight"
                    className="absolute inset-x-0 bg-teal-500/10 rounded-lg border border-teal-500/20"
                    animate={{
                      y: options.findIndex((c) => (hoveredCategory || selectedOption.id) === c.id) * 44,
                      height: 40,
                    }}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                  
                  {options.map((category) => (
                    <motion.button
                      key={category.id}
                      type="button"
                      onClick={() => { onChange(category.id); setIsOpen(false); }}
                      onHoverStart={() => setHoveredCategory(category.id)}
                      onHoverEnd={() => setHoveredCategory(null)}
                      className={cn(
                        "relative flex w-full items-center px-3 py-2.5 h-[40px] text-sm rounded-lg mb-1 last:mb-0",
                        "transition-colors duration-150 focus:outline-none",
                        selectedOption.id === category.id || hoveredCategory === category.id
                          ? "text-teal-400 font-bold"
                          : "text-slate-300"
                      )}
                      whileTap={{ scale: 0.98 }}
                      variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } } }}
                    >
                      <IconWrapper icon={category.icon} isHovered={hoveredCategory === category.id} color={category.color} />
                      {category.label}
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}