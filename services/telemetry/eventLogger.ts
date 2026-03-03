
type EventLevel = 'info' | 'warn' | 'error' | 'fatal';

interface LogEvent {
    timestamp: string;
    level: EventLevel;
    message: string;
    meta?: Record<string, any>;
}

class EventLogger {
    private logs: LogEvent[] = [];

    log(level: EventLevel, message: string, meta?: Record<string, any>) {
        const entry: LogEvent = {
            timestamp: new Date().toISOString(),
            level,
            message,
            meta
        };
        this.logs.push(entry);
        
        if (level === 'error' || level === 'fatal') {
            console.error(`[${level.toUpperCase()}] ${message}`, meta);
        } else {
            console.debug(`[${level.toUpperCase()}] ${message}`, meta);
        }
    }

    getLogs() {
        return this.logs;
    }

    clear() {
        this.logs = [];
    }
}

export const logger = new EventLogger();
