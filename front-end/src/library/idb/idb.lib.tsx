import { openDB } from "idb";

// this is only to store the key value pair in the indexDB so that we can use it later
const dbPromise = openDB("vscode", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("directory"))
      db.createObjectStore("directory");
    if (!db.objectStoreNames.contains("filesInformation"))
      db.createObjectStore("filesInformation");
  },
});

export async function getFromDirectoryIndexDB(key: string) {
  return (await dbPromise).get("directory", key);
}
export async function storeToDirectoryIndexDB(
  key: string,
  val: Object | string
) {
  return (await dbPromise).put("directory", val, key);
}
export async function removeFromDirectoryIndexDB(key: string) {
  return (await dbPromise).delete("directory", key);
}
export async function getFromFilesInformationIndexDB() {
  return (await dbPromise).getAll("filesInformation");
}
export async function storeToFilesInformationDirectoryIndexDB(
  key: string,
  val: Object | string
) {
  return (await dbPromise).put("filesInformation", val, key);
}
export async function removeFromFilesInformationDirectoryIndexDB(key: string) {
  return (await dbPromise).delete("filesInformation", key);
}
