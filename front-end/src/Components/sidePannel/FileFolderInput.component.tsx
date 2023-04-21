import React from "react";
import IDirectory from "../../Interface/directory.interface";
import { IFile } from "../../Interface/file.interface";
import {
  addExternalFileOrFolderToDirectory,
  setFilesInformation,
} from "../../Store/reducres/SideDrawer/Directory/Directory.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";

import { sortDirectory } from "../../utils/fileFolder.utils";
import { uniqueIdGenerator } from "../../library/uuid/uuid.lib";
import {
  addNotification,
  removeNotification,
} from "../../Store/reducres/Notification/Notification.reducer";
import { processFileUpload } from "../../utils/uploadFileFolder.utils";

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
    mozdirectory?: string;
  }
}

const ACCEPTED_FILES =
  ",.abap,.aes,.apex,.asp,.azcli,.bat,.bicep,.c,.c++,.cameligo,.cc,.clj,.cljc,.cljs,.clojure,.coffeescript,.cp,.cpp,.cs,.csharp,.cshtml,.csp,.css,.csx,.cxx,.cypher,.dart,.dmn,.dockerfile,.dtd,.ecl,.eex,.elixir,.erb,.esx,.ex,.exs,.flow9,.freemarker2,.fs,.fsharp,.fsi,.fsproj,.fsx,.go,.gql,.graphql,.handlebars,.hbs,.hcl,.heex,.htm,.html,.html_vm,.i,.ii,.iml,.ini,.jade,.java,.javascript,.jl,.jrxml,.js,.json,.json5,.jsonc,.jsonl,.jsp,.jsx,.julia,.kotlin,.kt,.kts,.leex,.less,.lexon,.liquid,.lua,.m,.m3,.manifest,.markdown,.md,.mi,.mii,.mips,.mjs,.msdax,.mustache,.mysql,.ndjson,.objective-c,.pas,.pascal,.pascaligo,.perl,.pgsql,.php,.pla,.plaintext,.plist,.pm,.postiats,.powerquery,.powershell,.project,.proto,.ps1,.ps1xml,.psc1,.psd1,.psm1,.pssc,.pug,.py,.python,.qs,.qsharp,.r,.raku,.razor,.rb,.redis,.redshift,.restructuredtext,.resx,.rmd,.ron,.rs,.rst,.ruby,.rust,.sb,.sc,.scala,.scheme,.scm,.scss,.shell,.sol,.sparql,.sql,.ss,.st,.sv,.svh,.swift,.systemverilog,.tcl,.tmLanguage,.ts,.tsbuildinfo,.tsx,.twig,.typescript,.vb,.vbhtml,.verilog,.vhd,.xhtml,.xml,.xquery,.xsd,.xsl,.xslt,.yaml,.yml,.txt";

const FileFolderInput = () => {
  const dispatch = useAppDispatch();
  const folderIcons = useAppSelector((state) => state.Directory.folderIcons);
  const fileIcons = useAppSelector((state) => state.Directory.fileIcons);

  const openFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const notificationId = uniqueIdGenerator();
    dispatch(
      addNotification({
        id: notificationId,
        description: "Please wait files are uploading...",
        isWaitUntilComplete: true,
        type: "info",
      })
    );
    console.log(e.target.files);
    const files = e.target.files;
    const tempDirectory: Array<IDirectory> = [];
    const tempFilesInformation: Array<IFile> = [];
    for (const fileKey in files) {
      if (isNaN(parseInt(fileKey))) continue;
      await processFileUpload(
        files[parseInt(fileKey)],
        tempDirectory,
        tempFilesInformation,
        fileIcons,
        true,
        "root",
        "root"
      );
    }

    dispatch(addExternalFileOrFolderToDirectory(tempDirectory));
    dispatch(setFilesInformation(tempFilesInformation));
    e.target.value = "";
    dispatch(
      addNotification({
        id: uniqueIdGenerator(),
        description: "Files uploaded successfully",
        isWaitUntilComplete: false,
        type: "success",
      })
    );
    dispatch(
      removeNotification({
        id: notificationId,
      })
    );
  };

  const openFolderHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const notificationId = uniqueIdGenerator();
    dispatch(
      addNotification({
        id: notificationId,
        description: "Please wait folder is uploading...",
        isWaitUntilComplete: true,
        type: "info",
      })
    );
    let files = e.target.files;
    if (!files) return;

    const folderUploadWorker = new Worker(
      new URL("../../worker/folderUpload.worker", import.meta.url)
    );
    folderUploadWorker.postMessage({ files, folderIcons, fileIcons });

    folderUploadWorker.onerror = (err) => {
      console.log(err);
      e.target.value = "";
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          description: "Something went wrong",
          isWaitUntilComplete: false,
          type: "error",
        })
      );
      dispatch(
        removeNotification({
          id: notificationId,
        })
      );
      folderUploadWorker.terminate();
    };

    folderUploadWorker.onmessage = (event) => {
      const { newDirectory, newFilesInformation } = event.data;
      sortDirectory(newDirectory);
      dispatch(addExternalFileOrFolderToDirectory([newDirectory]));
      dispatch(setFilesInformation(newFilesInformation));

      e.target.value = "";
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          description: "Folder uploaded successfully",
          isWaitUntilComplete: false,
          type: "success",
        })
      );
      dispatch(
        removeNotification({
          id: notificationId,
        })
      );
      folderUploadWorker.terminate();
    };
  };

  return (
    <>
      <input
        type="file"
        id="file"
        name="file"
        multiple
        accept={ACCEPTED_FILES}
        className="hidden"
        onChange={openFileHandler}
      />
      <input
        type="file"
        id="folder"
        name="folder"
        directory=""
        webkitdirectory=""
        className="hidden"
        onChange={openFolderHandler}
      />
    </>
  );
};

export default FileFolderInput;
