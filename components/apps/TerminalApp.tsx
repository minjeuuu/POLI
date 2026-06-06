
import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { playSFX } from '../../services/soundService';

export const TerminalApp: React.FC = () => {
    const [history, setHistory] = useState<string[]>(["POLI OS v1.0.0", "Type 'help' for commands."]);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const execute = (cmd: string) => {
        const args = cmd.trim().split(' ');
        const command = args[0].toLowerCase();
        
        let output = '';
        
        switch (command) {
            case 'help':
                output = "Available commands: help, clear, echo, date, whoami, neofetch";
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'echo':
                output = args.slice(1).join(' ');
                break;
            case 'date':
                output = new Date().toString();
                break;
            case 'whoami':
                output = "scholar_root";
                break;
            case 'neofetch':
                output = `
       /\\        OS: POLI Archival System
      /  \\       Kernel: 5.15.0-generic
     /    \\      Uptime: Forever
    /      \\     Shell: ZSH
   /________\\    CPU: Quantum Neural Core
  `;
                break;
            default:
                output = `Command not found: ${command}`;
        }

        setHistory(prev => [...prev, `$ ${cmd}`, output]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            playSFX('type');
            execute(input);
            setInput('');
        }
    };

    return (
        <div className="h-full bg-black text-green-500 font-mono p-4 overflow-hidden flex flex-col text-sm rounded-b-lg" onClick={() => inputRef.current?.focus()}>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap break-words">{line}</div>
                ))}
                <div ref={bottomRef} />
            </div>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-blue-400">➜</span>
                <span className="text-pink-400">~</span>
                <input 
                    ref={inputRef}
                    type="text" 
                    className="flex-1 bg-transparent outline-none border-none text-green-500"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            </div>
        </div>
    );
};
