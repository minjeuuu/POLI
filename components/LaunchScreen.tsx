
import React, { useEffect } from 'react';
import Logo from './Logo';
import { motion } from 'framer-motion';
import { playSFX } from '../services/soundService';

interface LaunchScreenProps {
  onComplete: () => void;
}

const LaunchScreen: React.FC<LaunchScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    playSFX('success');
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#fdfcfaf0] dark:bg-[#0a0a0af0] backdrop-blur-xl selection:bg-transparent overflow-hidden"
    >
       {/* Ambient glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-academic-gold/5 dark:bg-academic-gold/5 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }}></div>
       
      <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col items-center relative z-10"
      >
        <Logo size="lg" className="mb-6 drop-shadow-md" />
        <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
            className="text-6xl font-serif font-bold tracking-[0.3em] text-academic-accent dark:text-stone-100 ml-3 drop-shadow-sm"
        >
          POLI
        </motion.h1>
        <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
            className="text-xs uppercase tracking-[0.4em] text-stone-500 font-mono mt-4"
        >
            Academic Intelligence
        </motion.p>
        <motion.div
           initial={{ scaleX: 0, opacity: 0 }}
           animate={{ scaleX: 1, opacity: 1 }}
           transition={{ delay: 1.2, duration: 1.5, ease: "anticipate" }}
           className="h-[1px] w-24 bg-academic-gold mt-8"
        />
      </motion.div>
    </motion.div>
  );
};

export default LaunchScreen;
