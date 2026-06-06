
export class LocalStorage {
    static get<T>(key: string): T | null {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static set(key: string, value: any): void {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    }

    static remove(key: string): void {
        window.localStorage.removeItem(key);
    }
}
