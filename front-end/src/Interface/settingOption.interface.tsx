import { Dispatch } from "react";

export interface ISettingOption {
  name: string;
  type: string;
  inputType: "number" | "checkbox" | "list";
  info: string;
  initialValue: string | number | boolean | string;
  listOptions?: string[];
  updateInStore: Function;
}
