import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

import { getDoc, getFirestore, doc, collection, getDocs } from "firebase/firestore";
import { IExtensionInfo } from "../Interface/Extension.interface";

// import { extensions } from "./../Extra/Extensions_Details";
// import {v4 as uuid4} from "uuid";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// functions

export const fetchFolderIcons = async () => {
  const folderIconsRef = doc(db, "folderIcons", "620RerXyAqYImRSeEEei");
  const data = await getDoc(folderIconsRef);
  return data.data();
};

export const fetchFileIcons = async () => {
  const fileIconsRef = doc(db, "fileIcons", "3Nj3kOY2ZZSmpsqm6rZN");
  const data = await getDoc(fileIconsRef);
  return data.data();
};

export const fetchExtensionsList = async () => {
  const extesnionListCollection = collection(db, "extensionsList");
  const list: IExtensionInfo[]=[];
  const  extensionListData= await getDocs(extesnionListCollection);
  extensionListData.forEach((extension)=>{
    const newExtension={...extension.data(),id:extension.id} as IExtensionInfo;
    list.push(newExtension);
  })
  return list;
}

// # make firebase rules for read and write true for the accessing the files
// Used for adding the file icons to the firestore from the stored images of the google storage

// export const addDataToFireStore = async (list: Array<{ extensionName: string, imageUrl: string, verified: string, publisher: string, downloadCount: string, description: string, ratings: string, extensionUrl: string }>) => {
//   console.log(list);
//   for (const ext of extensions) {
//     const fileIconsRef = doc(db, "extensionsList",uuid4());
//     await setDoc(fileIconsRef, ext);
//   }
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


