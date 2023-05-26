import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig.lib";

import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { IExtensionInfo } from "../../@types/Extension.d";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

/**
 * This function fetches data from a specific document in a Firestore collection and returns the data.
 * @returns The `fetchFolderIcons` function is returning the data object retrieved from the Firestore
 * document with the ID "620RerXyAqYImRSeEEei" in the "folderIcons" collection.
 */
export const fetchFolderIcons = async () => {
  const folderIconsRef = doc(db, "folderIcons", "620RerXyAqYImRSeEEei");
  const data = await getDoc(folderIconsRef);
  return data.data();
};

/**
 * This function fetches data from a Firestore document containing file icons.
 * @returns The `fetchFileIcons` function is returning the data object retrieved from the Firestore
 * document with the ID "3Nj3kOY2ZZSmpsqm6rZN" in the "fileIcons" collection.
 */
export const fetchFileIcons = async () => {
  const fileIconsRef = doc(db, "fileIcons", "3Nj3kOY2ZZSmpsqm6rZN");
  const data = await getDoc(fileIconsRef);
  return data.data();
};

/**
 * This function retrieves the current count from a Firestore document, increments it by 1, updates the
 * document with the new count, and returns the updated count.
 * @returns The function `getViews` returns the updated count value from the Firestore database.
 * Specifically, it returns the count value incremented by 1 after updating the document with the new
 * count value.
 */
export const getAndUpdateViews = async () => {
  const counterRef = doc(db, "counter", "es3oVGx0Sd4imUQoTYgR");
  const data = await getDoc(counterRef);
  await updateDoc(counterRef, { count: data.data()?.count + 1 });
  return data.data()?.count + 1;
};

/**
 * This function fetches a list of extension information from a Firestore database and returns it as an
 * array of objects.
 * @returns The `fetchExtensionsList` function is returning a Promise that resolves to an array of
 * objects of type `IExtensionInfo`. Each object in the array represents an extension and contains
 * information such as its name, description, and version.
 */
export const fetchExtensionsList = async () => {
  const extensionsRef = doc(db, "extensions", "trbZnRBND1bNh3ohhcG0");
  const list: IExtensionInfo[] = [];
  const extensionsObj = (await getDoc(extensionsRef)).data();
  for (const key in extensionsObj) {
    list.push({
      ...extensionsObj[key],
      id: key,
    });
  }
  return list;
};

// # make firebase rules for read and write true for the accessing the files
// Used for adding the file icons to the firestore from the stored images of the google storage

// export const addDataToFireStore = async () => {
//   const extensionObj: { [key: string]: IExtensionInfo } = {};
//   for (const ext of extensions) {
//     const id = uniqueIdGenerator();
//     extensionObj[id] = { ...ext, id: id };
//   }
//   console.log(extensionObj);
//   // return;
//   const extensionsRef = doc(db, "extensions", "trbZnRBND1bNh3ohhcG0");
//   await setDoc(extensionsRef, extensionObj);
// };

// const storage = getStorage();

// export const getAllLinks = async () => {
//   // Create a reference under which you want to list
//   const listRef = ref(storage, "fileIcons");
//   console.log(newIconsList);

//   // Find all the prefixes and items.
//   try {
//     const list = await listAll(listRef);
//     let mapping = new Map();
//     for (const itemRef of list.items) {
//       const downloadURL = await getDownloadURL(itemRef);
//       mapping.set(
//         itemRef.name.split(".")[0].toString(),
//         downloadURL.toString()
//       );
//     }
//     console.log(mapping);
//     let extensionsMap = new Map();
//     newIconsList.forEach((icon) => {
//       const url = mapping.get(icon.name);
//       icon.extensions.forEach((ext) => {
//         extensionsMap.set(ext, url);
//       });
//     });
//     console.log(extensionsMap);

//     addDataToFireStore(extensionsMap);
//   } catch (err) {
//     console.log("error : ", err);
//   }

// .then((res) => {
//   res.prefixes.forEach((folderRef) => {
//     // All the prefixes under listRef.
//     // You may call listAll() recursively on them.
//   });

// })
// .catch((error) => {
//   // Uh-oh, an error occurred!
//   console.log(error);
// });
// };
