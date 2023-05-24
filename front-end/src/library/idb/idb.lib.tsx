import { openDB } from "idb";

// this is only to store the key value pair in the indexDB so that we can use it later
/* This code initializes an IndexedDB database named "vscode" with version number 1 and creates two
object stores named "directory" and "filesInformation" if they do not already exist. The `openDB`
function returns a promise that resolves to a database instance that can be used to perform
operations on the object stores. The `upgrade` function is called when the database is first created
or when the version number is incremented, and it is used to define the structure of the database by
creating object stores and indexes. */
const dbPromise = openDB("vscode", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("directory"))
      db.createObjectStore("directory");
    if (!db.objectStoreNames.contains("filesInformation"))
      db.createObjectStore("filesInformation");
  },
});

/**
 * This function retrieves data from an indexDB database named "directory" using a specified key.
 * @param {string} key - The `key` parameter is a string that represents the key of the data that we
 * want to retrieve from the "directory" object store in the IndexedDB database. The
 * `getFromDirectoryIndexDB` function is an asynchronous function that returns a promise that resolves
 * to the value associated with the given key
 * @returns The `getFromDirectoryIndexDB` function is returning a promise that resolves to the value
 * associated with the given `key` in the "directory" object store of an IndexedDB database. The value
 * is retrieved using the `get` method of the `dbPromise` object, which is a promise that resolves to
 * the database instance.
 */
export async function getFromDirectoryIndexDB(key: string) {
  return (await dbPromise).get("directory", key);
}

/**
 * This function stores a value in an IndexedDB database under a specified key in the "directory"
 * object store.
 * @param {string} key - The key parameter is a string that represents the unique identifier for the
 * data being stored in the IndexDB. It is used to retrieve the data later on.
 * @param {Object | string} val - The `val` parameter is the value that needs to be stored in the
 * IndexedDB database. It can be either an object or a string. The value will be associated with the
 * given `key` parameter in the "directory" object store of the database.
 * @returns a Promise that resolves to the result of the `put` operation on the `directory` object
 * store of the IndexedDB database. The `put` operation stores the `val` object or string with the
 * given `key` in the object store.
 */
export async function storeToDirectoryIndexDB(
  key: string,
  val: Object | string
) {
  return (await dbPromise).put("directory", val, key);
}

/**
 * This function removes a key-value pair from an indexedDB database named "directory".
 * @param {string} key - The key parameter in the function removeFromDirectoryIndexDB is a string that
 * represents the key of the object that needs to be deleted from the "directory" object store in the
 * IndexedDB database. The key is used to uniquely identify the object in the object store.
 * @returns The `removeFromDirectoryIndexDB` function is returning a promise that resolves to the
 * result of deleting the specified key from the "directory" object store in the IndexedDB database.
 */
export async function removeFromDirectoryIndexDB(key: string) {
  return (await dbPromise).delete("directory", key);
}

/**
 * This function retrieves all data from the "filesInformation" object store in an IndexedDB database.
 * @returns The function `getFromFilesInformationIndexDB` is returning a promise that resolves to an
 * array of all the objects stored in the "filesInformation" object store of the IndexedDB database.
 */
export async function getFromFilesInformationIndexDB() {
  return (await dbPromise).getAll("filesInformation");
}

/**
 * This function stores an object or string value with a given key in an indexedDB database named
 * "filesInformation".
 * @param {string} key - The key parameter is a string that represents the unique identifier for the
 * data being stored in the "filesInformation" object store of the indexedDB. It is used to retrieve
 * the data later on.
 * @param {Object | string} val - The `val` parameter is either an object or a string that will be
 * stored in the "filesInformation" object store of an IndexedDB database with the given `key`.
 * @returns a Promise that resolves to the result of the `put` operation on the "filesInformation"
 * object store of an IndexedDB database. The `put` operation stores the provided `val` object or
 * string under the given `key` in the object store.
 */
export async function storeToFilesInformationDirectoryIndexDB(
  key: string,
  val: Object | string
) {
  return (await dbPromise).put("filesInformation", val, key);
}

/**
 * This function removes a key-value pair from the "filesInformation" object store in an indexedDB
 * database.
 * @param {string} key - The key parameter is a string that represents the unique identifier of the
 * data to be deleted from the "filesInformation" object store in the indexedDB.
 * @returns The `removeFromFilesInformationDirectoryIndexDB` function is returning a promise that
 * resolves to the result of deleting a record with the specified key from the "filesInformation"
 * object store in the IndexedDB database.
 */
export async function removeFromFilesInformationDirectoryIndexDB(key: string) {
  return (await dbPromise).delete("filesInformation", key);
}
