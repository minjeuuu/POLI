
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mail, Search, Edit3, Paperclip, Send, Phone, Video, Info, CheckCheck, X, FileText, Loader2, PhoneOff, Mic, MicOff, VideoOff, Camera } from 'lucide-react';
import { ChatConversation, ChatMessage } from '../../types';
import { playSFX } from '../../services/soundService';
import { db } from '../../services/database';

const ICE_SERVERS = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
    ]
};

type CallState = 'idle' | 'calling' | 'receiving' | 'active';
type CallType = 'audio' | 'video';

interface IncomingCallData {
    chatId: string;
    from: string;
    type: CallType;
    offer: RTCSessionDescriptionInit;
}

interface MessageTabProps {
    onNavigate: (type: string, payload: any) => void;
    user?: any;
}

const MessageTab: React.FC<MessageTabProps> = ({ onNavigate, user }) => {
    const [conversations, setConversations] = useState<ChatConversation[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [inputText, setInputText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [toast, setToast] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });

    const [callState, setCallState] = useState<CallState>('idle');
    const [callType, setCallType] = useState<CallType>('audio');
    const [callDuration, setCallDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [incomingCall, setIncomingCall] = useState<IncomingCallData | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const remoteStreamRef = useRef<MediaStream | null>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const callTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const activeChatIdRef = useRef<string | null>(null);

    useEffect(() => {
        activeChatIdRef.current = activeChatId;
    }, [activeChatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversations, activeChatId]);

    useEffect(() => {
        const loadChats = async () => {
            const res = await db.execute("SELECT * FROM chats");
            if (res.success && res.rows.length > 0) {
                setConversations(res.rows);
            } else {
                const defaultChat: ChatConversation = {
                    id: 'general',
                    participant: { name: 'General Channel', role: 'Public', status: 'Online', avatar: 'GC' },
                    lastMessage: 'Welcome to the general channel!',
                    lastTime: 'Now',
                    unread: 0,
                    archived: false,
                    messages: []
                };
                await db.saveItem('chats', { ...defaultChat, messages: undefined });
                setConversations([defaultChat]);
            }
        };
        loadChats();
    }, []);

    const cleanupCall = useCallback(() => {
        if (callTimerRef.current) clearInterval(callTimerRef.current);
        localStreamRef.current?.getTracks().forEach(t => t.stop());
        remoteStreamRef.current?.getTracks().forEach(t => t.stop());
        peerConnectionRef.current?.close();
        peerConnectionRef.current = null;
        localStreamRef.current = null;
        remoteStreamRef.current = null;
        if (localVideoRef.current) localVideoRef.current.srcObject = null;
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
        setCallState('idle');
        setCallDuration(0);
        setIsMuted(false);
        setIsCameraOff(false);
        setIncomingCall(null);
    }, []);

    const startCallTimer = useCallback(() => {
        setCallDuration(0);
        callTimerRef.current = setInterval(() => {
            setCallDuration(d => d + 1);
        }, 1000);
    }, []);

    const createPeerConnection = useCallback(() => {
        const pc = new RTCPeerConnection(ICE_SERVERS);

        pc.onicecandidate = (_e) => {
            // WebRTC ICE signaling requires WebSockets — not supported on Vercel serverless.
        };

        pc.ontrack = (e) => {
            if (remoteVideoRef.current && e.streams[0]) {
                remoteVideoRef.current.srcObject = e.streams[0];
                remoteStreamRef.current = e.streams[0];
            }
        };

        pc.onconnectionstatechange = () => {
            if (pc.connectionState === 'connected') {
                setCallState('active');
                startCallTimer();
            } else if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
                cleanupCall();
            }
        };

        peerConnectionRef.current = pc;
        return pc;
    }, [cleanupCall, startCallTimer]);

    // Poll for new messages every 3 seconds (replaces Socket.IO on Vercel)
    useEffect(() => {
        const poll = setInterval(async () => {
            const chatId = activeChatIdRef.current;
            if (!chatId) return;
            try {
                const res = await fetch(`/api/messages/${chatId}`);
                const msgs = await res.json();
                if (!Array.isArray(msgs)) return;
                setConversations(prev => prev.map(c => {
                    if (c.id !== chatId) return c;
                    const existingIds = new Set((c.messages || []).map((m: any) => m.id));
                    const newMsgs = msgs.filter((m: any) => !existingIds.has(m.id) && m.senderId !== (user?.id || 'guest'));
                    if (!newMsgs.length) return c;
                    newMsgs.forEach(() => playSFX('message'));
                    return { ...c, messages: [...(c.messages || []), ...newMsgs], lastMessage: newMsgs[newMsgs.length - 1].text, lastTime: 'Just now' };
                }));
            } catch { /* ignore */ }
        }, 3000);
        return () => clearInterval(poll);
    }, [user]);

    useEffect(() => {
        if (activeChatId) {
            fetch(`/api/messages/${activeChatId}`)
                .then(res => res.json())
                .then(msgs => {
                    if (Array.isArray(msgs)) {
                        setConversations(prev => prev.map(c =>
                            c.id === activeChatId ? { ...c, messages: msgs } : c
                        ));
                    }
                }).catch(() => {});
        }
    }, [activeChatId]);

    const handleStartCall = async (type: CallType) => {
        if (!activeChatId) return;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: type === 'video'
            });
            localStreamRef.current = stream;
            if (localVideoRef.current && type === 'video') {
                localVideoRef.current.srcObject = stream;
            }
            const pc = createPeerConnection();
            stream.getTracks().forEach(track => pc.addTrack(track, stream));
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            // WebRTC call signaling requires WebSockets — not available on Vercel serverless.
            showToast('Live calls require a WebSocket server. Not available on Vercel.');
            cleanupCall();
            setCallType(type);
            setCallState('idle');
            playSFX('click');
        } catch (err) {
            console.error('Could not start call:', err);
            showToast('Could not access camera/microphone');
        }
    };

    const handleAnswerCall = async () => {
        if (!incomingCall) return;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: incomingCall.type === 'video'
            });
            localStreamRef.current = stream;
            if (localVideoRef.current && incomingCall.type === 'video') {
                localVideoRef.current.srcObject = stream;
            }
            const pc = createPeerConnection();
            stream.getTracks().forEach(track => pc.addTrack(track, stream));
            await pc.setRemoteDescription(incomingCall.offer);
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            // call-answer would go here if WebSockets were available
            setCallType(incomingCall.type);
            setCallState('active');
            startCallTimer();
            setIncomingCall(null);
            playSFX('success');
        } catch (err) {
            console.error('Could not answer call:', err);
            showToast('Could not access camera/microphone');
        }
    };

    const handleDeclineCall = () => {
        if (!incomingCall) return;
        setIncomingCall(null);
    };

    const handleEndCall = () => {
        cleanupCall();
        playSFX('click');
    };

    const toggleMute = () => {
        localStreamRef.current?.getAudioTracks().forEach(t => { t.enabled = !t.enabled; });
        setIsMuted(prev => !prev);
    };

    const toggleCamera = () => {
        localStreamRef.current?.getVideoTracks().forEach(t => { t.enabled = !t.enabled; });
        setIsCameraOff(prev => !prev);
    };

    const formatDuration = (s: number) =>
        `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

    const handleSendMessage = async () => {
        if (!inputText.trim() || !activeChatId) return;
        const newMessage: ChatMessage = {
            id: `msg-${Date.now()}`,
            chatId: activeChatId,
            senderId: user?.id || 'guest',
            text: inputText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };
        setConversations(prev => prev.map(c =>
            c.id === activeChatId
                ? { ...c, messages: [...(c.messages || []), newMessage], lastMessage: inputText, lastTime: 'Just now' }
                : c
        ));
        setInputText('');
        playSFX('send');
        fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newMessage) }).catch(() => {});
    };

    const handleTypingInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value);
        // Typing indicator removed (requires WebSockets)
        if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !activeChatId) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();
            const newMessage: ChatMessage = {
                id: `msg-${Date.now()}`,
                chatId: activeChatId,
                senderId: user?.id || 'guest',
                text: `Sent a file: ${data.filename}`,
                attachments: [{
                    type: data.type.startsWith('image') ? 'image' : 'doc',
                    url: data.url,
                    name: data.filename
                }],
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isMe: true
            };
            fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newMessage) }).catch(() => {});
            setConversations(prev => prev.map(c =>
                c.id === activeChatId
                    ? { ...c, messages: [...(c.messages || []), newMessage], lastMessage: 'Sent a file', lastTime: 'Just now' }
                    : c
            ));
        } catch {
            showToast('Upload failed');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleNewChat = async () => {
        const newId = `c-new-${Date.now()}`;
        const newChat: ChatConversation = {
            id: newId,
            participant: { name: 'New Channel', role: 'Public', status: 'Online', avatar: 'NC' },
            lastMessage: 'Start a new conversation',
            lastTime: 'Now',
            unread: 0,
            archived: false,
            messages: []
        };
        await db.saveItem('chats', { ...newChat, messages: undefined });
        setConversations([newChat, ...conversations]);
        setActiveChatId(newId);
    };

    const showToast = (message: string) => {
        setToast({ visible: true, message });
        setTimeout(() => setToast({ visible: false, message: '' }), 2500);
    };

    const activeChat = conversations.find(c => c.id === activeChatId);
    const filteredConversations = conversations.filter(
        c => !c.archived && c.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-full bg-stone-50 dark:bg-black/20 relative">
            {toast.visible && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-6 py-2.5 rounded-full text-xs font-bold shadow-xl pointer-events-none">
                    {toast.message}
                </div>
            )}

            {/* Incoming Call Banner */}
            {incomingCall && callState === 'idle' && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-4 min-w-[300px] max-w-[90vw]">
                    <div className="w-12 h-12 bg-stone-200 dark:bg-stone-700 rounded-full flex items-center justify-center font-serif font-bold text-stone-600 dark:text-stone-300 flex-shrink-0">
                        {incomingCall.from.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-stone-900 dark:text-stone-100 text-sm truncate">{incomingCall.from}</p>
                        <p className="text-xs text-stone-400">Incoming {incomingCall.type} call...</p>
                    </div>
                    <button onClick={handleDeclineCall} className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex-shrink-0">
                        <PhoneOff className="w-4 h-4" />
                    </button>
                    <button onClick={handleAnswerCall} className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors flex-shrink-0">
                        <Phone className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Active Call Overlay */}
            {(callState === 'calling' || callState === 'active') && (
                <div className="absolute inset-0 z-40 bg-stone-950 flex flex-col items-center justify-center">
                    {callType === 'video' ? (
                        <div className="relative w-full h-full bg-black">
                            <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                            <video
                                ref={localVideoRef}
                                autoPlay
                                playsInline
                                muted
                                className="absolute bottom-24 right-4 w-28 h-20 rounded-xl object-cover border-2 border-white/20 shadow-xl"
                            />
                            {callState === 'calling' && (
                                <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                                    <div className="w-20 h-20 rounded-full bg-stone-800 flex items-center justify-center font-serif font-bold text-4xl text-stone-300">
                                        {activeChat?.participant.avatar || '?'}
                                    </div>
                                    <p className="text-white font-serif text-xl">{activeChat?.participant.name}</p>
                                    <p className="text-stone-400 text-sm">Calling...</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 rounded-full bg-stone-700 flex items-center justify-center font-serif font-bold text-4xl text-stone-300">
                                {activeChat?.participant.avatar || '?'}
                            </div>
                            <p className="text-white font-serif text-2xl font-bold">{activeChat?.participant.name}</p>
                            <p className="text-stone-400 text-sm">
                                {callState === 'calling' ? 'Calling...' : formatDuration(callDuration)}
                            </p>
                        </div>
                    )}

                    <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-5">
                        <button
                            onClick={toggleMute}
                            className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                        </button>
                        {callType === 'video' && (
                            <button
                                onClick={toggleCamera}
                                className={`p-4 rounded-full transition-colors ${isCameraOff ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                            >
                                {isCameraOff ? <VideoOff className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
                            </button>
                        )}
                        <button onClick={handleEndCall} className="p-5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-xl">
                            <PhoneOff className="w-7 h-7" />
                        </button>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <div className={`w-full md:w-80 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex flex-col ${activeChatId ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center">
                    <h2 className="font-serif font-bold text-xl text-academic-text dark:text-stone-100">Messages</h2>
                    <button onClick={handleNewChat} className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full text-academic-accent transition-colors">
                        <Edit3 className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-stone-100 dark:bg-stone-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-academic-accent/20 outline-none"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {filteredConversations.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => {
                                setActiveChatId(chat.id);
                                setConversations(prev => prev.map(c => c.id === chat.id ? { ...c, unread: 0 } : c));
                            }}
                            className={`p-4 border-b border-stone-100 dark:border-stone-800 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors ${activeChatId === chat.id ? 'bg-stone-50 dark:bg-stone-800 border-l-2 border-l-academic-accent' : ''}`}
                        >
                            <div className="flex gap-3">
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-lg font-serif font-bold text-stone-500">
                                        {chat.participant.avatar}
                                    </div>
                                    {chat.participant.status === 'Online' && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-stone-900" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="font-bold text-stone-900 dark:text-stone-100 truncate text-sm">{chat.participant.name}</h3>
                                        <span className="text-[10px] text-stone-400 whitespace-nowrap ml-2">{chat.lastTime}</span>
                                    </div>
                                    <div className="flex justify-between items-center gap-2">
                                        <p className={`text-xs truncate ${chat.unread ? 'font-semibold text-stone-900 dark:text-stone-100' : 'text-stone-500'}`}>
                                            {chat.lastMessage}
                                        </p>
                                        {chat.unread ? (
                                            <span className="flex-shrink-0 min-w-[18px] h-[18px] bg-academic-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                                                {chat.unread}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            {activeChat ? (
                <div className={`flex-1 flex flex-col h-full min-w-0 ${!activeChatId ? 'hidden md:flex' : 'flex'}`}>
                    <div className="h-16 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setActiveChatId(null)} className="md:hidden p-2 -ml-2 text-stone-500">
                                <X className="w-5 h-5" />
                            </button>
                            <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center font-serif font-bold text-stone-500 flex-shrink-0">
                                {activeChat.participant.avatar}
                            </div>
                            <div>
                                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">{activeChat.participant.name}</h3>
                                <span className="text-[10px] text-green-600 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                                    {activeChat.participant.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-0.5 text-stone-400">
                            <button
                                onClick={() => handleStartCall('audio')}
                                title="Voice Call"
                                className="p-2.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full hover:text-green-600 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleStartCall('video')}
                                title="Video Call"
                                className="p-2.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full hover:text-blue-500 transition-colors"
                            >
                                <Video className="w-4 h-4" />
                            </button>
                            <button className="p-2.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors">
                                <Info className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 bg-stone-50 dark:bg-black/20 custom-scrollbar">
                        {(!activeChat.messages || activeChat.messages.length === 0) && (
                            <div className="flex flex-col items-center justify-center py-16 text-stone-400">
                                <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mb-4">
                                    <Mail className="w-8 h-8 opacity-40" />
                                </div>
                                <p className="text-sm font-serif">No messages yet. Say hello!</p>
                            </div>
                        )}
                        {activeChat.messages?.map((msg, i) => (
                            <div key={msg.id || i} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[72%] flex flex-col gap-0.5 ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                    <div className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                                        msg.isMe
                                            ? 'bg-academic-accent text-white rounded-tr-sm'
                                            : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-tl-sm'
                                    }`}>
                                        {msg.attachments?.map((att, idx) => (
                                            <div key={idx} className="mb-2">
                                                {att.type === 'image' ? (
                                                    <img src={att.url} alt="Attachment" className="rounded-lg max-w-full h-auto" />
                                                ) : (
                                                    <a href={att.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-black/10 p-2 rounded text-xs underline">
                                                        <FileText className="w-4 h-4 flex-shrink-0" /> {att.name}
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                    <div className={`flex items-center gap-1 text-[10px] text-stone-400 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                                        <span>{msg.timestamp}</span>
                                        {msg.isMe && <CheckCheck className="w-3 h-3 text-academic-accent/60" />}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-stone-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center">
                                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 md:p-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex-shrink-0">
                        <div className="flex items-end gap-2 max-w-4xl mx-auto">
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2.5 text-stone-400 hover:text-academic-accent hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors flex-shrink-0"
                            >
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <div className="flex-1 bg-stone-100 dark:bg-stone-800 rounded-2xl px-4 py-2">
                                <textarea
                                    value={inputText}
                                    onChange={handleTypingInput}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    placeholder="Type a message..."
                                    className="w-full bg-transparent border-none focus:ring-0 outline-none text-sm max-h-32 resize-none py-1"
                                    rows={1}
                                />
                            </div>
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputText.trim() && !isUploading}
                                className="p-2.5 bg-academic-accent text-white rounded-full hover:bg-academic-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-90 flex-shrink-0"
                            >
                                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="hidden md:flex flex-1 items-center justify-center flex-col text-stone-400 gap-2">
                    <div className="w-20 h-20 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center">
                        <Mail className="w-10 h-10 opacity-40" />
                    </div>
                    <p className="font-serif text-lg">Select a conversation</p>
                    <p className="text-sm text-stone-300 dark:text-stone-600">Or create a new channel to get started</p>
                </div>
            )}
        </div>
    );
};

export default MessageTab;
