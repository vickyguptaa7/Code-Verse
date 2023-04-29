import Docker from "dockerode";
import fs from "fs";

const docker = new Docker();

export const executeJsCode = async (code: string) => {
  fs.appendFileSync(`${__dirname}/code.js`, code);

  const container = await docker.createContainer({
    Image: "node",
    WorkingDir: "/usr/src/app",
    Tty: true,
    HostConfig: {
      Binds: [
        `${__dirname}/file.js:/usr/src/app/file.js`,
        `${__dirname}/code.js:/usr/src/app/code.js`,
      ],
    },
    Cmd: ["node", "file.js"],
  });
  let output = "";
  container.attach(
    { stream: true, stdout: true, stderr: true },
    (err, stream) => {
      if (err) {
        console.error(err);
        return;
      }
      if (stream)
        stream.on("data", (data) => {
          output += data.toString();
          console.log("container : ", data.toString());
        });
    }
  );

  try {
    await container.start();
    await container.wait();
  } catch (err) {
    console.log(err);
  }
  fs.unlinkSync(`${__dirname}/code.js`);
  await container.remove();
  return output ;
};
