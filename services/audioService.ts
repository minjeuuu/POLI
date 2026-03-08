// Text-to-Speech via browser Web Speech API (replaces Gemini TTS)

export const playTextAsSpeech = async (text: string, _voice?: string): Promise<void> => {
    if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const cleanText = text.replace(/[*#_\[\]]/g, '').substring(0, 800);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.lang = 'en-US';

    // Pick a natural-sounding voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang === 'en-US' && v.localService) || voices.find(v => v.lang.startsWith('en'));
    if (preferred) utterance.voice = preferred;

    return new Promise((resolve) => {
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
    });
};
