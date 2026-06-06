
import React, { useEffect } from 'react';
import Logo from './Logo';

interface LaunchScreenProps {
  onComplete: () => void;
}

const LaunchScreen: React.FC<LaunchScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5s display time
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-academic-bg animate-out fade-out duration-1000 fill-mode-forwards pointer-events-none">
      <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-1000">
        <Logo size="lg" className="mb-8" />
        <h1 className="text-5xl font-serif font-bold tracking-[0.3em] text-academic-accent">POLI</h1>
      </div>
    </div>
  );
};

export default LaunchScreen;
