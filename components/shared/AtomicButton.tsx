
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AtomicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    isLoading?: boolean;
    fullWidth?: boolean;
}

export const AtomicButton: React.FC<AtomicButtonProps> = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    icon: Icon, 
    iconPosition = 'left', 
    isLoading = false,
    fullWidth = false,
    className = '',
    disabled,
    ...props 
}) => {
    const baseStyle = "font-bold uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm";
    
    const variants = {
        primary: "bg-academic-accent dark:bg-indigo-600 text-white hover:bg-stone-800 dark:hover:bg-indigo-700 hover:shadow-md",
        secondary: "bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-academic-accent dark:hover:border-indigo-500",
        ghost: "bg-transparent text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800",
        danger: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900 hover:bg-red-100",
        gold: "bg-academic-gold text-white hover:bg-yellow-600 shadow-md"
    };

    const sizes = {
        xs: "px-3 py-1.5 text-[9px]",
        sm: "px-4 py-2 text-[10px]",
        md: "px-6 py-3 text-xs",
        lg: "px-8 py-4 text-sm"
    };

    return (
        <button 
            className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />}
            {!isLoading && Icon && iconPosition === 'left' && <Icon className={`w-4 h-4`} />}
            {children}
            {!isLoading && Icon && iconPosition === 'right' && <Icon className={`w-4 h-4`} />}
        </button>
    );
};
