import { v4 as uuid4 } from "uuid";

/**
 * The function generates a unique ID using the uuid4 library and returns it as a string.
 * @returns The function `uniqueIdGenerator` returns a unique identifier generated using the `uuid4`
 * library and converted to a string using the `toString()` method.
 */
export const uniqueIdGenerator = () => {
  return uuid4().toString();
};
