
import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react';

const TRACKS = [
    { title: "Study Beats 1", artist: "LoFi Girl", duration: 180 },
    { title: "Academic Ambience", artist: "Library Sounds", duration: 240 },
    { title: "Political Wave", artist: "Synth Politics", duration: 200 }
];

export const MusicPlayerApp: React.FC = () => {
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        handleNext();
                        return 0;
                    }
                    return p + 0.5;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleNext = () => {
        setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
        setProgress(0);
    };

    const handlePrev = () => {
        setCurrentTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
        setProgress(0);
    };

    return (
        <div className="h-full bg-stone-900 text-white flex flex-col rounded-b-lg">
            {/* Visualizer */}
            <div className="h-32 bg-black flex items-end justify-center gap-1 p-4 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-2 bg-gradient-to-t from-indigo-500 to-pink-500 transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-2'}`}
                        style={{ height: isPlaying ? `${Math.random() * 100}%` : '10%' }}
                    ></div>
                ))}
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold font-serif">{TRACKS[currentTrack].title}</h3>
                    <p className="text-stone-400 text-sm">{TRACKS[currentTrack].artist}</p>
                </div>

                <div className="space-y-4">
                    <div className="w-full h-1 bg-stone-700 rounded-full overflow-hidden">
                        <div className="h-full bg-white transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                    </div>

                    <div className="flex justify-center items-center gap-6">
                        <button onClick={handlePrev} className="text-stone-400 hover:text-white"><SkipBack className="w-6 h-6" /></button>
                        <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-1" />}
                        </button>
                        <button onClick={handleNext} className="text-stone-400 hover:text-white"><SkipForward className="w-6 h-6" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
