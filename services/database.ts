import { db as firestore, auth } from './firebaseService';
import { doc, setDoc, getDoc, getDocs, deleteDoc, collection } from 'firebase/firestore';

/**
 * POLI ARCHIVE DATABASE ENGINE (PADE)
 * v10.0 - SQL-over-IndexedDB Implementation with Safe In-Memory Fallback
 */

const DB_NAME = 'POLI_ARCHIVE_DB';
const DB_VERSION = 3;

export interface DBResult {
    rows: any[];
    success: boolean;
    message?: string;
}

class DatabaseService {
    private db: IDBDatabase | null = null;
    private memoryDb: Record<string, any[]> = {
        users: [],
        saved_items: [],
        chats: [],
        messages: [],
        history_logs: [],
        posts: []
    };

    constructor() {
        this.init().catch(err => {
            console.warn("Database initialization failed, utilizing memory fallback:", err);
        });
    }

    async syncFromFirestore(): Promise<void> {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) return;

            // 1. Sync User Profile
            const userDocRef = doc(firestore, "users", currentUser.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                await this.handleInsert(`INSERT INTO users`, [userData]);
            }

            // 2. Sync Saved Items
            const savedColRef = collection(firestore, "users", currentUser.uid, "saved_items");
            const savedSnapshot = await getDocs(savedColRef);
            for (const d of savedSnapshot.docs) {
                const savedData = d.data();
                await this.handleInsert(`INSERT INTO saved_items`, [savedData]);
            }
        } catch (e) {
            console.warn("Firestore sync failed (offline or unauthenticated):", e);
        }
    }

    async init(): Promise<void> {
        if (typeof window === 'undefined' || !window.indexedDB) {
            console.warn("IndexedDB not supported. Falling back to memory database.");
            this.db = null;
            return;
        }

        return new Promise((resolve) => {
            try {
                const request = indexedDB.open(DB_NAME, DB_VERSION);

                request.onerror = (event) => {
                    console.warn("Database failed to open. Using memory database:", event);
                    this.db = null;
                    resolve(); // Resolve to prevent startup crash
                };

                request.onsuccess = (event) => {
                    this.db = (event.target as IDBOpenDBRequest).result;
                    console.log("POLI Database: Online");
                    resolve();
                };

                request.onupgradeneeded = (event) => {
                    const db = (event.target as IDBOpenDBRequest).result;
                    if (!db.objectStoreNames.contains('users')) db.createObjectStore('users', { keyPath: 'id' });
                    if (!db.objectStoreNames.contains('saved_items')) db.createObjectStore('saved_items', { keyPath: 'id' });
                    if (!db.objectStoreNames.contains('chats')) db.createObjectStore('chats', { keyPath: 'id' });
                    if (!db.objectStoreNames.contains('messages')) {
                        const msgStore = db.createObjectStore('messages', { keyPath: 'id' });
                        msgStore.createIndex('conversationId', 'conversationId', { unique: false });
                    }
                    if (!db.objectStoreNames.contains('history_logs')) db.createObjectStore('history_logs', { keyPath: 'id', autoIncrement: true });
                    if (!db.objectStoreNames.contains('posts')) db.createObjectStore('posts', { keyPath: 'id' });
                };
            } catch (e) {
                console.warn("IndexedDB initialization crashed. Using memory database:", e);
                this.db = null;
                resolve(); // Resolve to prevent startup crash
            }
        });
    }

    async execute(query: string, params: any[] = []): Promise<DBResult> {
        if (!this.db) {
            // Try to initialize again just in case, but do not wait if it fails
            try {
                await this.init();
            } catch (e) {
                this.db = null;
            }
        }
        
        const q = query.trim();
        const upperQ = q.toUpperCase();

        try {
            if (upperQ.startsWith("SELECT")) return this.handleSelect(q);
            if (upperQ.startsWith("INSERT")) return this.handleInsert(q, params);
            if (upperQ.startsWith("DELETE")) return this.handleDelete(q);
            if (upperQ.startsWith("UPDATE")) return this.handleUpdate(q, params);
            
            return { success: false, rows: [], message: "Syntax Error: Unsupported Command" };
        } catch (e) {
            console.error("SQL Execution Error:", e);
            return { success: false, rows: [], message: (e as Error).message };
        }
    }

    private async handleSelect(query: string): Promise<DBResult> {
        const fromMatch = query.match(/FROM\s+(\w+)/i);
        if (!fromMatch) throw new Error("Invalid SQL: Missing FROM table");
        const table = fromMatch[1];
        const whereMatch = query.match(/WHERE\s+(.+)/i);
        
        if (!this.db) {
            let results = [...(this.memoryDb[table] || [])];
            if (whereMatch) {
                const conditions = whereMatch[1].split('AND').map(c => c.trim());
                results = results.filter(row => {
                    return conditions.every(cond => {
                        if (cond.includes('=')) {
                            const [key, val] = cond.split('=').map(s => s.trim().replace(/['"]/g, ''));
                            return String(row[key]) === String(val);
                        }
                        return true;
                    });
                });
            }
            return { success: true, rows: results };
        }

        return new Promise((resolve) => {
            try {
                const transaction = this.db!.transaction([table], "readonly");
                const store = transaction.objectStore(table);
                const request = store.getAll();

                request.onsuccess = () => {
                    let results = request.result;
                    if (whereMatch) {
                        const conditions = whereMatch[1].split('AND').map(c => c.trim());
                        results = results.filter(row => {
                            return conditions.every(cond => {
                                if (cond.includes('=')) {
                                    const [key, val] = cond.split('=').map(s => s.trim().replace(/['"]/g, ''));
                                    return String(row[key]) === String(val);
                                }
                                return true;
                            });
                        });
                    }
                    resolve({ success: true, rows: results });
                };
                
                request.onerror = () => {
                    console.warn(`IndexedDB read error on table ${table}, falling back to memory`);
                    let results = [...(this.memoryDb[table] || [])];
                    resolve({ success: true, rows: results });
                };
            } catch (e) {
                console.warn(`IndexedDB transaction failed on table ${table}, falling back to memory:`, e);
                let results = [...(this.memoryDb[table] || [])];
                resolve({ success: true, rows: results });
            }
        });
    }

    private async handleInsert(query: string, params: any[]): Promise<DBResult> {
        const intoMatch = query.match(/INTO\s+(\w+)/i);
        if (!intoMatch) throw new Error("Invalid SQL: Missing INTO table");
        const table = intoMatch[1];
        const data = params[0];

        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                if (table === 'saved_items') {
                    const docRef = doc(firestore, "users", currentUser.uid, "saved_items", data.id);
                    await setDoc(docRef, data);
                } else if (table === 'users') {
                    const docRef = doc(firestore, "users", data.id || currentUser.uid);
                    await setDoc(docRef, data, { merge: true });
                }
            }
        } catch (e) {
            console.warn("Firestore save failed:", e);
        }

        if (!this.db) {
            if (!this.memoryDb[table]) this.memoryDb[table] = [];
            this.memoryDb[table] = this.memoryDb[table].filter(r => r.id !== data.id);
            this.memoryDb[table].push(data);
            return { success: true, rows: [data], message: "Inserted 1 row (memory)" };
        }

        return new Promise((resolve) => {
            try {
                const transaction = this.db!.transaction([table], "readwrite");
                const store = transaction.objectStore(table);
                const request = store.put(data);

                request.onsuccess = () => resolve({ success: true, rows: [data], message: "Inserted 1 row" });
                request.onerror = () => {
                    console.warn(`IndexedDB insert error on table ${table}, falling back to memory`);
                    if (!this.memoryDb[table]) this.memoryDb[table] = [];
                    this.memoryDb[table] = this.memoryDb[table].filter(r => r.id !== data.id);
                    this.memoryDb[table].push(data);
                    resolve({ success: true, rows: [data], message: "Inserted 1 row (memory fallback)" });
                };
            } catch (e) {
                console.warn(`IndexedDB transaction failed for insert on table ${table}, falling back to memory:`, e);
                if (!this.memoryDb[table]) this.memoryDb[table] = [];
                this.memoryDb[table] = this.memoryDb[table].filter(r => r.id !== data.id);
                this.memoryDb[table].push(data);
                resolve({ success: true, rows: [data], message: "Inserted 1 row (memory fallback)" });
            }
        });
    }

    private async handleDelete(query: string): Promise<DBResult> {
        const fromMatch = query.match(/FROM\s+(\w+)/i);
        if (!fromMatch) throw new Error("Invalid SQL: Missing FROM table");
        const table = fromMatch[1];
        
        const idMatch = query.match(/WHERE\s+id\s*=\s*['"]?([^'"]+)['"]?/i);
        if (!idMatch) throw new Error("Unsafe Delete: Must specify ID");
        const id = idMatch[1];

        try {
            const currentUser = auth.currentUser;
            if (currentUser && table === 'saved_items') {
                const docRef = doc(firestore, "users", currentUser.uid, "saved_items", id);
                await deleteDoc(docRef);
            }
        } catch (e) {
            console.warn("Firestore delete failed:", e);
        }

        if (!this.db) {
            if (this.memoryDb[table]) {
                this.memoryDb[table] = this.memoryDb[table].filter(r => r.id !== id);
            }
            return { success: true, rows: [], message: "Deleted row (memory)" };
        }

        return new Promise((resolve) => {
            try {
                const transaction = this.db!.transaction([table], "readwrite");
                const store = transaction.objectStore(table);
                const request = store.delete(id);

                request.onsuccess = () => resolve({ success: true, rows: [], message: `Deleted row ${id}` });
                request.onerror = () => {
                    if (this.memoryDb[table]) {
                        this.memoryDb[table] = this.memoryDb[table].filter(r => r.id !== id);
                    }
                    resolve({ success: true, rows: [], message: `Deleted row ${id} (memory fallback)` });
                };
            } catch (e) {
                if (this.memoryDb[table]) {
                    this.memoryDb[table] = this.memoryDb[table].filter(r => r.id !== id);
                }
                resolve({ success: true, rows: [], message: `Deleted row ${id} (memory fallback)` });
            }
        });
    }

    private async handleUpdate(query: string, params: any[]): Promise<DBResult> {
        const tableMatch = query.match(/UPDATE\s+(\w+)/i);
        if (!tableMatch) throw new Error("Invalid SQL");
        const table = tableMatch[1];
        const data = params[0];

        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                if (table === 'users') {
                    const docRef = doc(firestore, "users", data.id || currentUser.uid);
                    await setDoc(docRef, data, { merge: true });
                } else if (table === 'saved_items') {
                    const docRef = doc(firestore, "users", currentUser.uid, "saved_items", data.id);
                    await setDoc(docRef, data, { merge: true });
                }
            }
        } catch (e) {
            console.warn("Firestore update failed:", e);
        }

        if (!this.db) {
            if (!this.memoryDb[table]) this.memoryDb[table] = [];
            this.memoryDb[table] = this.memoryDb[table].filter(r => r.id !== data.id);
            this.memoryDb[table].push(data);
            return { success: true, rows: [data], message: "Updated 1 row (memory)" };
        }

        return new Promise((resolve) => {
            try {
                const transaction = this.db!.transaction([table], "readwrite");
                const store = transaction.objectStore(table);
                const request = store.put(data);

                request.onsuccess = () => resolve({ success: true, rows: [data], message: "Updated 1 row" });
                request.onerror = () => {
                    if (!this.memoryDb[table]) this.memoryDb[table] = [];
                    this.memoryDb[table] = this.memoryDb[table].filter(r => r.id !== data.id);
                    this.memoryDb[table].push(data);
                    resolve({ success: true, rows: [data], message: "Updated 1 row (memory fallback)" });
                };
            } catch (e) {
                if (!this.memoryDb[table]) this.memoryDb[table] = [];
                this.memoryDb[table] = this.memoryDb[table].filter(r => r.id !== data.id);
                this.memoryDb[table].push(data);
                resolve({ success: true, rows: [data], message: "Updated 1 row (memory fallback)" });
            }
        });
    }

    async saveItem(table: string, item: any) {
        return this.execute(`INSERT INTO ${table}`, [item]);
    }

    async getItems(table: string) {
        return this.execute(`SELECT * FROM ${table}`);
    }

    async deleteItem(table: string, id: string) {
        return this.execute(`DELETE FROM ${table} WHERE id = '${id}'`);
    }
}

export const db = new DatabaseService();
