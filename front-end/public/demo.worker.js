const addAllFilesAndFolderToZipHelper = async (
    zip,
    directories,
    dirPath,
    filesInformation,
) => {
    for (const directory of directories) {
        if (directory.isFolder) {
            await addAllFilesAndFolderToZipHelper(
                zip,
                directory.children,
                dirPath + "/" + directory.name,
                filesInformation
            );
        } else {
            zip.file(
                dirPath + "/" + directory.name,
                new Blob([filesInformation[directory.id].body])
            );
        }
    }
};


self.onmessage = async (e) => {
    const { zip, directories, dirPath, filesInformation } = e.data;
    const parseZip = await JSON.parse(zip);
    try {
        await addAllFilesAndFolderToZipHelper(parseZip, directories, dirPath, filesInformation);
    }
    catch (err) {
        console.log(err);
    }
    console.log(parseZip);
    const startTime = new Date().getTime();
    self.postMessage({
        parseZip,
        time: new Date().getTime() - startTime,
    });
};
