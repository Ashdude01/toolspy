/**
 * Cross-page image handoff: stores a blob in IndexedDB, navigates with ?toolspy_handoff=<id>,
 * destination reads once and deletes.
 */

const DB_NAME = "toolspy-handoff";
const DB_VERSION = 1;
const STORE = "images";

export const TOOLSPY_HANDOFF_QUERY = "toolspy_handoff";

export type ToolspyHandoffRecord = {
  blob: Blob;
  filename: string;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
  });
}

let chain: Promise<unknown> = Promise.resolve();

/** Serialize handoff writes + reads to avoid races (e.g. React Strict Mode). */
function serialized<T>(fn: () => Promise<T>): Promise<T> {
  const next = chain.then(fn, fn);
  chain = next.then(
    () => undefined,
    () => undefined
  );
  return next;
}

export async function saveToolImageHandoff(id: string, record: ToolspyHandoffRecord): Promise<void> {
  await serialized(async () => {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
      tx.objectStore(STORE).put(record, id);
    });
  });
}

/** Read handoff without deleting (safe if React Strict Mode aborts the effect). */
export async function peekToolImageHandoff(id: string): Promise<ToolspyHandoffRecord | null> {
  return serialized(async () => {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const store = tx.objectStore(STORE);
      const getReq = store.get(id);
      getReq.onerror = () => reject(getReq.error);
      getReq.onsuccess = () => {
        const val = getReq.result as ToolspyHandoffRecord | undefined;
        resolve(val?.blob ? val : null);
      };
      tx.onerror = () => reject(tx.error);
    });
  });
}

export async function removeToolImageHandoff(id: string): Promise<void> {
  await serialized(async () => {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
      tx.objectStore(STORE).delete(id);
    });
  });
}

export function stripHandoffFromUrl(): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (!url.searchParams.has(TOOLSPY_HANDOFF_QUERY)) return;
  url.searchParams.delete(TOOLSPY_HANDOFF_QUERY);
  const qs = url.searchParams.toString();
  const next = qs ? `${url.pathname}?${qs}` : url.pathname;
  window.history.replaceState(null, "", next + url.hash);
}
