function findMatchingFiles(filesInformation, searchedText) {
    const matchingFiles = [];
    for (const key in filesInformation) {
        const file = filesInformation[key];
        if (file.id === "settings" || file.id === "extension")
            continue;
        if (
            file.body.toLowerCase().includes(searchedText.toLowerCase())
        ) {
            matchingFiles.push({ id: file.id, type: "file" });
        }
    }
    return matchingFiles;
}

self.onmessage = async (e) => {
    const { filesInformation, searchedText } = e.data;
    const matchingFiles = findMatchingFiles(filesInformation, searchedText);
    const startTime = new Date().getTime();
    self.postMessage({
        matchingFiles,
        time: new Date().getTime() - startTime,
    });
};
