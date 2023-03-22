import React from "react";
import {
  setIsInstalledExtensionOpen,
  setIsRecommendedExtensionOpen,
} from "../../../../Store/reducres/SideDrawer/Extensions/Extensions.reducer";
import { useAppSelector } from "../../../../Store/store";
import CollapsibleMenu from "../../../UI/CollapsibleMenu.component";
import ExtensionCard from "./ExtensionCard.component";
const EDITOR_MIN_HEIGHT = 480;
const InstalledAndRecommended = () => {
  const isInstalledExtensionOpen = useAppSelector(
    (state) => state.extension.isInstalledExtensionOpen
  );
  const isRecommendedExtensionOpen = useAppSelector(
    (state) => state.extension.isRecommendedExtensionOpen
  );
  let installedHeight =
    Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) - 180;
  let recommendedHeight =
    Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) - 180;
  if (isInstalledExtensionOpen && isRecommendedExtensionOpen) {
    installedHeight -= 256;
    recommendedHeight = 256;
  }
  return (
    <>
      <CollapsibleMenu
        menuName="INSTALLED"
        children={
          <div
            className="overflow-y-scroll"
            style={{ height: installedHeight }}
          >
            {INSTALLED_EXTENSIONS.map((extension) => {
              return (
                <ExtensionCard
                  key={extension.id}
                  info={extension}
                />
              );
            })}
          </div>
        }
        sibbling={
          <div className="bg-[color:var(--accent-color)] mr-2 px-1.5 rounded-full flex items-center justify-center text-xs">
            {INSTALLED_EXTENSIONS.length}
          </div>
        }
        initialState={isInstalledExtensionOpen}
        setIsCollpaisibleHandler={setIsInstalledExtensionOpen}
      />
      <CollapsibleMenu
        menuName="RECOMMENDED"
        children={
          <div
            className="h-64 overflow-y-scroll "
            style={{ height: recommendedHeight }}
          >
            {INSTALLED_EXTENSIONS.map((extension) => {
              return (
                <ExtensionCard
                  key={extension.id}
                  info={extension}
                  isInstalled={false}
                  isRecommended={true}
                />
              );
            })}
          </div>
        }
        sibbling={
          <div className="bg-[color:var(--accent-color)] mr-2 px-1.5 rounded-full flex items-center justify-center text-xs">
            6
          </div>
        }
        initialState={isRecommendedExtensionOpen}
        setIsCollpaisibleHandler={setIsRecommendedExtensionOpen}
      />
    </>
  );
};

export default InstalledAndRecommended;

