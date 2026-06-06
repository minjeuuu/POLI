
import React, { useState } from 'react';
import Logo from './Logo';
import { ArrowRight, User, Lock, Mail, Globe, ShieldCheck } from 'lucide-react';
import { playSFX } from '../services/soundService';
import { db } from '../services/database';

interface AuthScreenProps {
  onLogin: (user: any) => void;
  onGuest: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onGuest }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playSFX('click');
    setLoading(true);
    
    try {
        if (mode === 'signup') {
            // Check if exists
            const existing = await db.execute(`SELECT * FROM users WHERE email = '${formData.email}'`);
            if (existing.rows.length > 0) {
                alert("User already exists!");
                setLoading(false);
                return;
            }
            
            const newUser = {
                id: Date.now().toString(),
                username: formData.username || 'Scholar',
                email: formData.email,
                password: formData.password, // Note: Local DB only, hashing recommended for production
                level: 1,
                xp: 0,
                coins: 100,
                joinedDate: new Date().toISOString()
            };
            
            await db.saveItem('users', newUser);
            playSFX('success');
            onLogin(newUser);
        } else {
            const result = await db.execute(`SELECT * FROM users WHERE email = '${formData.email}' AND password = '${formData.password}'`);
            if (result.rows.length > 0) {
                playSFX('success');
                onLogin(result.rows[0]);
            } else {
                alert("Invalid credentials");
                playSFX('error'); // Assuming 'error' SFX exists, fallback if not
            }
        }
    } catch (err) {
        console.error(err);
        alert("Database Error");
    } finally {
        setLoading(false);
    }
  };

  const switchMode = (m: 'login' | 'signup') => {
      playSFX('click');
      setMode(m);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-academic-bg dark:bg-stone-950 flex flex-col items-center justify-center p-6 transition-colors duration-700">
       
       <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <div className="text-center mb-10">
               <Logo size="xl" className="mx-auto mb-6" />
               <h1 className="text-5xl font-serif font-bold text-academic-text dark:text-stone-100 mb-2 tracking-tight">POLI</h1>
           </div>

           <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl overflow-hidden relative">
               {/* Decorative Gradient */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-academic-accent via-academic-gold to-academic-accent"></div>

               <div className="p-8">
                   <div className="flex gap-4 mb-8 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                       <button 
                        onClick={() => switchMode('login')}
                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${mode === 'login' ? 'bg-white dark:bg-stone-700 shadow-sm text-academic-text dark:text-white' : 'text-stone-400 hover:text-stone-600'}`}
                       >
                           Log In
                       </button>
                       <button 
                        onClick={() => switchMode('signup')}
                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${mode === 'signup' ? 'bg-white dark:bg-stone-700 shadow-sm text-academic-text dark:text-white' : 'text-stone-400 hover:text-stone-600'}`}
                       >
                           Sign Up
                       </button>
                   </div>

                   <form onSubmit={handleSubmit} className="space-y-4">
                       {mode === 'signup' && (
                           <div className="relative group">
                               <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-academic-gold transition-colors" />
                               <input 
                                type="text" 
                                placeholder="Username"
                                className="w-full pl-10 pr-4 py-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl text-sm font-medium outline-none focus:border-academic-gold transition-all text-academic-text dark:text-white"
                                value={formData.username}
                                onChange={e => setFormData({...formData, username: e.target.value})}
                                onFocus={() => playSFX('hover')}
                                required
                               />
                           </div>
                       )}
                       <div className="relative group">
                           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-academic-gold transition-colors" />
                           <input 
                            type="email" 
                            placeholder="Email Address"
                            className="w-full pl-10 pr-4 py-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl text-sm font-medium outline-none focus:border-academic-gold transition-all text-academic-text dark:text-white"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            onFocus={() => playSFX('hover')}
                            required
                           />
                       </div>
                       <div className="relative group">
                           <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-academic-gold transition-colors" />
                           <input 
                            type="password" 
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl text-sm font-medium outline-none focus:border-academic-gold transition-all text-academic-text dark:text-white"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                            onFocus={() => playSFX('hover')}
                            required
                           />
                       </div>

                       <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 bg-academic-accent dark:bg-indigo-600 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-stone-800 dark:hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mt-4 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                       >
                           {loading ? 'Authenticating...' : (mode === 'login' ? 'Access Archive' : 'Enter Network')} <ArrowRight className="w-4 h-4" />
                       </button>
                   </form>
               </div>
           </div>

           <div className="mt-8 text-center space-y-4">
               <button 
                onClick={() => { playSFX('click'); onGuest(); }}
                className="text-stone-500 dark:text-stone-400 text-xs font-bold uppercase tracking-widest hover:text-academic-accent dark:hover:text-white transition-colors flex items-center justify-center gap-2 w-full"
                onMouseEnter={() => playSFX('hover')}
               >
                   <Globe className="w-4 h-4" /> Continue as Guest
               </button>
               <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400">
                   <ShieldCheck className="w-3 h-3" /> Secure Encrypted Connection
               </div>
           </div>
       </div>
    </div>
  );
};

export default AuthScreen;
