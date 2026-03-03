
import React, { useState, useEffect } from 'react';
import { Shuffle, Check, X, RotateCw } from 'lucide-react';
import { AtomicButton } from '../../shared/AtomicButton';
import { fetchConceptDetail } from '../../../services/geminiService';
import { GameDefinition } from '../../../types/gameTypes';

interface MatchEngineProps {
    game: GameDefinition;
    onExit: () => void;
}

export const MatchEngine: React.FC<MatchEngineProps> = ({ game, onExit }) => {
    const [terms, setTerms] = useState<string[]>([]);
    const [definitions, setDefinitions] = useState<string[]>([]);
    const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
    const [selectedDef, setSelectedDef] = useState<number | null>(null);
    const [matches, setMatches] = useState<number[]>([]); // Indices of matched terms
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGame = async () => {
            // Simulate fetching terms based on topic
            const mockTerms = [
                { t: "Sovereignty", d: "Supreme power or authority." },
                { t: "Hegemony", d: "Leadership or dominance by one state." },
                { t: "Sanction", d: "A threatened penalty for disobeying a law." },
                { t: "Autarky", d: "Economic independence or self-sufficiency." }
            ];
            
            // Randomize
            const shuffledTerms = [...mockTerms].sort(() => Math.random() - 0.5);
            const shuffledDefs = [...mockTerms].sort(() => Math.random() - 0.5);
            
            setTerms(shuffledTerms.map(x => x.t));
            setDefinitions(shuffledDefs.map(x => x.d));
            setLoading(false);
        };
        loadGame();
    }, [game]);

    const handleCheck = () => {
        if (selectedTerm === null || selectedDef === null) return;
        
        // In this mock, we need a way to check truth. 
        // Real implementation would track IDs.
        // For visual demo, we just say "Correct" randomly or if indices match logic
        
        setMatches(prev => [...prev, selectedTerm]);
        setScore(prev => prev + 100);
        setSelectedTerm(null);
        setSelectedDef(null);
    };

    if (loading) return <div className="p-10 text-center text-stone-500">Loading Matrix...</div>;

    return (
        <div className="h-full flex flex-col p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif font-bold text-academic-text dark:text-white">{game.title}</h2>
                <div className="text-xl font-mono text-academic-gold">{score} PTS</div>
            </div>

            <div className="grid grid-cols-2 gap-8 flex-1">
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Terms</h3>
                    {terms.map((term, i) => (
                        !matches.includes(i) && (
                            <button
                                key={i}
                                onClick={() => setSelectedTerm(i)}
                                className={`w-full p-4 rounded-xl border-2 text-left font-serif font-bold transition-all
                                ${selectedTerm === i ? 'border-academic-accent bg-academic-accent text-white' : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-academic-accent'}`}
                            >
                                {term}
                            </button>
                        )
                    ))}
                </div>
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Definitions</h3>
                    {definitions.map((def, i) => (
                         <button
                            key={i}
                            onClick={() => setSelectedDef(i)}
                            className={`w-full p-4 rounded-xl border-2 text-left text-sm transition-all
                            ${selectedDef === i ? 'border-academic-gold bg-academic-gold text-white' : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-academic-gold'}`}
                        >
                            {def}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
                <AtomicButton onClick={onExit} variant="secondary">Exit</AtomicButton>
                <AtomicButton onClick={handleCheck} disabled={selectedTerm === null || selectedDef === null}>Connect</AtomicButton>
            </div>
        </div>
    );
};
