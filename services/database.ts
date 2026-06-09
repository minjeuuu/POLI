
/**
 * POLI ARCHIVE DATABASE ENGINE (PADE)
 * v10.0 - SQL-over-IndexedDB Implementation
 * 
 * This service provides a persistent, transactional database layer 
 * that mimics SQL syntax while running entirely in the client's browser.
 */

const DB_NAME = 'POLI_ARCHIVE_DB';
const DB_VERSION = 3; // Bumped version

export interface DBResult {
    rows: any[];
    success: boolean;
    message?: string;
}

// Schema Definition
const SCHEMA = {
    users: 'id, username, email, level, xp, coins, joinedDate',
    saved_items: 'id, type, title, subtitle, dateAdded',
    chats: 'id, participantName, participantRole, lastMessage, lastTime, unread, archived',
    messages: 'id, conversationId, senderId, text, timestamp, isMe, attachments',
    history_logs: 'id, date, action, details',
    posts: 'id, type, title, author, timestamp, content, likes, comments' // New table
};

class DatabaseService {
    private db: IDBDatabase | null = null;

    constructor() {
        this.init();
    }

    async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = (event) => {
                console.error("Database error:", event);
                reject("Database failed to open");
            };

            request.onsuccess = (event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                console.log("POLI Database: Online");
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                
                // Create Object Stores (Tables)
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
        });
    }

    // --- SQL SIMULATION LAYER ---
    // Allows developers to write pseudo-SQL to interact with IndexedDB
    
    async execute(query: string, params: any[] = []): Promise<DBResult> {
        if (!this.db) await this.init();
        
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
        // Simple Parser: SELECT * FROM table WHERE key = value
        // Note: Very basic regex parsing for demonstration
        const fromMatch = query.match(/FROM\s+(\w+)/i);
        if (!fromMatch) throw new Error("Invalid SQL: Missing FROM table");
        const table = fromMatch[1];
        
        const whereMatch = query.match(/WHERE\s+(.+)/i);
        
        return new Promise((resolve) => {
            const transaction = this.db!.transaction([table], "readonly");
            const store = transaction.objectStore(table);
            const request = store.getAll();

            request.onsuccess = () => {
                let results = request.result;

                // Simple WHERE filtering logic
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
        });
    }

    private async handleInsert(query: string, params: any[]): Promise<DBResult> {
        // INSERT INTO table VALUE object
        const intoMatch = query.match(/INTO\s+(\w+)/i);
        if (!intoMatch) throw new Error("Invalid SQL: Missing INTO table");
        const table = intoMatch[1];
        const data = params[0]; // Expects object in params

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([table], "readwrite");
            const store = transaction.objectStore(table);
            const request = store.put(data); // Put acts as Insert/Upsert

            request.onsuccess = () => resolve({ success: true, rows: [data], message: "Inserted 1 row" });
            request.onerror = () => reject("Insert Failed");
        });
    }

    private async handleDelete(query: string): Promise<DBResult> {
        const fromMatch = query.match(/FROM\s+(\w+)/i);
        if (!fromMatch) throw new Error("Invalid SQL: Missing FROM table");
        const table = fromMatch[1];
        
        // Only supporting DELETE FROM table WHERE id = X for safety
        const idMatch = query.match(/WHERE\s+id\s*=\s*['"]?([^'"]+)['"]?/i);
        
        if (!idMatch) throw new Error("Unsafe Delete: Must specify ID");
        const id = idMatch[1];

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([table], "readwrite");
            const store = transaction.objectStore(table);
            const request = store.delete(id);

            request.onsuccess = () => resolve({ success: true, rows: [], message: `Deleted row ${id}` });
            request.onerror = () => reject("Delete Failed");
        });
    }

    private async handleUpdate(query: string, params: any[]): Promise<DBResult> {
        // UPDATE table SET ... WHERE id = ...
        // Simplified: UPDATE table (params contains full updated object)
        const tableMatch = query.match(/UPDATE\s+(\w+)/i);
        if (!tableMatch) throw new Error("Invalid SQL");
        const table = tableMatch[1];
        const data = params[0];

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([table], "readwrite");
            const store = transaction.objectStore(table);
            const request = store.put(data);

            request.onsuccess = () => resolve({ success: true, rows: [data], message: "Updated 1 row" });
            request.onerror = () => reject("Update Failed");
        });
    }

    // --- DIRECT ACCESS METHODS (ORM-like) ---

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
