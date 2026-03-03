
export class SessionStorage {
    static get<T>(key: string): T | null {
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static set(key: string, value: any): void {
        try {
            window.sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    }
}
