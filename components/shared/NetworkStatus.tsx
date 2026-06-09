import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      // Re-check to be sure
      handleReconnect();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setShowToast(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check bypasses navigator.onLine which is buggy in iframes
    handleReconnect();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleReconnect = async () => {
    if (isChecking) return;
    setIsChecking(true);
    
    try {
      // Bypass cache and check
      const res = await fetch('/api/health?_t=' + new Date().getTime(), { 
        method: 'GET',
        cache: 'no-store'
      });
      if (res.ok) {
        setIsOnline(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        setIsOnline(false);
      }
    } catch (e) {
      setIsOnline(false);
    } finally {
      setIsChecking(false);
    }
  };

  if (isOnline && !showToast) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-[100] flex items-center gap-3 p-3 rounded-lg shadow-lg border transition-all duration-300 ${isOnline ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-800' : 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/80 dark:text-red-200 dark:border-red-800'}`}>
      <div className="flex items-center gap-2">
        {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
        <span className="text-xs font-bold uppercase tracking-wider">
          {isOnline ? 'Connection Restored' : 'Network Offline'}
        </span>
      </div>
      
      {!isOnline && (
        <button 
          onClick={handleReconnect}
          disabled={isChecking}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 rounded text-[10px] font-bold uppercase tracking-wider transition-colors"
        >
          <RefreshCw className={`w-3 h-3 ${isChecking ? 'animate-spin' : ''}`} />
          {isChecking ? 'Checking...' : 'Reconnect'}
        </button>
      )}
    </div>
  );
};

export default NetworkStatus;
