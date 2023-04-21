/* eslint-disable no-restricted-globals */
import { replaceTextInFiles } from "../utils/fileFolder.utils";

self.onmessage = async (e) => {
    const { filesInformation, targetFiles, searchedText, replacedText } = e.data;
    const updatedFilesInfo = replaceTextInFiles(filesInformation, targetFiles, searchedText, replacedText);
    self.postMessage({
        updatedFilesInfo
    });
};

export { };