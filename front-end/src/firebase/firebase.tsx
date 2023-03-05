import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

import { getDoc, getFirestore, doc } from "firebase/firestore";

// import { ref, getStorage, listAll, getDownloadURL } from "firebase/storage";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// functions

export const fetchFolderIcons = async () => {
  const folderIconsRef = doc(db, "folderIcons", "620RerXyAqYImRSeEEei");
  const data = await getDoc(folderIconsRef);
  return data.data();
};

export const fetchFileIcons = async () => {
  const fileIconsRef = doc(db, "fileIcons", "3Nj3kOY2ZZSmpsqm6rZN");
  const data = await getDoc(fileIconsRef);
  return data.data();
};

// # make firebase rules for read and write true for the accessing the files
// Used for adding the file icons to the firestore from the stored images of the google storage

// export const addDataToFireStore = async (name: Map<string, string>) => {
//   const fileIconsRef = doc(db, "fileIcons", "3Nj3kOY2ZZSmpsqm6rZN");
//   await setDoc(fileIconsRef, Object.fromEntries(name));
// };

// const storage = getStorage();

// export const getAllLinks = async () => {
//   // Create a reference under which you want to list
//   const listRef = ref(storage, "fileIcons");
//   console.log(newIconsList);

//   // Find all the prefixes and items.
//   try {
//     const list = await listAll(listRef);
//     let mapping = new Map();
//     for (const itemRef of list.items) {
//       const downloadURL = await getDownloadURL(itemRef);
//       mapping.set(
//         itemRef.name.split(".")[0].toString(),
//         downloadURL.toString()
//       );
//     }
//     console.log(mapping);
//     let extensionsMap = new Map();
//     newIconsList.forEach((icon) => {
//       const url = mapping.get(icon.name);
//       icon.extensions.forEach((ext) => {
//         extensionsMap.set(ext, url);
//       });
//     });
//     console.log(extensionsMap);

//     addDataToFireStore(extensionsMap);
//   } catch (err) {
//     console.log("error : ", err);
//   }

  // .then((res) => {
  //   res.prefixes.forEach((folderRef) => {
  //     // All the prefixes under listRef.
  //     // You may call listAll() recursively on them.
  //   });

  // })
  // .catch((error) => {
  //   // Uh-oh, an error occurred!
  //   console.log(error);
  // });
// };

