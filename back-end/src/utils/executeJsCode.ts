import { VM } from "vm2";

export const executeJsCode = async (code: string) => {
  let output = "";
  const vm = new VM({
    timeout: 1000,
    allowAsync: false,
    sandbox: {
      setTimeout,
      require,
      console: {
        log: (data: string) => {
          output += data;
        },
      },
    },
  });
  try {
    vm.run(code);
    return output;
  } catch (err) {
    console.log(err);
    if (err instanceof Error) throw new Error(err.message);
    else throw new Error("Something went wrong while executing your code");
  }
};
