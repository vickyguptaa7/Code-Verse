/* eslint-disable no-restricted-globals */
import JSZip from "jszip";
import { addAllFilesAndFolderToZipHelper } from "../utils/zip.utils";

self.onmessage = async (e) => {
    const { filesInformation, directories } = e.data;
    const zip=new JSZip();
    await addAllFilesAndFolderToZipHelper(
        zip,
        directories,
        "root",
        filesInformation
      );
      const file = await zip.generateAsync({ type: "blob" });
    self.postMessage({file});
};

export {};