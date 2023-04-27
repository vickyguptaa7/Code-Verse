import { openDB } from "idb";

const dbPromise = openDB("keyval-store", 1, {
  upgrade(db) {
    db.createObjectStore("keyval");
  },
});

export async function getFromIndexDB(key: string) {
  return (await dbPromise).get("keyval", key);
}
export async function setToIndexDB(key: string, val: Object | string) {
  return (await dbPromise).put("keyval", val, key);
}
export async function delFromIndexDB(key: string) {
  return (await dbPromise).delete("keyval", key);
}
