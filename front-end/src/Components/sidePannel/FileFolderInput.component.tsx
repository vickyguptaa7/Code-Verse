import React from "react";
import IDirectory from "../../Interface/directory.interface";
import { IFile } from "../../Interface/file.interface";
import {
  addExternalFileOrFolderToDirectory,
  setFilesInformation,
} from "../../Store/reducres/SideDrawer/Directory/Directory.reducer";
import { useAppDispatch } from "../../Store/store";
import useUpload from "./hook/useUpload.hook";
import { sortDirectory, findUniqueFileFolderName } from "../../utils/fileFolder.utils";

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
    mozdirectory?: string;
  }
}

const ACCEPTED_FILES =
  ",.abap,.aes,.apex,.asp,.azcli,.bat,.bicep,.c,.c++,.cameligo,.cc,.clj,.cljc,.cljs,.clojure,.coffeescript,.cp,.cpp,.cs,.csharp,.cshtml,.csp,.css,.csx,.cxx,.cypher,.dart,.dmn,.dockerfile,.dtd,.ecl,.eex,.elixir,.erb,.esx,.ex,.exs,.flow9,.freemarker2,.fs,.fsharp,.fsi,.fsproj,.fsx,.go,.gql,.graphql,.handlebars,.hbs,.hcl,.heex,.htm,.html,.html_vm,.i,.ii,.iml,.ini,.jade,.java,.javascript,.jl,.jrxml,.js,.json,.json5,.jsonc,.jsonl,.jsp,.jsx,.julia,.kotlin,.kt,.kts,.leex,.less,.lexon,.liquid,.lua,.m,.m3,.manifest,.markdown,.md,.mi,.mii,.mips,.mjs,.msdax,.mustache,.mysql,.ndjson,.objective-c,.pas,.pascal,.pascaligo,.perl,.pgsql,.php,.pla,.plaintext,.plist,.pm,.postiats,.powerquery,.powershell,.project,.proto,.ps1,.ps1xml,.psc1,.psd1,.psm1,.pssc,.pug,.py,.python,.qs,.qsharp,.r,.raku,.razor,.rb,.redis,.redshift,.restructuredtext,.resx,.rmd,.ron,.rs,.rst,.ruby,.rust,.sb,.sc,.scala,.scheme,.scm,.scss,.shell,.sol,.sparql,.sql,.ss,.st,.sv,.svh,.swift,.systemverilog,.tcl,.tmLanguage,.ts,.tsbuildinfo,.tsx,.twig,.typescript,.vb,.vbhtml,.verilog,.vhd,.xhtml,.xml,.xquery,.xsd,.xsl,.xslt,.yaml,.yml";

const FileFolderInput = () => {
  const dispatch = useAppDispatch();
  const {
    processFileUpload,
    processFolderUpload,
  } = useUpload();
  const openFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        true,
        "root",
        "root"
      );
    }
    dispatch(addExternalFileOrFolderToDirectory(tempDirectory));
    dispatch(setFilesInformation(tempFilesInformation));
    e.target.value = "";
  };

  const openFolderHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files, e.target.value);
    let files = e.target.files;
    if (!files) return;
    const { name: folderName, id: folderId } = findUniqueFileFolderName(
      files[0].webkitRelativePath.split("/")[0],
      true,
      true
    );
    const newDirectory: IDirectory = {
      id: folderId,
      parentId: "root",
      name: folderName,
      iconUrls: [],
      isFolder: true,
      children: [],
      path: "root/" + folderId,
    };
    const tempFilesInformation: Array<IFile> = [];
    for (const fileKey in files) {
      if (isNaN(parseInt(fileKey))) continue;
      const currFile = files[parseInt(fileKey)];
      await processFolderUpload(
        currFile,
        newDirectory,
        tempFilesInformation,
        "root/" + folderId
      );
    }
    sortDirectory(newDirectory);
    dispatch(addExternalFileOrFolderToDirectory([newDirectory]));
    dispatch(setFilesInformation(tempFilesInformation));
    console.log(newDirectory);
    e.target.value = "";
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
