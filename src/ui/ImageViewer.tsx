import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageViewerProps {
  src: string;
  alt: string;
  reference?: string;
  onClose: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt, reference, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[1000] bg-slate-900/40 backdrop-blur-[100px] flex items-center justify-center p-2 md:p-6 cursor-zoom-out overflow-y-auto"
      onClick={onClose}
    >
      {/* Background layer click area */}
      <div className="absolute inset-0 z-0" />

      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white backdrop-blur-2xl border border-white/30 hover:bg-white/30 hover:scale-110 active:scale-95 transition-all shadow-xl"
        aria-label="Close viewer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{
          type: "spring",
          damping: 32,
          stiffness: 350,
          mass: 0.8,
          opacity: { duration: 0.25 }
        }}
        className="relative z-10 w-full max-w-[95vw] md:max-w-4xl flex flex-col items-center justify-center cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative group overflow-hidden rounded-xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] bg-white p-2 md:p-3 w-fit">
          <img
            src={src}
            alt={alt}
            className="w-auto h-auto max-w-full max-h-[80vh] object-contain select-none rounded-lg block mx-auto shadow-inner"
          />

          <div className="py-2.5 px-4 flex flex-col sm:flex-row items-center justify-between bg-white w-full border-t border-slate-50 gap-2">
            <h3 className="text-slate-900 font-bold text-sm md:text-base uppercase tracking-wide">{alt}</h3>
            {reference && (
              <a 
                href={reference} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] md:text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Source
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
