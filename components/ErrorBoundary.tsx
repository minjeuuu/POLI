import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in React lifecycle:", error, errorInfo);
    
    // Attempt to report error to the server backend
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        source: 'ErrorBoundary',
        error: error.stack,
        componentStack: errorInfo.componentStack
      })
    }).catch(() => {});
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 bg-academic-bg dark:bg-stone-950 text-academic-text dark:text-stone-100 font-sans">
          <div className="max-w-md w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-950/30 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold font-serif">Something went wrong</h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                POLI encountered a critical rendering error. This could be due to outdated cached assets or connection issues.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-900 rounded-lg text-left overflow-x-auto max-h-32 custom-scrollbar">
                <code className="text-[10px] font-mono text-red-600 dark:text-red-400 break-all leading-normal whitespace-pre-wrap">
                  {this.state.error.toString()}
                </code>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="flex-1 px-4 py-2.5 font-bold uppercase tracking-wider text-xs rounded-lg bg-academic-accent text-white hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Reload Application
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.children;
  }
}
