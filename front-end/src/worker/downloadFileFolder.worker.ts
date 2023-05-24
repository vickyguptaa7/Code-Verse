/* eslint-disable no-restricted-globals */
import JSZip from "jszip";
import { addAllFilesAndFolderToZipHelper } from "../utils/zip.utils";

/* This code is defining a function that will be executed when a message is received by the web worker.
The message should contain an object with two properties: `filesInformation` and `directories`. */
self.onmessage = async (e) => {
  const { filesInformation, directories } = e.data;
  const zip = new JSZip();
  await addAllFilesAndFolderToZipHelper(
    zip,
    directories,
    "root",
    filesInformation
  );
  const file = await zip.generateAsync({ type: "blob" });
  self.postMessage({ file });
};

export {};
