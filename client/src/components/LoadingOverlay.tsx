import { motion, AnimatePresence } from "framer-motion";

interface LoadingOverlayProps {
  isVisible: boolean;
}

export default function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          data-testid="loading-overlay"
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p
              className="text-xl font-sans text-primary font-bold tracking-wide"
              style={{ fontFamily: "'Inter', sans-serif", textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
            >
              Loading DYMUN Experience...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}