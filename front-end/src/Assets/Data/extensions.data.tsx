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
      "A performant, feature-rich language server for Python in Code Verse",
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

const RECOMMENTED_EXTENSIONS = [
  {
    id: "rex1",
    extensionName: "LeetCode",
    imageUrl:
      "https://leetcode.gallerycdn.vsassets.io/extensions/leetcode/vscode-leetcode/0.18.1/1652090923340/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "",
    publisher: "力扣 LeetCode",
    downloadCount: "691K",
    description: "Solve LeetCode problems in Code Verse",
    ratings: "Average rating: 4.4 out of 5",
    extensionUrl: "/items?itemName=LeetCode.vscode-leetcode",
  },
  {
    id: "rex2",
    extensionName: "Google Cloud Code",
    imageUrl:
      "https://googlecloudtools.gallerycdn.vsassets.io/extensions/googlecloudtools/cloudcode/1.21.3/1675982856754/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "google.com",
    publisher: "Google Cloud",
    downloadCount: "659K",
    description:
      "Cloud Code is Google Cloud's official IDE extension to develop with your favorite Google Cloud services such as Kubernetes, Cloud Run, and Compute Engine. Cloud Code makes developing with Google Cloud (GCP) feel like working on local code.",
    ratings: "Average rating: 2.9 out of 5",
    extensionUrl: "/items?itemName=GoogleCloudTools.cloudcode",
  },
  {
    id: "rex3",
    extensionName: "colorize",
    imageUrl:
      "https://kamikillerto.gallerycdn.vsassets.io/extensions/kamikillerto/vscode-colorize/0.11.1/1619866227538/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "",
    publisher: "kamikillerto",
    downloadCount: "602K",
    description: "A vscode extension to help visualize css colors in files.",
    ratings: "Average rating: 4.3 out of 5",
    extensionUrl: "/items?itemName=kamikillerto.vscode-colorize",
  },
  {
    id: "rex4",
    extensionName: "File Utils",
    imageUrl:
      "https://sleistner.gallerycdn.vsassets.io/extensions/sleistner/vscode-fileutils/3.10.0/1675098144582/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "",
    publisher: "Steffen Leistner",
    downloadCount: "532K",
    description:
      "A convenient way of creating, duplicating, moving, renaming and deleting files and directories.",
    ratings: "Average rating: 5.0 out of 5",
    extensionUrl: "/items?itemName=sleistner.vscode-fileutils",
  },
  {
    id: "rex5",
    extensionName: "Bracket Pair Colorization Toggler",
    imageUrl:
      "https://dzhavat.gallerycdn.vsassets.io/extensions/dzhavat/bracket-pair-toggler/0.0.3/1675812133561/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "",
    publisher: "Dzhavat Ushev",
    downloadCount: "469K",
    description:
      "Quickly toggle 'Bracket Pair Colorization' setting with a simple command",
    ratings: "Average rating: 3.8 out of 5",
    extensionUrl: "/items?itemName=dzhavat.bracket-pair-toggler",
  },
  {
    id: "rex6",
    extensionName: "Typescript React code snippets",
    imageUrl:
      "https://infeng.gallerycdn.vsassets.io/extensions/infeng/vscode-react-typescript/1.3.1/1563334822132/Microsoft.VisualStudio.Services.Icons.Small",
    verified: "",
    publisher: "infeng",
    downloadCount: "414K",
    description: "Code snippets for react in typescript",
    ratings: "Average rating: 4.6 out of 5",
    extensionUrl: "/items?itemName=infeng.vscode-react-typescript",
  },
];

export { INSTALLED_EXTENSIONS, RECOMMENTED_EXTENSIONS };
