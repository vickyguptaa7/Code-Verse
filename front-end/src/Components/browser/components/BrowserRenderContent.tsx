import { useAppSelector } from "../../../Store/store";
import {
  getDirectoryUsingPath,
  getFileIdUsingNamedPath,
} from "../../../utils/fileFolder.utils";

const BrowserRenderContent = () => {
  const htmlFileId = useAppSelector((state) => state.browser.htmlFildId);
  const htmlFileParentPath = useAppSelector(
    (state) => state.browser.htmlFileParentPath
  );
  const fileInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );
  const directories = useAppSelector((state) => state.Directory.directories);

  const htmlContent = fileInformation[htmlFileId]?.body;
  function inlineAssets(htmlContent: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const htmlFileParentDirectories = getDirectoryUsingPath(
      htmlFileParentPath.split("/"),
      directories
    );

    // Process CSS files
    const cssLinks: HTMLLinkElement[] = Array.from(
      doc.querySelectorAll('link[rel="stylesheet"]')
    );
    let cssStyles = "<style>\n";
    for (const link of cssLinks) {
      const cssfileId = getFileIdUsingNamedPath(
        link.href.split("/").slice(3),
        htmlFileParentDirectories
      );
      const cssContent = cssfileId ? fileInformation[cssfileId]?.body : "";
      if (cssContent) {
        cssStyles += cssContent + "\n";
      }
    }

    cssStyles += "</style>";

    // Process JS files
    const jsScripts: HTMLScriptElement[] = Array.from(
      doc.querySelectorAll("script[src]")
    );
    let js = "<script>\n";
    for (const script of jsScripts) {
      const jsfileId = getFileIdUsingNamedPath(
        script.src.split("/").slice(3),
        htmlFileParentDirectories
      );
      const jsContent = jsfileId ? fileInformation[jsfileId]?.body : "";
      if (jsContent) {
        js += jsContent + "\n";
      }
    }
    js += "</script>";
    return htmlContent + cssStyles + js;
  }

  return htmlContent ? (
    <iframe
      srcDoc={inlineAssets(htmlContent)}
      title="Remote Window"
      className=""
      width="100%"
      height="94%"
    ></iframe>
  ) : (
    <div className="flex items-center justify-center flex-1 bg-gray-100 w-100 h-100">
      No preview available!
    </div>
  );
};

export default BrowserRenderContent;
