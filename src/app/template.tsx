"use client";

import { motion } from 'framer-motion';

// By defining the props interface explicitly, we prevent Next.js from passing
// down server-only props like `params` or `searchParams`, which resolves the warning.
interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}
