
export class SocketService {
    private isConnected: boolean = false;
    private listeners: Record<string, Function[]> = {};

    connect() {
        this.isConnected = true;
        console.log("Socket Connected (Simulated)");
    }

    disconnect() {
        this.isConnected = false;
        console.log("Socket Disconnected");
    }

    emit(event: string, data: any) {
        if (!this.isConnected) return;
        console.log(`[Socket Out] ${event}:`, data);
    }

    on(event: string, callback: Function) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }
}

export const socket = new SocketService();
