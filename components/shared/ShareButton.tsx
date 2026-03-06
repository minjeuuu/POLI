import React, { useState } from 'react';
import { Share2, Check, Copy, Link } from 'lucide-react';

interface ShareButtonProps {
    title: string;
    text?: string;
    url?: string;
    className?: string;
    compact?: boolean;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
    title,
    text,
    url,
    className = '',
    compact = false,
}) => {
    const [copied, setCopied] = useState(false);

    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareText = text || title;

    const handleShare = async () => {
        // Try native Web Share API first (works on mobile + modern browsers)
        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share({ title, text: shareText, url: shareUrl });
                return;
            } catch (e: any) {
                // User cancelled or not supported — fall through to clipboard
                if (e?.name === 'AbortError') return;
            }
        }

        // Fallback: copy URL to clipboard
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Last resort: prompt
            prompt('Copy this link:', shareUrl);
        }
    };

    return (
        <button
            onClick={handleShare}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium transition-colors min-h-[36px] ${className}`}
            aria-label="Share"
        >
            {copied ? (
                <>
                    <Check size={15} className="text-green-400" />
                    {!compact && <span className="text-green-400">Copied!</span>}
                </>
            ) : (
                <>
                    <Share2 size={15} />
                    {!compact && <span>Share</span>}
                </>
            )}
        </button>
    );
};
