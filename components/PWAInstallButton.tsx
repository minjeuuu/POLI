import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallButton: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showBanner, setShowBanner] = useState(false);
    const [installed, setInstalled] = useState(false);

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setInstalled(true);
            return;
        }

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

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setInstalled(true);
        }
        setShowBanner(false);
        setDeferredPrompt(null);
    };

    if (installed || !showBanner) return null;

    return (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[999] w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-stone-900 dark:bg-stone-800 text-white rounded-2xl shadow-2xl border border-stone-700 overflow-hidden">
                <div className="flex items-center gap-3 p-4">
                    <div className="w-10 h-10 bg-academic-gold/20 rounded-xl flex items-center justify-center flex-none">
                        <Smartphone className="w-5 h-5 text-academic-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm">Install POLI</div>
                        <div className="text-xs text-stone-400 truncate">Add to your home screen for offline access</div>
                    </div>
                    <button
                        onClick={() => setShowBanner(false)}
                        className="p-1.5 hover:bg-stone-700 rounded-lg transition-colors flex-none"
                        aria-label="Dismiss"
                    >
                        <X className="w-4 h-4 text-stone-400" />
                    </button>
                </div>
                <div className="flex gap-2 px-4 pb-4">
                    <button
                        onClick={() => setShowBanner(false)}
                        className="flex-1 py-2 text-xs font-semibold text-stone-400 hover:text-white border border-stone-700 rounded-xl transition-colors"
                    >
                        Not now
                    </button>
                    <button
                        onClick={handleInstall}
                        className="flex-1 py-2 text-xs font-bold bg-academic-gold text-white rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Install App
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PWAInstallButton;
