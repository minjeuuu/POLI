import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Share, ChevronUp, ArrowDown } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Detect iOS (iPhone/iPad) — no beforeinstallprompt, needs manual share-sheet flow
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) && !(window as any).MSStream;
const isInStandaloneMode = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true;

const DISMISSED_KEY = 'poli_pwa_dismissed_at';
const DISMISS_COOLDOWN_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

const PWAInstallButton: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showBanner, setShowBanner] = useState(false);
    const [showIOSGuide, setShowIOSGuide] = useState(false);
    const [installed, setInstalled] = useState(false);

    useEffect(() => {
        // Already running as installed PWA — hide everything
        if (isInStandaloneMode()) {
            setInstalled(true);
            return;
        }

        // Check dismiss cooldown
        const dismissedAt = localStorage.getItem(DISMISSED_KEY);
        if (dismissedAt && Date.now() - Number(dismissedAt) < DISMISS_COOLDOWN_MS) return;

        if (isIOS()) {
            // iOS: show after a short delay so the page loads first
            const t = setTimeout(() => setShowBanner(true), 4000);
            return () => clearTimeout(t);
        }

        // Android / Chrome: wait for beforeinstallprompt
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShowBanner(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        window.addEventListener('appinstalled', () => {
            setInstalled(true);
            setShowBanner(false);
            setDeferredPrompt(null);
        });
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const dismiss = () => {
        localStorage.setItem(DISMISSED_KEY, String(Date.now()));
        setShowBanner(false);
        setShowIOSGuide(false);
    };

    const handleInstall = async () => {
        if (isIOS()) {
            setShowIOSGuide(true);
            return;
        }
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') setInstalled(true);
        setShowBanner(false);
        setDeferredPrompt(null);
    };

    if (installed || !showBanner) return null;

    return (
        <>
            {/* Install Banner */}
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[999] w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-bottom-4 duration-300">
                <div className="bg-stone-950 text-white rounded-2xl shadow-2xl border border-stone-700 overflow-hidden">
                    <div className="flex items-center gap-3 p-4">
                        <div className="w-10 h-10 bg-academic-gold/20 rounded-xl flex items-center justify-center flex-none">
                            <Smartphone className="w-5 h-5 text-academic-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm">Install POLI</div>
                            <div className="text-xs text-stone-400">Add to your home screen for quick access</div>
                        </div>
                        <button onClick={dismiss} className="p-1.5 hover:bg-stone-800 rounded-lg transition-colors flex-none" aria-label="Dismiss">
                            <X className="w-4 h-4 text-stone-400" />
                        </button>
                    </div>
                    <div className="flex gap-2 px-4 pb-4">
                        <button onClick={dismiss} className="flex-1 py-2 text-xs font-semibold text-stone-400 hover:text-white border border-stone-700 rounded-xl transition-colors">
                            Not now
                        </button>
                        <button
                            onClick={handleInstall}
                            className="flex-1 py-2 text-xs font-bold bg-academic-gold text-white rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                        >
                            {isIOS() ? <Share className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                            {isIOS() ? 'How to Install' : 'Install App'}
                        </button>
                    </div>
                </div>
            </div>

            {/* iOS Installation Guide Modal */}
            {showIOSGuide && (
                <div className="fixed inset-0 z-[1000] bg-black/70 flex items-end justify-center p-4" onClick={() => setShowIOSGuide(false)}>
                    <div className="bg-stone-950 rounded-2xl border border-stone-700 w-full max-w-sm p-6 animate-in slide-in-from-bottom duration-300" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-bold text-white text-base">Install on iPhone / iPad</h3>
                            <button onClick={() => setShowIOSGuide(false)} className="p-1 rounded-lg hover:bg-stone-800">
                                <X className="w-4 h-4 text-stone-400" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-7 h-7 rounded-full bg-academic-gold/20 flex items-center justify-center flex-none text-academic-gold font-bold text-xs">1</div>
                                <div>
                                    <p className="text-sm text-white font-medium">Tap the Share button</p>
                                    <p className="text-xs text-stone-400 mt-0.5">In Safari, tap the Share icon at the bottom of the screen</p>
                                </div>
                                <Share className="w-5 h-5 text-stone-400 flex-none mt-0.5" />
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-7 h-7 rounded-full bg-academic-gold/20 flex items-center justify-center flex-none text-academic-gold font-bold text-xs">2</div>
                                <div>
                                    <p className="text-sm text-white font-medium">Scroll down and tap "Add to Home Screen"</p>
                                    <p className="text-xs text-stone-400 mt-0.5">Look for the icon with a plus (+) sign in the share sheet</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-7 h-7 rounded-full bg-academic-gold/20 flex items-center justify-center flex-none text-academic-gold font-bold text-xs">3</div>
                                <div>
                                    <p className="text-sm text-white font-medium">Tap "Add" to confirm</p>
                                    <p className="text-xs text-stone-400 mt-0.5">POLI will appear on your home screen like a native app</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 p-3 bg-stone-900 rounded-xl border border-stone-800">
                            <p className="text-xs text-stone-400 text-center">Note: This only works in <span className="text-white font-medium">Safari</span>. If you are using Chrome or Firefox on iOS, open this page in Safari first.</p>
                        </div>
                        <button onClick={() => { setShowIOSGuide(false); dismiss(); }} className="w-full mt-4 py-2.5 bg-academic-gold text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default PWAInstallButton;

// Export a hook so other components (e.g. Settings) can trigger install
export const usePWAInstall = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [canInstall, setCanInstall] = useState(false);
    const [isInstalled, setIsInstalled] = useState(isInStandaloneMode);

    useEffect(() => {
        if (isInstalled) return;
        if (isIOS()) { setCanInstall(true); return; }
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setCanInstall(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        window.addEventListener('appinstalled', () => { setIsInstalled(true); setCanInstall(false); });
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, [isInstalled]);

    const install = async (): Promise<boolean> => {
        if (isIOS()) return false; // caller should show iOS guide
        if (!deferredPrompt) return false;
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        return outcome === 'accepted';
    };

    return { canInstall, isInstalled, isIOS: isIOS(), install };
};
