const { spawn } = require("child_process");

const execute = async () => {
  return new Promise((resolve, reject) => {
    const child = spawn("node", ["code.js"], {
      stdio: "pipe",
      timeout: 2000,
      resourceLimits: {
        maxOldGenerationSizeMb: 256,
      },
    });
    let output = "";
    child.stdout.on("data", (data) => {
      output += data.toString().trim();
    });

    child.stderr.on("data", (data) => {
      reject(new Error(data.toString()));
    });

    const timerId = setTimeout(() => {
      child.kill();
      reject(new Error("Process timed out"));
    }, 2000);

    child.on("close", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
      clearTimeout(timerId);
    });

    child.on("error", (err) => {
      reject(err);
      clearTimeout(timerId);
    });
  });
};

const run = async () => {
  try {
    const output = await execute();
    console.log(output);
  } catch (err) {
    console.log(err);
  }
};
run();