// export const newIconsList = [
//   { name: "html", extensions: ["htm", "xhtml", "html_vm", "asp"] },
//   { name: "pug", extensions: ["jade", "pug"] },
//   { name: "markdown", extensions: ["md", "markdown", "rst"] },
//   { name: "blink", extensions: ["blink"] },
//   { name: "css", extensions: ["css"] },
//   { name: "sass", extensions: ["scss", "sass"] },
//   { name: "less", extensions: ["less"] },
//   {
//     name: "json",
//     extensions: ["json", "jsonc", "tsbuildinfo", "json5", "jsonl", "ndjson"],
//   },
//   { name: "jinja", extensions: ["jinja", "jinja2", "j2", "jinja-html"] },
//   { name: "proto", extensions: ["proto"] },
//   { name: "sublime", extensions: ["sublime-project", "sublime-workspace"] },
//   { name: "twine", extensions: ["tw", "twee"] },
//   { name: "yaml", extensions: ["yml", "yaml", "YAML-tmLanguage"] },
//   {
//     name: "xml",
//     extensions: [
//       "xml",
//       "plist",
//       "xsd",
//       "dtd",
//       "xsl",
//       "xslt",
//       "resx",
//       "iml",
//       "xquery",
//       "tmLanguage",
//       "manifest",
//       "project",
//       "dmn",
//       "jrxml",
//     ],
//   },
//   {
//     name: "image",
//     extensions: [
//       "png",
//       "jpeg",
//       "jpg",
//       "gif",
//       "ico",
//       "tif",
//       "tiff",
//       "psd",
//       "psb",
//       "ami",
//       "apx",
//       "avif",
//       "bmp",
//       "bpg",
//       "brk",
//       "cur",
//       "dds",
//       "dng",
//       "exr",
//       "fpx",
//       "gbr",
//       "img",
//       "jbig2",
//       "jb2",
//       "jng",
//       "jxr",
//       "pgf",
//       "pic",
//       "raw",
//       "webp",
//       "eps",
//       "afphoto",
//       "ase",
//       "aseprite",
//       "clip",
//       "cpt",
//       "heif",
//       "heic",
//       "kra",
//       "mdp",
//       "ora",
//       "pdn",
//       "reb",
//       "sai",
//       "tga",
//       "xcf",
//       "jfif",
//       "ppm",
//       "pbm",
//       "pgm",
//       "pnm",
//       "icns",
//     ],
//   },
//   { name: "javascript", extensions: ["esx", "mjs"] },
//   { name: "react", extensions: ["jsx"] },
//   { name: "react_ts", extensions: ["tsx"] },
//   {
//     name: "settings",
//     extensions: [
//       "ini",
//       "dlc",
//       "dll",
//       "config",
//       "conf",
//       "properties",
//       "prop",
//       "settings",
//       "option",
//       "props",
//       "toml",
//       "prefs",
//       "cfg",
//     ],
//   },
//   { name: "markojs", extensions: ["marko"] },
//   { name: "astro", extensions: ["astro"] },
//   { name: "pdf", extensions: ["pdf"] },
//   {
//     name: "table",
//     extensions: ["xlsx", "xlsm", "xls", "csv", "tsv", "psv", "ods"],
//   },
//   {
//     name: "vscode",
//     extensions: [
//       "vscodeignore",
//       "vsixmanifest",
//       "vsix",
//       "code-workplace",
//       "code-workspace",
//       "code-profile",
//       "code-snippets",
//     ],
//   },
//   {
//     name: "visualstudio",
//     extensions: [
//       "csproj",
//       "ruleset",
//       "sln",
//       "suo",
//       "vb",
//       "vbs",
//       "vcxitems",
//       "vcxproj",
//     ],
//   },
//   {
//     name: "database",
//     extensions: [
//       "pdb",
//       "sql",
//       "pks",
//       "pkb",
//       "accdb",
//       "mdb",
//       "sqlite",
//       "sqlite3",
//       "pgsql",
//       "postgres",
//       "psql",
//       "db",
//       "db3",
//     ],
//   },
//   { name: "kusto", extensions: ["kql"] },
//   { name: "csharp", extensions: ["cs", "csx"] },
//   { name: "qsharp", extensions: ["qs"] },
//   {
//     name: "zip",
//     extensions: [
//       "zip",
//       "tar",
//       "gz",
//       "xz",
//       "lzma",
//       "lz4",
//       "br",
//       "bz2",
//       "bzip2",
//       "gzip",
//       "brotli",
//       "7z",
//       "rar",
//       "tz",
//       "txz",
//       "tgz",
//     ],
//   },
//   { name: "vala", extensions: ["vala"] },
//   { name: "zig", extensions: ["zig"] },
//   { name: "exe", extensions: ["exe", "msi"] },
//   { name: "hex", extensions: ["dat", "bin", "hex"] },
//   { name: "java", extensions: ["java", "jsp"] },
//   { name: "jar", extensions: ["jar"] },
//   { name: "javaclass", extensions: ["class"] },
//   { name: "c", extensions: ["c", "i", "mi"] },
//   { name: "h", extensions: ["h"] },
//   { name: "cpp", extensions: ["cc", "cpp", "cxx", "c++", "cp", "mii", "ii"] },
//   { name: "hpp", extensions: ["hh", "hpp", "hxx", "h++", "hp", "tcc", "inl"] },
//   { name: "objective-c", extensions: ["m"] },
//   { name: "objective-cpp", extensions: ["mm"] },
//   { name: "go", extensions: ["go"] },
//   { name: "python", extensions: ["py"] },
//   { name: "python-misc", extensions: ["pyc", "whl"] },
//   { name: "url", extensions: ["url"] },
//   {
//     name: "console",
//     extensions: [
//       "sh",
//       "ksh",
//       "csh",
//       "tcsh",
//       "zsh",
//       "bash",
//       "bat",
//       "cmd",
//       "awk",
//       "fish",
//       "exp",
//       "nu",
//     ],
//   },
//   {
//     name: "powershell",
//     extensions: ["ps1", "psm1", "psd1", "ps1xml", "psc1", "pssc"],
//   },
//   { name: "gradle", extensions: ["gradle"] },
//   { name: "word", extensions: ["doc", "docx", "rtf", "odt"] },
//   { name: "certificate", extensions: ["cer", "cert", "crt"] },
//   { name: "key", extensions: ["pub", "key", "pem", "asc", "gpg", "passwd"] },
//   {
//     name: "font",
//     extensions: [
//       "woff",
//       "woff2",
//       "ttf",
//       "eot",
//       "suit",
//       "otf",
//       "bmap",
//       "fnt",
//       "odttf",
//       "ttc",
//       "font",
//       "fonts",
//       "sui",
//       "ntf",
//       "mrf",
//     ],
//   },
//   { name: "lib", extensions: ["lib", "bib"] },
//   { name: "ruby", extensions: ["rb", "erb"] },
//   { name: "fsharp", extensions: ["fs", "fsx", "fsi", "fsproj"] },
//   { name: "swift", extensions: ["swift"] },
//   { name: "arduino", extensions: ["ino"] },
//   { name: "docker", extensions: ["dockerignore", "dockerfile"] },
//   { name: "tex", extensions: ["tex", "sty", "dtx", "ltx"] },
//   {
//     name: "powerpoint",
//     extensions: [
//       "pptx",
//       "ppt",
//       "pptm",
//       "potx",
//       "potm",
//       "ppsx",
//       "ppsm",
//       "pps",
//       "ppam",
//       "ppa",
//       "odp",
//     ],
//   },
//   {
//     name: "video",
//     extensions: [
//       "webm",
//       "mkv",
//       "flv",
//       "vob",
//       "ogv",
//       "ogg",
//       "gifv",
//       "avi",
//       "mov",
//       "qt",
//       "wmv",
//       "yuv",
//       "rm",
//       "rmvb",
//       "mp4",
//       "m4v",
//       "mpg",
//       "mp2",
//       "mpeg",
//       "mpe",
//       "mpv",
//       "m2v",
//     ],
//   },
//   { name: "virtual", extensions: ["vdi", "vbox", "vbox-prev"] },
//   { name: "email", extensions: ["ics"] },
//   { name: "audio", extensions: ["mp3", "flac", "m4a", "wma", "aiff", "wav"] },
//   { name: "coffee", extensions: ["coffee", "cson", "iced"] },
//   { name: "document", extensions: ["txt"] },
//   { name: "graphql", extensions: ["graphql", "gql"] },
//   { name: "rust", extensions: ["rs", "ron"] },
//   { name: "raml", extensions: ["raml"] },
//   { name: "xaml", extensions: ["xaml"] },
//   { name: "haskell", extensions: ["hs"] },
//   { name: "kotlin", extensions: ["kt", "kts"] },
//   { name: "otne", extensions: ["otne"] },
//   { name: "git", extensions: ["patch"] },
//   { name: "lua", extensions: ["lua"] },
//   { name: "clojure", extensions: ["clj", "cljs", "cljc"] },
//   { name: "groovy", extensions: ["groovy"] },
//   { name: "r", extensions: ["r", "rmd"] },
//   { name: "dart", extensions: ["dart"] },
//   { name: "actionscript", extensions: ["as"] },
//   { name: "mxml", extensions: ["mxml"] },
//   { name: "autohotkey", extensions: ["ahk"] },
//   { name: "flash", extensions: ["swf"] },
//   { name: "swc", extensions: ["swc"] },
//   { name: "cmake", extensions: ["cmake"] },
//   {
//     name: "assembly",
//     extensions: [
//       "asm",
//       "a51",
//       "inc",
//       "nasm",
//       "s",
//       "ms",
//       "agc",
//       "ags",
//       "aea",
//       "argus",
//       "mitigus",
//       "binsource",
//     ],
//   },
//   { name: "vue", extensions: ["vue"] },
//   { name: "ocaml", extensions: ["ml", "mli", "cmx"] },
//   { name: "odin", extensions: ["odin"] },
//   { name: "lock", extensions: ["lock"] },
//   { name: "handlebars", extensions: ["hbs", "mustache"] },
//   { name: "perl", extensions: ["pm", "raku"] },
//   { name: "haxe", extensions: ["hx"] },
//   { name: "puppet", extensions: ["pp"] },
//   { name: "elixir", extensions: ["ex", "exs", "eex", "leex", "heex"] },
//   { name: "livescript", extensions: ["ls"] },
//   { name: "erlang", extensions: ["erl"] },
//   { name: "twig", extensions: ["twig"] },
//   { name: "julia", extensions: ["jl"] },
//   { name: "elm", extensions: ["elm"] },
//   { name: "purescript", extensions: ["pure", "purs"] },
//   { name: "smarty", extensions: ["tpl"] },
//   { name: "stylus", extensions: ["styl"] },
//   { name: "reason", extensions: ["re", "rei"] },
//   { name: "bucklescript", extensions: ["cmj"] },
//   { name: "merlin", extensions: ["merlin"] },
//   { name: "verilog", extensions: ["vhd", "sv", "svh"] },
//   { name: "mathematica", extensions: ["nb"] },
//   { name: "wolframlanguage", extensions: ["wl", "wls"] },
//   { name: "nunjucks", extensions: ["njk", "nunjucks"] },
//   { name: "robot", extensions: ["robot"] },
//   { name: "solidity", extensions: ["sol"] },
//   { name: "autoit", extensions: ["au3"] },
//   { name: "haml", extensions: ["haml"] },
//   { name: "yang", extensions: ["yang"] },
//   { name: "mjml", extensions: ["mjml"] },
//   { name: "terraform", extensions: ["tf", "tfvars", "tfstate"] },
//   { name: "applescript", extensions: ["applescript", "ipa"] },
//   { name: "cake", extensions: ["cake"] },
//   { name: "cucumber", extensions: ["feature", "features"] },
//   { name: "nim", extensions: ["nim", "nimble"] },
//   { name: "apiblueprint", extensions: ["apib", "apiblueprint"] },
//   { name: "riot", extensions: ["riot", "tag"] },
//   { name: "vfl", extensions: ["vfl"] },
//   { name: "kl", extensions: ["kl"] },
//   { name: "postcss", extensions: ["pcss", "sss"] },
//   { name: "todo", extensions: ["todo"] },
//   { name: "coldfusion", extensions: ["cfml", "cfc", "lucee", "cfm"] },
//   { name: "cabal", extensions: ["cabal"] },
//   { name: "nix", extensions: ["nix"] },
//   { name: "slim", extensions: ["slim"] },
//   { name: "http", extensions: ["http", "rest"] },
//   { name: "restql", extensions: ["rql", "restql"] },
//   { name: "kivy", extensions: ["kv"] },
//   { name: "graphcool", extensions: ["graphcool"] },
//   { name: "sbt", extensions: ["sbt"] },
//   { name: "android", extensions: ["apk", "smali", "dex"] },
//   { name: "tune", extensions: ["env"] },
//   { name: "jenkins", extensions: ["jenkinsfile", "jenkins"] },
//   { name: "figma", extensions: ["fig"] },
//   { name: "crystal", extensions: ["cr", "ecr"] },
//   { name: "cuda", extensions: ["cu", "cuh"] },
//   { name: "log", extensions: ["log"] },
//   { name: "dotjs", extensions: ["def", "dot", "jst"] },
//   { name: "ejs", extensions: ["ejs"] },
//   { name: "processing", extensions: ["pde"] },
//   { name: "wepy", extensions: ["wpy"] },
//   { name: "hcl", extensions: ["hcl"] },
//   { name: "san", extensions: ["san"] },
//   { name: "django", extensions: ["djt"] },
//   { name: "red", extensions: ["red"] },
//   { name: "makefile", extensions: ["mk"] },
//   { name: "foxpro", extensions: ["fxp", "prg"] },
//   { name: "i18n", extensions: ["pot", "po", "mo", "lang"] },
//   { name: "webassembly", extensions: ["wat", "wasm"] },
//   { name: "jupyter", extensions: ["ipynb"] },
//   { name: "d", extensions: ["d"] },
//   { name: "mdx", extensions: ["mdx"] },
//   { name: "mdsvex", extensions: ["svx"] },
//   { name: "ballerina", extensions: ["bal", "balx"] },
//   { name: "racket", extensions: ["rkt"] },
//   { name: "bazel", extensions: ["bzl", "bazel"] },
//   { name: "mint", extensions: ["mint"] },
//   { name: "velocity", extensions: ["vm", "fhtml", "vtl"] },
//   { name: "godot", extensions: ["gd"] },
//   {
//     name: "godot-assets",
//     extensions: [
//       "godot",
//       "tres",
//       "tscn",
//       "gdns",
//       "gdnlib",
//       "gdshader",
//       "gdextension",
//     ],
//   },
//   { name: "azure", extensions: ["azcli"] },
//   { name: "vagrant", extensions: ["vagrantfile"] },
//   { name: "prisma", extensions: ["prisma"] },
//   { name: "razor", extensions: ["cshtml", "vbhtml"] },
//   { name: "abc", extensions: ["abc"] },
//   { name: "asciidoc", extensions: ["ad", "adoc", "asciidoc"] },
//   { name: "edge", extensions: ["edge"] },
//   { name: "scheme", extensions: ["ss", "scm"] },
//   { name: "lisp", extensions: ["lisp", "lsp", "cl", "fast"] },
//   {
//     name: "3d",
//     extensions: [
//       "stl",
//       "stp",
//       "obj",
//       "ac",
//       "blend",
//       "fbx",
//       "mesh",
//       "mqo",
//       "pmd",
//       "pmx",
//       "skp",
//       "vac",
//       "vdp",
//       "vox",
//     ],
//   },
//   { name: "svg", extensions: ["svg"] },
//   { name: "svelte", extensions: ["svelte"] },
//   { name: "vim", extensions: ["vimrc", "gvimrc", "exrc", "vim", "viminfo"] },
//   { name: "moonscript", extensions: ["moon"] },
//   { name: "advpl_prw", extensions: ["prw", "prx"] },
//   { name: "advpl_ptm", extensions: ["ptm"] },
//   { name: "advpl_tlpp", extensions: ["tlpp"] },
//   { name: "advpl_include", extensions: ["ch"] },
//   { name: "disc", extensions: ["iso"] },
//   { name: "fortran", extensions: ["f", "f77", "f90", "f95", "f03", "f08"] },
//   { name: "tcl", extensions: ["tcl"] },
//   { name: "liquid", extensions: ["liquid"] },
//   { name: "prolog", extensions: ["p", "pro", "pl"] },
//   { name: "coconut", extensions: ["coco"] },
//   { name: "sketch", extensions: ["sketch"] },
//   { name: "pawn", extensions: ["pwn", "amx"] },
//   { name: "forth", extensions: ["4th", "fth", "frt"] },
//   { name: "uml", extensions: ["iuml", "pu", "puml", "plantuml", "wsd"] },
//   { name: "meson", extensions: ["wrap"] },
//   { name: "dhall", extensions: ["dhall", "dhallb"] },
//   {
//     name: "sml",
//     extensions: [
//       "sml",
//       "mlton",
//       "mlb",
//       "sig",
//       "fun",
//       "cm",
//       "lex",
//       "use",
//       "grm",
//     ],
//   },
//   { name: "opam", extensions: ["opam"] },
//   { name: "imba", extensions: ["imba"] },
//   { name: "drawio", extensions: ["drawio", "dio"] },
//   { name: "pascal", extensions: ["pas"] },
//   { name: "shaderlab", extensions: ["unity"] },
//   {
//     name: "sas",
//     extensions: ["sas", "sas7bdat", "sashdat", "astore", "ast", "sast"],
//   },
//   { name: "nuget", extensions: ["nupkg"] },
//   { name: "command", extensions: ["command"] },
//   { name: "denizenscript", extensions: ["dsc"] },
//   { name: "search", extensions: ["code-search"] },
//   { name: "nginx", extensions: ["nginx", "nginxconfig"] },
//   {
//     name: "minecraft",
//     extensions: [
//       "mcfunction",
//       "mcmeta",
//       "mcr",
//       "mca",
//       "mcgame",
//       "mclevel",
//       "mcworld",
//       "mine",
//       "mus",
//       "mcstructure",
//       "mcpack",
//       "mcaddon",
//     ],
//   },
//   { name: "rescript", extensions: ["res"] },
//   { name: "rescript-interface", extensions: ["resi"] },
//   { name: "brainfuck", extensions: ["b", "bf"] },
//   { name: "bicep", extensions: ["bicep"] },
//   { name: "cobol", extensions: ["cob", "cbl"] },
//   { name: "grain", extensions: ["gr"] },
//   { name: "lolcode", extensions: ["lol"] },
//   { name: "idris", extensions: ["idr", "ibc"] },
//   { name: "pipeline", extensions: ["pipeline"] },
//   { name: "opa", extensions: ["rego"] },
//   { name: "windicss", extensions: ["windi"] },
//   { name: "scala", extensions: ["scala", "sc"] },
//   { name: "lilypond", extensions: ["ly"] },
//   { name: "vlang", extensions: ["v"] },
//   { name: "chess", extensions: ["pgn", "fen"] },
//   { name: "gemini", extensions: ["gmi", "gemini"] },
//   { name: "tauri", extensions: ["tauri"] },
//   { name: "ada", extensions: ["ada", "adb", "ads", "ali"] },
//   { name: "coala", extensions: ["coarc", "coafile"] },
//   { name: "dinophp", extensions: ["bubble"] },
//   { name: "teal", extensions: ["tl"] },
//   { name: "template", extensions: ["template"] },
//   {
//     name: "shader",
//     extensions: [
//       "glsl",
//       "vert",
//       "tesc",
//       "tese",
//       "geom",
//       "frag",
//       "comp",
//       "shader",
//       "vertexshader",
//       "fragmentshader",
//       "geometryshader",
//       "computeshader",
//       "hlsl",
//       "wgsl",
//     ],
//   },
//   { name: "siyuan", extensions: ["sy"] },
//   { name: "tobi", extensions: ["tobi"] },
//   { name: "gleam", extensions: ["gleam"] },
//   { name: "tree", extensions: ["tree"] },
//   { name: "cadence", extensions: ["cdc"] },
//   { name: "antlr", extensions: ["g4"] },
//   { name: "pinejs", extensions: ["pine"] },
//   { name: "gamemaker", extensions: ["gml", "yy", "yyp", "yyz"] },
//   { name: "tldraw", extensions: ["tldr"] },
// ];

