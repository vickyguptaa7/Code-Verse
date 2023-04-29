import Docker from "dockerode";

const docker = new Docker();

export const executeJsCode = async (code: string) => {
  const container = await docker.createContainer({
    Image: "node",
    WorkingDir: "/usr/src/app",
    Tty: true,
    HostConfig: {
      Binds: [`${__dirname}/file.js:/usr/src/app/file.js`],
    },
    Cmd: ["node", "file.js"],
  });

  container.attach(
    { stream: true, stdout: true, stderr: true },
    (err, stream) => {
      if (err) {
        console.error(err);
        return;
      }
      if (stream)
        stream.on("data", (data) => {
          console.log("container : ", data.toString());
        });
    }
  );
  await container.start();
  await container.wait();
  try {
  } catch (err) {
    console.log(err);
  }
  await container.remove();
};
