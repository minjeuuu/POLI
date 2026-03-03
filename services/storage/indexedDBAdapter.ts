
export const openDB = (name: string, version: number): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(name, version);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (e) => {
            // Migrations handled in specialized service
        };
    });
};

export const transaction = (db: IDBDatabase, stores: string[], mode: IDBTransactionMode) => {
    return db.transaction(stores, mode);
};
