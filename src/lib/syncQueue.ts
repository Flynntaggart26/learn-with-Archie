import type {
  StudySession,
  SyncQueueEntry,
  TimerResult,
  TopicAttempt,
} from '../types';

const DB_NAME = 'learn-with-archie';
const DB_VERSION = 1;
const STORE_NAME = 'sync_queue';

type QueuePayload = StudySession | TimerResult | TopicAttempt;

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
        });
        store.createIndex('synced', 'synced', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}

export async function enqueueMutation(
  type: SyncQueueEntry['type'],
  payload: QueuePayload,
): Promise<SyncQueueEntry> {
  const db = await openDatabase();

  const entry: SyncQueueEntry = {
    id: generateId(),
    type,
    payload,
    createdAt: new Date().toISOString(),
    synced: false,
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.add(entry);

    transaction.oncomplete = () => {
      db.close();
      resolve(entry);
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

export async function getPendingEntries(): Promise<SyncQueueEntry[]> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('synced');
    const request = index.getAll(IDBKeyRange.only(false));

    request.onsuccess = () => {
      db.close();
      resolve(request.result as SyncQueueEntry[]);
    };

    request.onerror = () => {
      db.close();
      reject(request.error);
    };
  });
}

export async function markAsSynced(entryId: string): Promise<void> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const getRequest = store.get(entryId);

    getRequest.onsuccess = () => {
      const entry = getRequest.result as SyncQueueEntry | undefined;
      if (entry) {
        entry.synced = true;
        store.put(entry);
      }
    };

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

export async function removeEntry(entryId: string): Promise<void> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(entryId);

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

export async function clearSyncedEntries(): Promise<void> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('synced');
    const request = index.openCursor(IDBKeyRange.only(true));

    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        store.delete(cursor.primaryKey);
        cursor.continue();
      }
    };

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

export async function flushToSupabase(
  flushCallback: (entries: SyncQueueEntry[]) => Promise<void>,
): Promise<void> {
  const pendingEntries = await getPendingEntries();

  if (pendingEntries.length === 0) {
    return;
  }

  try {
    await flushCallback(pendingEntries);

    for (const entry of pendingEntries) {
      await markAsSynced(entry.id);
    }

    await clearSyncedEntries();
  } catch (error) {
    window.dispatchEvent(new CustomEvent('archie:sync-error', { detail: error }));
  }
}

export function registerOnlineSyncListener(
  flushCallback: (entries: SyncQueueEntry[]) => Promise<void>,
): () => void {
  const handleOnline = (): void => {
    void flushToSupabase(flushCallback);
  };

  window.addEventListener('online', handleOnline);
  return () => {
    window.removeEventListener('online', handleOnline);
  };
}
