export const SUPPORTED_LANGUAGES = ["cpp", "java", "python", "c", "javascript"];

export const SUPPORTED_LANGUAGES_EXTENSIONS = {
  cpp: "cpp",
  java: "java",
  python: "py",
  c: "c",
  javascript: "js",
};

export const SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS = {
  cpp: "out",
  c: "out",
  java: "",
  python: "",
  javascript: "",
};

export const PATH_TO_CODE_FOLDER = "../temp/code";
export const PATH_TO_OUTPUT_FOLDER = "../temp/output";

export const TimeoutTimeInSeconds = 10;

// The uid and gid are the user id and group id of the user who owns the file on the host machine. 
// 1000 for non-root user on Linux and macOS
export const ID = 1000;
