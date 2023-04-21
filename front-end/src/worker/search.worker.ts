/* eslint-disable no-restricted-globals */
import { findMatchingFiles } from "../utils/fileFolder.utils";

self.onmessage = async (e) => {
    const { filesInformation, searchedText } = e.data;
    const matchingFiles = findMatchingFiles(filesInformation, searchedText);
    self.postMessage({
        matchingFiles,
    });
};

export {};