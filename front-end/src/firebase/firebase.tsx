import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

import { getDoc, getFirestore, doc } from "firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// functions

export const fetchFolderIcons = async () => {
  const folderIconsRef = doc(db, "folderIcons", "620RerXyAqYImRSeEEei");
  const data = await getDoc(folderIconsRef);
  return data.data();
};

export const fetchFileIcons = async () => {
  const fileIconsRef = doc(db, "fileIcons", "Iv095tUCGz5UT7qYHPve");
  const data = await getDoc(fileIconsRef);
  return data.data();
};

// # make firebase rules for read and write true for the accessing the files
// Used for adding the file icons to the firestore from the stored images of the google storage

// import { ref, getStorage, listAll, getDownloadURL } from "firebase/storage";
// export const addDataToFireStore = async (name: Map<string, string>) => {
//   const fileIconsRef = doc(db, "folderIcons", "620RerXyAqYImRSeEEei");
//   await setDoc(fileIconsRef, Object.fromEntries(name));
// };

// const storage = getStorage();

// export const getAllLinks = async () => {
//   // Create a reference under which you want to list
//   const listRef = ref(storage, "folderIcons");

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
//     addDataToFireStore(mapping);
//     // console.log(mapping, mapping.get("cpp"));
//   } catch (err) {
//     console.log("error : ", err);
//   }

//   // .then((res) => {
//   //   res.prefixes.forEach((folderRef) => {
//   //     // All the prefixes under listRef.
//   //     // You may call listAll() recursively on them.
//   //   });

//   // })
//   // .catch((error) => {
//   //   // Uh-oh, an error occurred!
//   //   console.log(error);
//   // });
// };
