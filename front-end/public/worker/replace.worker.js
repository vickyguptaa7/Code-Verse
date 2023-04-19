function replaceTextInFiles(filesInformation, targetFiles, searchedText, replacedText) {
    const updatedFilesInfo = [];
    for (const file of targetFiles) {
        if (filesInformation[file.id] === undefined) continue;
        const newString = filesInformation[file.id].body.replaceAll(
            new RegExp(searchedText, "ig"),
            replacedText
        );
        updatedFilesInfo.push({ id: file.id, body: newString });
    }
    return updatedFilesInfo;
}

self.onmessage = async (e) => {
    const { filesInformation, targetFiles, searchedText, replacedText } = e.data;
    const updatedFilesInfo = replaceTextInFiles(filesInformation, targetFiles, searchedText, replacedText);
    const startTime = new Date().getTime();
    self.postMessage({
        updatedFilesInfo,
        time: new Date().getTime() - startTime,
    });
};
