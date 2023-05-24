/* eslint-disable no-restricted-globals */
import { replaceTextInFiles } from "../utils/fileFolder.utils";

/* This code is setting up a message event listener on the `self` object (which refers to the current
worker context). When a message is received, it extracts the necessary data from the message event
object (`filesInformation`, `targetFiles`, `searchedText`, and `replacedText`) and passes them as
arguments to the `replaceTextInFiles` function, which replaces all occurrences of `searchedText`
with `replacedText` in the specified `targetFiles`. The updated file information is then sent back
to the main thread using `self.postMessage`. This code is likely part of a web worker that performs
file operations in a separate thread to avoid blocking the main thread. */
self.onmessage = async (e) => {
  const { filesInformation, targetFiles, searchedText, replacedText } = e.data;
  const updatedFilesInfo = replaceTextInFiles(
    filesInformation,
    targetFiles,
    searchedText,
    replacedText
  );
  self.postMessage({
    updatedFilesInfo,
  });
};

export {};
