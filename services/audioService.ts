
import { ai } from "./common";

// Singleton AudioContext
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
    if (!audioCtx) {
        // Gemini TTS uses 24kHz sample rate
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    return audioCtx;
};

// Helper: Convert Raw PCM (Int16) to AudioBuffer (Float32)
// Gemini API returns raw PCM data without headers.
async function rawPCMToAudioBuffer(
  data: Uint8Array,
  ctx: AudioContext
): Promise<AudioBuffer> {
  const sampleRate = 24000;
  const numChannels = 1;
  
  // Ensure strict alignment for Int16Array
  // If byteOffset is odd, we must copy the buffer
  const alignedBuffer = data.byteOffset % 2 === 0 ? data.buffer : data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  
  const dataInt16 = new Int16Array(alignedBuffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      // Convert Int16 [-32768, 32767] to Float32 [-1.0, 1.0]
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const playTextAsSpeech = async (text: string, voice: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr' = 'Kore'): Promise<void> => {
    if (!text) return;
    
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') {
            await ctx.resume();
        }

        // Limit text length to avoid timeouts or excessive token usage for a single burst
        const cleanText = text.replace(/[*#_\[\]]/g, '').substring(0, 800); 

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: {
                parts: [{ text: cleanText }]
            },
            config: {
                responseModalities: ["AUDIO"], // String literal works for modality
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: voice }
                    }
                }
            }
        });

        const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        
        if (!audioData) {
            console.warn("TTS: No audio data received.");
            return;
        }

        // Decode Base64
        const binaryString = atob(audioData);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Convert PCM to AudioBuffer and Play
        const audioBuffer = await rawPCMToAudioBuffer(bytes, ctx);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.start(0);

    } catch (e) {
        console.error("TTS Playback Error:", e);
    }
};