const INSTALLED_EXTENSIONS = [
  {
    id: "iex1",
    extensionName: "Code Runner",
    imageUrl:
      "https://formulahendry.gallerycdn.vsassets.io/extensions/formulahendry/code-runner/0.12.0/1674458451597/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "",
    publisher: "Jun Han",
    downloadCount: "18.1M",
    description:
      "Run C, C++, Java, JS, PHP, Python, Perl, Ruby, Go, Lua, Groovy, PowerShell, CMD, BASH, F#, C#, VBScript, TypeScript, CoffeeScript, Scala, Swift, Julia, Crystal, OCaml, R, AppleScript, Elixir, VB.NET, Clojure, Haxe, Obj-C, Rust, Racket, Scheme, AutoHotkey, AutoIt, Kotlin, Dart, Pascal, Haskell, Nim,",
    ratings: "Average rating: 4.5 out of 5",
    extensionUrl: "/items?itemName=formulahendry.code-runner",
  },
  {
    id: "iex2",
    extensionName: "C/C++",
    imageUrl:
      "https://ms-vscode.gallerycdn.vsassets.io/extensions/ms-vscode/cpptools/1.14.4/1677636088835/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "microsoft.com",
    publisher: "Microsoft",
    downloadCount: "43.8M",
    description: "C/C++ IntelliSense, debugging, and code browsing.",
    ratings: "Average rating: 3.5 out of 5",
    extensionUrl: "/items?itemName=ms-vscode.cpptools",
  },
  {
    id: "iex3",
    extensionName: "C/C++ Extension Pack",
    imageUrl:
      "https://ms-vscode.gallerycdn.vsassets.io/extensions/ms-vscode/cpptools-extension-pack/1.3.0/1662069439952/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "microsoft.com",
    publisher: "Microsoft",
    downloadCount: "14.6M",
    description:
      "Popular extensions for C++ development in Visual Studio Code.",
    ratings: "Average rating: 4.4 out of 5",
    extensionUrl: "/items?itemName=ms-vscode.cpptools-extension-pack",
  },
  {
    id: "iex4",
    extensionName: "Extension Pack for Java",
    imageUrl:
      "https://vscjava.gallerycdn.vsassets.io/extensions/vscjava/vscode-java-pack/0.25.2023021400/1676343762571/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "microsoft.com",
    publisher: "Microsoft",
    downloadCount: "18.1M",
    description:
      "Popular extensions for Java development that provides Java IntelliSense, debugging, testing, Maven/Gradle support, project management and more",
    ratings: "Average rating: 3.9 out of 5",
    extensionUrl: "/items?itemName=vscjava.vscode-java-pack",
  },
  {
    id: "iex5",
    extensionName: "IntelliCode",
    imageUrl:
      "https://visualstudioexptteam.gallerycdn.vsassets.io/extensions/visualstudioexptteam/vscodeintellicode/1.2.30/1673034060126/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "microsoft.com",
    publisher: "Microsoft",
    downloadCount: "27.3M",
    description: "AI-assisted development",
    ratings: "Average rating: 3.9 out of 5",
    extensionUrl: "/items?itemName=VisualStudioExptTeam.vscodeintellicode",
  },
  {
    id: "iex6",
    extensionName: "isort",
    imageUrl:
      "https://ms-python.gallerycdn.vsassets.io/extensions/ms-python/isort/2023.9.10591013/1677579577238/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "microsoft.com",
    publisher: "Microsoft",
    downloadCount: "18.3M",
    description: "Import Organization support for Python files using `isort`.",
    ratings: "Average rating: 2.2 out of 5",
    extensionUrl: "/items?itemName=ms-python.isort",
  },
  {
    id: "iex7",
    extensionName: "Java Language Support",
    imageUrl:
      "https://georgewfraser.gallerycdn.vsassets.io/extensions/georgewfraser/vscode-javac/0.2.45/1671225201275/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "",
    publisher: "George Fraser",
    downloadCount: "1.6M",
    description: "Java support using the Java Compiler API",
    ratings: "Average rating: 3.0 out of 5",
    extensionUrl: "/items?itemName=georgewfraser.vscode-javac",
  },
  {
    id: "iex8",
    extensionName: "Prettier - Code formatter",
    imageUrl:
      "https://esbenp.gallerycdn.vsassets.io/extensions/esbenp/prettier-vscode/9.10.4/1673460374911/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "prettier.io",
    publisher: "Prettier",
    downloadCount: "30M",
    description: "Code formatter using prettier",
    ratings: "Average rating: 3.7 out of 5",
    extensionUrl: "/items?itemName=esbenp.prettier-vscode",
  },
  {
    id: "iex9",
    extensionName: "Python Extension Pack",
    imageUrl:
      "https://donjayamanne.gallerycdn.vsassets.io/extensions/donjayamanne/python-extension-pack/1.7.0/1636351018144/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "",
    publisher: "Don Jayamanne",
    downloadCount: "4.8M",
    description: "Popular Visual Studio Code extensions for Python",
    ratings: "Average rating: 4.2 out of 5",
    extensionUrl: "/items?itemName=donjayamanne.python-extension-pack",
  },
  {
    id: "iex10",
    extensionName: "Pylance",
    imageUrl:
      "https://ms-python.gallerycdn.vsassets.io/extensions/ms-python/vscode-pylance/2023.3.21/1678324901020/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "microsoft.com",
    publisher: "Microsoft",
    downloadCount: "52.2M",
    description:
      "A performant, feature-rich language server for Python in VS Code",
    ratings: "Average rating: 3.3 out of 5",
    extensionUrl: "/items?itemName=ms-python.vscode-pylance",
  },
  {
    id: "iex11",
    extensionName: "Python",
    imageUrl:
      "https://ms-python.gallerycdn.vsassets.io/extensions/ms-python/python/2023.5.10681722/1678383156309/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "microsoft.com",
    publisher: "Microsoft",
    downloadCount: "79.3M",
    description:
      "IntelliSense (Pylance), Linting, Debugging (multi-threaded, remote), Jupyter Notebooks, code formatting, refactoring, unit tests, and more.",
    ratings: "Average rating: 4.2 out of 5",
    extensionUrl: "/items?itemName=ms-python.python",
  },
  {
    id: "iex12",
    extensionName: "Material Icon Theme",
    imageUrl:
      "https://pkief.gallerycdn.vsassets.io/extensions/pkief/material-icon-theme/4.24.0/1675965546499/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "pkief.com",
    publisher: "Philipp Kief",
    downloadCount: "16.7M",
    description: "Material Design Icons for Visual Studio Code",
    ratings: "Average rating: 4.9 out of 5",
    extensionUrl: "/items?itemName=PKief.material-icon-theme",
  },
];
