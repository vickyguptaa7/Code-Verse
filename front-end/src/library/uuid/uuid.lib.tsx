import { v4 as uuid4 } from "uuid";

export const uniqueIdGenerator = () => {
  return uuid4().toString();
};
