import { motion } from "framer-motion";

export default function BvimLayout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{ height: "100%", color: "var(--text)", fontFamily: "var(--font-family)" }}
    >
      {children}
    </motion.div>
  );
}