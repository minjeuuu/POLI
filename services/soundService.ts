
// services/soundService.ts

let audioCtx: AudioContext | null = null;

const getContext = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtx;
};

export const initAudio = () => {
    const ctx = getContext();
    if (ctx.state === 'suspended') {
        ctx.resume();
    }
};

export type SFXType = 'click' | 'hover' | 'success' | 'error' | 'swoosh' | 'type' | 'open' | 'close' | 'message' | 'send' | 'notification';

export const playSFX = (type: SFXType) => {
    try {
        const ctx = getContext();
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (type) {
            case 'message':
            case 'notification':
                // Gentle ping
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
            case 'send':
                // Whoosh up
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
            case 'click':
                // High tech click
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
                break;

            case 'hover':
                // Subtle high frequency tick
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(2000, now);
                gainNode.gain.setValueAtTime(0.02, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                osc.start(now);
                osc.stop(now + 0.03);
                break;

            case 'swoosh':
                // White noise burst filter
                const bufferSize = ctx.sampleRate * 0.3; // 0.3 seconds
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }
                const noise = ctx.createBufferSource();
                noise.buffer = buffer;
                const filter = ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(100, now);
                filter.frequency.linearRampToValueAtTime(3000, now + 0.2);
                noise.connect(filter);
                filter.connect(gainNode);
                gainNode.gain.setValueAtTime(0.05, now);
                gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
                noise.start(now);
                break;
            
            case 'open':
                 // Sci-fi open sound
                osc.type = 'sine';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.linearRampToValueAtTime(600, now + 0.1);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.linearRampToValueAtTime(0, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
                break;
            
            case 'close':
                // Sci-fi close
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.linearRampToValueAtTime(300, now + 0.1);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.linearRampToValueAtTime(0, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
                break;

            case 'success':
                // Major chord arpeggio
                const frequencies = [523.25, 659.25, 783.99]; // C Major
                frequencies.forEach((freq, i) => {
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.connect(g);
                    g.connect(ctx.destination);
                    o.frequency.value = freq;
                    g.gain.setValueAtTime(0.05, now + i * 0.05);
                    g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.4);
                    o.start(now + i * 0.05);
                    o.stop(now + i * 0.05 + 0.4);
                });
                break;
            
            case 'error':
                 // Low buzz
                 osc.type = 'sawtooth';
                 osc.frequency.setValueAtTime(100, now);
                 osc.frequency.linearRampToValueAtTime(50, now + 0.2);
                 gainNode.gain.setValueAtTime(0.1, now);
                 gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                 osc.start(now);
                 osc.stop(now + 0.2);
                 break;
            
             case 'type':
                 // Mechanical key
                 osc.type = 'square';
                 osc.frequency.setValueAtTime(800, now);
                 gainNode.gain.setValueAtTime(0.03, now);
                 gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
                 osc.start(now);
                 osc.stop(now + 0.02);
                 break;
        }

    } catch (e) {
        // Silently fail if audio context not allowed
    }
};
