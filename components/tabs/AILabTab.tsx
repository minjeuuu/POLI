
import React, { useState, useRef, useEffect } from 'react';
import {
    Video, Image as ImageIcon, Mic, Brain, Search, Map as MapIcon,
    MessageSquare, Play, StopCircle, Upload, Wand2, Loader2, Sparkles,
    MonitorPlay, FileAudio, FileVideo, ScanEye, Send, Bot
} from 'lucide-react';
import {
    generateImage, generateVideo, editImage, generateSpeech,
    analyzeImage, analyzeVideo, groundedSearch, groundedMaps,
    thinkingMode, connectLiveSession, transcribeAudio
} from '../../services/geminiService';
import { streamWithClaude } from '../../services/claudeService';
import { AtomicCard } from '../shared/AtomicCard';

const AILabTab: React.FC = () => {
    const [activeTool, setActiveTool] = useState<string>('claude-chat');

    const tools = [
        { id: 'claude-chat', label: 'Claude Chat', icon: Bot, desc: 'Streaming political analysis with Claude', badge: 'Claude' },
        { id: 'think', label: 'Deep Thinker', icon: Brain, desc: 'Complex reasoning & analysis', badge: 'Gemini' },
        { id: 'search', label: 'Grounded Search', icon: Search, desc: 'Google Search grounded AI', badge: 'Gemini' },
        { id: 'veo', label: 'Veo Studio', icon: Video, desc: 'Generate videos from text & images', badge: 'Gemini' },
        { id: 'nano', label: 'Nano Banana', icon: Wand2, desc: 'Edit images with natural language', badge: 'Gemini' },
        { id: 'pro-image', label: 'Pro Image Lab', icon: ImageIcon, desc: 'High-fidelity image generation', badge: 'Gemini' },
        { id: 'live', label: 'Live Debate', icon: Mic, desc: 'Real-time voice conversation', badge: 'Gemini' },
        { id: 'analyst', label: 'Media Analyst', icon: ScanEye, desc: 'Analyze images & videos', badge: 'Gemini' },
        { id: 'transcribe', label: 'Transcriber', icon: Mic, desc: 'Audio to text', badge: 'Gemini' },
        { id: 'tts', label: 'TTS Studio', icon: FileAudio, desc: 'Text-to-Speech synthesis', badge: 'Gemini' },
        { id: 'maps', label: 'Grounded Maps', icon: MapIcon, desc: 'Location-aware AI', badge: 'Gemini' },
    ];

    const badgeColor = (badge: string) =>
        badge === 'Claude' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';

    return (
        <div className="h-full flex flex-col bg-stone-50 dark:bg-stone-950 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-indigo-500" />
                        AI Lab
                    </h1>
                    <p className="text-stone-500 dark:text-stone-400 text-sm">Powered by Claude (Anthropic) and Gemini (Google DeepMind)</p>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 overflow-y-auto hidden md:block">
                    <div className="p-4 space-y-1">
                        {tools.map((tool) => (
                            <button
                                key={tool.id}
                                onClick={() => setActiveTool(tool.id)}
                                className={`w-full flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all text-left
                                ${activeTool === tool.id
                                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'}`}
                            >
                                <tool.icon className="w-4 h-4 flex-none" />
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold flex items-center gap-1">
                                        {tool.label}
                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${badgeColor(tool.badge)}`}>{tool.badge}</span>
                                    </div>
                                    <div className="text-[10px] opacity-70 font-normal truncate">{tool.desc}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto">
                        {activeTool === 'claude-chat' && <ClaudeChat />}
                        {activeTool === 'veo' && <VeoStudio />}
                        {activeTool === 'nano' && <NanoBanana />}
                        {activeTool === 'pro-image' && <ProImageLab />}
                        {activeTool === 'live' && <LiveDebate />}
                        {activeTool === 'think' && <DeepThinker />}
                        {activeTool === 'analyst' && <MediaAnalyst />}
                        {activeTool === 'transcribe' && <Transcriber />}
                        {activeTool === 'tts' && <TTSStudio />}
                        {activeTool === 'search' && <GroundedSearch />}
                        {activeTool === 'maps' && <GroundedMaps />}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Claude Chat Component ---
const ClaudeChat = () => {
    const [messages, setMessages] = useState<{role: 'user'|'assistant', content: string}[]>([]);
    const [input, setInput] = useState('');
    const [streaming, setStreaming] = useState(false);
    const [streamingText, setStreamingText] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamingText]);

    const handleSend = async () => {
        if (!input.trim() || streaming) return;
        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setStreaming(true);
        setStreamingText('');

        let full = '';
        const systemPrompt = `You are POLI, an expert political science research assistant.
You provide detailed, academic, and neutral analysis of political topics, countries, ideologies, and events.
Use advanced political science terminology where appropriate.`;

        try {
            for await (const chunk of streamWithClaude(userMsg, systemPrompt)) {
                full += chunk;
                setStreamingText(full);
            }
        } catch (e) {
            full = 'Error connecting to Claude. Please try again.';
        }

        setMessages(prev => [...prev, { role: 'assistant', content: full }]);
        setStreamingText('');
        setStreaming(false);
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };

    return (
        <div className="flex flex-col h-[600px] bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                    <h2 className="font-bold text-sm">Claude by Anthropic</h2>
                    <p className="text-[10px] text-stone-500">Political science expert — streaming responses</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.length === 0 && (
                    <div className="text-center text-stone-400 py-12">
                        <Bot className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">Ask Claude about any political topic, country, ideology, or event.</p>
                        <p className="text-xs mt-2 opacity-70">Try: "Analyze the geopolitical implications of..." or "Compare the political systems of..."</p>
                    </div>
                )}
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                            msg.role === 'user'
                                ? 'bg-indigo-600 text-white rounded-tr-sm'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-tl-sm font-serif'
                        }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {streamingText && (
                    <div className="flex justify-start">
                        <div className="max-w-[85%] p-3 rounded-2xl rounded-tl-sm bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm leading-relaxed whitespace-pre-wrap font-serif">
                            {streamingText}
                            <span className="inline-block w-2 h-4 bg-orange-500 ml-1 animate-pulse rounded-sm" />
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            <div className="p-4 border-t border-stone-200 dark:border-stone-800">
                <div className="flex gap-2">
                    <textarea
                        className="flex-1 p-3 border border-stone-200 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                        placeholder="Ask Claude about any political topic..."
                        rows={2}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        disabled={streaming}
                    />
                    <button
                        onClick={handleSend}
                        disabled={streaming || !input.trim()}
                        className="px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold disabled:opacity-50 transition-colors flex items-center justify-center"
                    >
                        {streaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Sub-Components ---

const VeoStudio = () => {
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = async () => {
        setLoading(true);
        const res = await generateVideo(prompt, aspectRatio, image || undefined);
        setResult(res);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Veo Studio (Video Generation)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <textarea 
                        className="w-full p-3 border rounded-lg bg-white dark:bg-stone-800 dark:border-stone-700" 
                        placeholder="Describe the video..."
                        rows={4}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="flex gap-4">
                        <select 
                            className="p-2 border rounded-lg bg-white dark:bg-stone-800"
                            value={aspectRatio}
                            onChange={(e) => setAspectRatio(e.target.value as any)}
                        >
                            <option value="16:9">Landscape (16:9)</option>
                            <option value="9:16">Portrait (9:16)</option>
                        </select>
                        <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800">
                            <Upload className="w-4 h-4" />
                            <span className="text-sm">Upload Start Image</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleFile} />
                        </label>
                    </div>
                    {image && <img src={image} alt="Start" className="h-20 rounded border" />}
                    <button 
                        onClick={handleGenerate}
                        disabled={loading || !prompt}
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Video className="w-5 h-5" />}
                        Generate Video
                    </button>
                </div>
                <div className="bg-black rounded-xl aspect-video flex items-center justify-center overflow-hidden border border-stone-800">
                    {result ? (
                        <video src={result} controls autoPlay loop className="w-full h-full object-contain" />
                    ) : (
                        <div className="text-stone-500 flex flex-col items-center">
                            <MonitorPlay className="w-12 h-12 mb-2 opacity-50" />
                            <span className="text-sm">Preview Area</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const NanoBanana = () => {
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = async () => {
        if (!image) return;
        setLoading(true);
        const res = await editImage(image, prompt);
        setResult(res);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Nano Banana (Image Editing)</h2>
            <div className="space-y-4">
                <div className="flex gap-4 items-center">
                    <label className="px-4 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700">
                        Upload Image
                        <input type="file" className="hidden" accept="image/*" onChange={handleFile} />
                    </label>
                    <input 
                        type="text" 
                        className="flex-1 p-2 border rounded-lg bg-white dark:bg-stone-800" 
                        placeholder="Instruction (e.g., 'Add a retro filter', 'Remove background')"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button 
                        onClick={handleEdit}
                        disabled={loading || !image || !prompt}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Edit'}
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square bg-stone-100 dark:bg-stone-900 rounded-lg border flex items-center justify-center overflow-hidden">
                        {image ? <img src={image} className="w-full h-full object-contain" /> : <span className="text-stone-400">Original</span>}
                    </div>
                    <div className="aspect-square bg-stone-100 dark:bg-stone-900 rounded-lg border flex items-center justify-center overflow-hidden">
                        {result ? <img src={result} className="w-full h-full object-contain" /> : <span className="text-stone-400">Result</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProImageLab = () => {
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [size, setSize] = useState('1K');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleGenerate = async () => {
        setLoading(true);
        const res = await generateImage(prompt, 'gemini-3.1-flash-image-preview', { aspectRatio, imageSize: size });
        setResult(res);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Pro Image Lab</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <textarea 
                        className="w-full p-3 border rounded-lg bg-white dark:bg-stone-800" 
                        placeholder="Describe the image in detail..."
                        rows={4}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <select className="p-2 border rounded-lg bg-white dark:bg-stone-800" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
                            {['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'].map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                        <select className="p-2 border rounded-lg bg-white dark:bg-stone-800" value={size} onChange={(e) => setSize(e.target.value)}>
                            {['1K', '2K', '4K'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <button 
                        onClick={handleGenerate}
                        disabled={loading || !prompt}
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Generate High-Res Image'}
                    </button>
                </div>
                <div className="bg-stone-100 dark:bg-stone-900 rounded-xl aspect-square flex items-center justify-center overflow-hidden border">
                    {result ? <img src={result} className="w-full h-full object-contain" /> : <ImageIcon className="w-12 h-12 text-stone-300" />}
                </div>
            </div>
        </div>
    );
};

const LiveDebate = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [session, setSession] = useState<any>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggleSession = async () => {
        if (isConnected) {
            // session.close(); // Implement close logic if available
            setIsConnected(false);
            setSession(null);
        } else {
            try {
                const s = await connectLiveSession((base64Audio) => {
                    if (audioRef.current) {
                        audioRef.current.src = `data:audio/mp3;base64,${base64Audio}`;
                        audioRef.current.play();
                    }
                });
                setSession(s);
                setIsConnected(true);
            } catch (e) {
                console.error("Failed to connect", e);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-[400px] space-y-8">
            <h2 className="text-2xl font-bold">Live Debate (Voice)</h2>
            <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${isConnected ? 'bg-red-500 shadow-[0_0_50px_rgba(239,68,68,0.5)]' : 'bg-stone-200 dark:bg-stone-800'}`}>
                <Mic className={`w-12 h-12 ${isConnected ? 'text-white animate-pulse' : 'text-stone-400'}`} />
            </div>
            <button 
                onClick={toggleSession}
                className={`px-8 py-3 rounded-full font-bold text-lg transition-colors ${isConnected ? 'bg-stone-800 text-white hover:bg-stone-900' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
            >
                {isConnected ? 'End Session' : 'Start Conversation'}
            </button>
            <audio ref={audioRef} className="hidden" />
            <p className="text-stone-500 text-sm">Powered by Gemini 2.5 Native Audio</p>
        </div>
    );
};

const DeepThinker = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleThink = async () => {
        setLoading(true);
        const res = await thinkingMode(query);
        setResponse(res);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2"><Brain className="text-indigo-500" /> Deep Thinker</h2>
            <textarea 
                className="w-full p-4 border rounded-lg bg-white dark:bg-stone-800 font-serif text-lg" 
                placeholder="Ask a complex question requiring reasoning..."
                rows={3}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button 
                onClick={handleThink}
                disabled={loading || !query}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold disabled:opacity-50"
            >
                {loading ? 'Thinking...' : 'Analyze Deeply'}
            </button>
            {response && (
                <div className="p-6 bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 prose dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-serif">{response}</pre>
                </div>
            )}
        </div>
    );
};

const MediaAnalyst = () => {
    const [prompt, setPrompt] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) {
            setFile(f);
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target?.result as string);
            reader.readAsDataURL(f);
        }
    };

    const handleAnalyze = async () => {
        if (!preview) return;
        setLoading(true);
        let res = '';
        if (file?.type.startsWith('video')) {
            res = await analyzeVideo(preview, prompt);
        } else {
            res = await analyzeImage(preview, prompt);
        }
        setResult(res);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Media Analyst</h2>
            <div className="flex gap-4">
                <label className="flex-1 h-32 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800">
                    {preview ? (
                        file?.type.startsWith('video') ? <video src={preview} className="h-full" /> : <img src={preview} className="h-full object-contain" />
                    ) : (
                        <div className="text-center text-stone-400">
                            <Upload className="w-8 h-8 mx-auto mb-2" />
                            <span>Upload Image or Video</span>
                        </div>
                    )}
                    <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFile} />
                </label>
            </div>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    className="flex-1 p-3 border rounded-lg bg-white dark:bg-stone-800" 
                    placeholder="What should I look for?"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button 
                    onClick={handleAnalyze}
                    disabled={loading || !preview}
                    className="px-6 bg-indigo-600 text-white rounded-lg font-bold disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" /> : 'Analyze'}
                </button>
            </div>
            {result && (
                <div className="p-4 bg-stone-100 dark:bg-stone-900 rounded-lg">
                    <p className="whitespace-pre-wrap">{result}</p>
                </div>
            )}
        </div>
    );
};

const Transcriber = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [transcript, setTranscript] = useState('');
    const [loading, setLoading] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks: BlobPart[] = [];
            
            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/mp3' });
                setAudioBlob(blob);
            };
            
            recorder.start();
            mediaRecorderRef.current = recorder;
            setIsRecording(true);
        } catch (e) {
            console.error("Mic access denied", e);
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    const handleTranscribe = async () => {
        if (!audioBlob) return;
        setLoading(true);
        
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;
            const res = await transcribeAudio(base64);
            setTranscript(res);
            setLoading(false);
        };
        reader.readAsDataURL(audioBlob);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Audio Transcriber</h2>
            <div className="flex flex-col items-center gap-4 p-8 border-2 border-dashed rounded-xl bg-stone-50 dark:bg-stone-900">
                <button 
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {isRecording ? <StopCircle className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
                </button>
                <p className="text-sm text-stone-500">{isRecording ? 'Recording...' : 'Click to Record'}</p>
                
                {audioBlob && !isRecording && (
                    <div className="flex gap-4 w-full justify-center">
                        <audio controls src={URL.createObjectURL(audioBlob)} />
                        <button 
                            onClick={handleTranscribe}
                            disabled={loading}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : 'Transcribe'}
                        </button>
                    </div>
                )}
            </div>
            {transcript && (
                <div className="p-6 bg-white dark:bg-stone-800 rounded-xl border shadow-sm">
                    <h3 className="font-bold mb-2 text-sm uppercase tracking-wider text-stone-500">Transcript</h3>
                    <p className="whitespace-pre-wrap font-serif text-lg">{transcript}</p>
                </div>
            )}
        </div>
    );
};

const TTSStudio = () => {
    const [text, setText] = useState('');
    const [voice, setVoice] = useState('Kore');
    const [audio, setAudio] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSpeak = async () => {
        setLoading(true);
        const res = await generateSpeech(text, voice);
        setAudio(res);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">TTS Studio</h2>
            <textarea 
                className="w-full p-4 border rounded-lg bg-white dark:bg-stone-800" 
                placeholder="Enter text to speak..."
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="flex gap-4 items-center">
                <select 
                    className="p-3 border rounded-lg bg-white dark:bg-stone-800"
                    value={voice}
                    onChange={(e) => setVoice(e.target.value)}
                >
                    {['Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
                <button 
                    onClick={handleSpeak}
                    disabled={loading || !text}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold disabled:opacity-50 flex items-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Play className="w-4 h-4" />}
                    Generate Speech
                </button>
            </div>
            {audio && (
                <audio controls src={audio} className="w-full mt-4" autoPlay />
            )}
        </div>
    );
};

const GroundedSearch = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<{text: string, chunks: any[]} | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        const res = await groundedSearch(query);
        setResult(res);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Grounded Search</h2>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    className="flex-1 p-3 border rounded-lg bg-white dark:bg-stone-800" 
                    placeholder="Search for recent events..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button 
                    onClick={handleSearch}
                    disabled={loading || !query}
                    className="px-6 bg-indigo-600 text-white rounded-lg font-bold disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Search className="w-5 h-5" />}
                </button>
            </div>
            {result && (
                <div className="space-y-4">
                    <div className="p-4 bg-white dark:bg-stone-900 rounded-lg border shadow-sm">
                        <p className="whitespace-pre-wrap">{result.text}</p>
                    </div>
                    {result.chunks && result.chunks.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {result.chunks.map((chunk: any, i: number) => (
                                chunk.web?.uri && (
                                    <a key={i} href={chunk.web.uri} target="_blank" rel="noreferrer" className="block p-3 bg-stone-50 dark:bg-stone-800 rounded border hover:bg-stone-100 truncate text-sm text-indigo-600">
                                        {chunk.web.title || chunk.web.uri}
                                    </a>
                                )
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const GroundedMaps = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<{text: string, chunks: any[]} | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        // Mock location for demo (San Francisco)
        const res = await groundedMaps(query, { lat: 37.7749, lng: -122.4194 });
        setResult(res);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Grounded Maps</h2>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    className="flex-1 p-3 border rounded-lg bg-white dark:bg-stone-800" 
                    placeholder="Find places nearby..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button 
                    onClick={handleSearch}
                    disabled={loading || !query}
                    className="px-6 bg-indigo-600 text-white rounded-lg font-bold disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <MapIcon className="w-5 h-5" />}
                </button>
            </div>
            {result && (
                <div className="space-y-4">
                    <div className="p-4 bg-white dark:bg-stone-900 rounded-lg border shadow-sm">
                        <p className="whitespace-pre-wrap">{result.text}</p>
                    </div>
                    {/* Map chunks usually contain place IDs or URIs */}
                </div>
            )}
        </div>
    );
};

export default AILabTab;
