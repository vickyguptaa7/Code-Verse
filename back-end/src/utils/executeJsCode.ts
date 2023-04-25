const { spawn } = require("child_process");

export const executeJsCode = async (code: string) => {
  return new Promise((resolve, reject) => {
    const child = spawn("node", ["-e", code], {
      stdio: "pipe",
      timeout: 2000,
      resourceLimits: {
        maxOldGenerationSizeMb: 10,
        cpu: 1,
      },
    });
    let output = "";
    child.stdout.on("data", (data: string) => {
      output += data.toString();
    });

    child.stderr.on("data", (data: string) => {
      reject(new Error(data.toString()));
    });

    child.on("close", (code: number) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });

    child.on("error", (err: Error) => {
      reject(err);
    });

    setTimeout(() => {
      child.kill();
      reject(new Error("Process timed out"));
    }, 2000);
  });
};
