"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

const pageVariant = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function PageTransition({ children, className, style }) {
  const pathname = usePathname();
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      key={pathname}
      initial={shouldReduce ? false : "hidden"}
      animate={shouldReduce ? false : "enter"}
      exit={shouldReduce ? false : "exit"}
      variants={pageVariant}
      style={{ minHeight: "100%", ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, stagger = 0.12, style, className }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, style, className }) {
  return (
    <motion.div variants={fadeUpVariant} style={style} className={className}>
      {children}
    </motion.div>
  );
}

export function FadeUp({ children, delay = 0, style, className }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ModalAnimation({ children, onBackgroundClick, style, className }) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0 }}
      animate={shouldReduce ? false : { opacity: 1 }}
      exit={shouldReduce ? false : { opacity: 0 }}
      style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60 }}
      className={className}
    >
      <motion.div
        initial={shouldReduce ? false : { opacity: 0 }}
        animate={shouldReduce ? false : { opacity: 1 }}
        exit={shouldReduce ? false : { opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onBackgroundClick}
        style={{ position: "absolute", inset: 0, background: "rgba(13,38,24,0.45)" }}
      />

      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 20 }}
        animate={shouldReduce ? false : { opacity: 1, y: 0 }}
        exit={shouldReduce ? false : { opacity: 0, y: 10 }}
        transition={{ duration: 0.28 }}
        style={{ position: "relative", zIndex: 62, maxWidth: "96%", width: 720, borderRadius: 12, overflow: "hidden", ...style }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function ScrollReveal({ children, threshold = 0.2, distance = 30, duration = 0.6, once = true, className, style }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(el);
          }
        });
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once, shouldReduce]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}
