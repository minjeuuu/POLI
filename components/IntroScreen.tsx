
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { getRandomQuote } from '../data/quotes';
import { Quote } from '../types';

interface IntroScreenProps {
  onContinue: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onContinue }) => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [stage, setStage] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  
  // Animation Stages:
  // 0: Deep Black (0.5s)
  // 1: Flash to White (0.8s)
  // 2: Logo + POLI Reveal (Center) (1.5s)
  // 3: Logo Move Up + Quote Container Appear (1.0s)
  // 4: Quote Typing (Variable)
  // 5: Context Fade In (0.5s)
  // 6: Loading Line (1.5s)
  // 7: Exit (0.8s)

  useEffect(() => {
    // Failsafe
    const failsafe = setTimeout(() => {
        onContinue();
    }, 12000);

    const { quote: randomQuote } = getRandomQuote();
    setQuote(randomQuote);

    // Sequence
    const t1 = setTimeout(() => setStage(1), 500);  // Turn White
    const t2 = setTimeout(() => setStage(2), 1200); // Show Logo
    const t3 = setTimeout(() => setStage(3), 2500); // Move Up & Prep Quote
    const t4 = setTimeout(() => setStage(4), 3200); // Start Typing

    return () => {
      clearTimeout(failsafe);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onContinue]);

  // Typing Effect
  useEffect(() => {
    if (stage === 4 && quote) {
      let currentText = '';
      const fullText = `“${quote.text}”`;
      let i = 0;
      
      const typeInterval = setInterval(() => {
        currentText += fullText.charAt(i);
        setDisplayedText(currentText);
        i++;
        if (i >= fullText.length) {
          clearInterval(typeInterval);
          setTimeout(() => setStage(5), 600); // Trigger Context
        }
      }, 35); // Fast, smooth typing

      return () => clearInterval(typeInterval);
    }
  }, [stage, quote]);

  // Ending Sequence
  useEffect(() => {
    if (stage === 5) {
        setTimeout(() => setStage(6), 800); // Start Loading
    }
    if (stage === 6) {
        setTimeout(() => setStage(7), 2500); // Exit
    }
    if (stage === 7) {
        setTimeout(onContinue, 1000); // Unmount
    }
  }, [stage, onContinue]);

  if (!quote) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-colors duration-[800ms] ease-out 
      ${stage === 0 ? 'bg-black' : 'bg-academic-bg'}
    `}>
      
      {/* Exit Overlay */}
      <div className={`absolute inset-0 bg-academic-bg transition-opacity duration-1000 pointer-events-none ${stage === 7 ? 'opacity-100' : 'opacity-0'}`}></div>

      {/* Main Layout Container - Uses flex to prevent overlap */}
      <div 
        className={`flex flex-col items-center justify-center w-full max-w-4xl px-8 transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1)
        ${stage >= 3 ? 'translate-y-0 gap-16' : 'translate-y-0 gap-8'} 
        ${stage === 7 ? 'opacity-0 -translate-y-12' : 'opacity-100'}
        `}
      >
         {/* BRANDING GROUP */}
         <div className={`flex flex-col items-center transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1)
             ${stage >= 3 ? 'scale-75' : 'scale-100'}
         `}>
            {/* Logo Icon */}
            <div className={`text-academic-accent transition-all duration-1000 ease-out transform ${stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <Logo size="2xl" />
            </div>
            
            {/* Logo Text */}
            <div className={`mt-6 text-center transition-all duration-1000 ease-out delay-100 transform ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h1 className="text-5xl font-serif font-bold tracking-[0.2em] text-academic-accent">POLI</h1>
            </div>
         </div>

         {/* QUOTE GROUP - Fills space below */}
         <div className={`relative w-full text-center transition-opacity duration-1000 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* Quote Text - Spacer for Layout Stability */}
            <div className="relative min-h-[100px] flex justify-center">
                 {/* Invisible full text to reserve height/width and prevent jumping */}
                 <p className="invisible font-serif text-2xl md:text-3xl leading-snug tracking-wide text-academic-text max-w-3xl">
                    “{quote.text}”
                 </p>
                 
                 {/* Visible typing text positioned absolutely over the invisible one if needed, or just centered */}
                 <div className="absolute top-0 left-0 right-0 flex justify-center">
                    <p className="font-serif text-2xl md:text-3xl leading-snug tracking-wide text-academic-text max-w-3xl">
                        {displayedText}
                    </p>
                 </div>
            </div>

            {/* Attribution Area */}
            <div className={`mt-10 flex flex-col items-center gap-3 transition-all duration-1000 ${stage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex flex-col items-center">
                    <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-academic-muted">
                        {quote.author}
                    </span>
                    <div className="flex items-center gap-3 mt-3 text-[10px] text-stone-500 uppercase tracking-[0.15em] font-mono">
                        <span>{quote.region}</span>
                        <span className="w-1 h-1 rounded-full bg-stone-400"></span>
                        <span>{quote.year}</span>
                    </div>
                </div>
            </div>

            {/* Loading Indicator */}
            <div className={`mt-12 mx-auto w-32 h-[2px] bg-stone-200 rounded-full overflow-hidden transition-opacity duration-700 ${stage >= 6 ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`h-full bg-academic-gold transition-all duration-[1500ms] ease-in-out ${stage >= 6 ? 'w-full' : 'w-0'}`}></div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default IntroScreen;
