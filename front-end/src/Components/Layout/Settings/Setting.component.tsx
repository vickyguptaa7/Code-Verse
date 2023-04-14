import React, { useRef, useState } from "react";
import SearchInput from "../../sideDrawer/ShowInSideDrawer/Search/Basic/SearchInput.component";
import Input from "../../UI/Input.component";

import "./Setting.component.css";

interface IPROPS {
  height: number;
}

const HEIGHT_OF_ABOVE_CONTENTS = 150;

const settingOptions: Array<{
  name: string;
  type: string;
  inputType: "number" | "checkbox" | "list";
  info: string;
  initialValue: string | number | boolean | string;
  listOptions?: string[];
}> = [
  {
    name: "Editor",
    type: "Font Size",
    inputType: "number",
    info: "Controls the font size in pixels.",
    initialValue: 16,
  },
  {
    name: "Editor",
    type: "Word Wrap",
    inputType: "checkbox",
    info: "Controls if lines should wrap.",
    initialValue: true,
  },
  {
    name: "Editor",
    type: "Scroll Beyond Last Line",
    inputType: "checkbox",
    info: "Controls whether the editor will scroll beyond the last line.",
    initialValue: true,
  },
  {
    name: "Editor",
    type: "Minimap Enabled",
    inputType: "checkbox",
    info: "Controls whether the minimap is shown.",
    initialValue: true,
  },
  {
    name: "Editor",
    type: "Tab Size",
    inputType: "number",
    info: "Controls the number of spaces a tab is equal to. This setting is overridden based on the file contents when `#editor.detectIndentation#` is on.",
    initialValue: 4,
  },
  {
    name: "Workbench",
    type: "Color Theme",
    inputType: "list",
    info: "Specifies the color theme used in the workbench.",
    listOptions: ["Dark", "Light"],
    initialValue: "Dark",
  },
  {
    name: "Workbench",
    type: "Side Drawer Position",
    inputType: "list",
    info: "Specifies the position of the side drawer.",
    listOptions: ["left", "right"],
    initialValue: "right",
  },
];

const Setting: React.FC<IPROPS> = ({ height }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");
  return (
    <div
      className="text-[color:var(--highlight-text-color)] w-4/5 mx-auto px-3 min-w-[16rem] gap-12"
      style={{ height: height }}
    >
      <div className="h-12"></div>
      <SearchInput
        inputRef={inputRef}
        initialInput={searchText}
        name="Search settings..."
        className="text-sm"
        durationForDebounce={200}
        updateInStoreText={setSearchText}
      />
      <div className="flex mt-6">
        <h3 className="px-1 pb-1 text-sm border-b-2 border-b-[color:var(--highlight-text-color)]">
          &nbsp;User&nbsp;
        </h3>
      </div>
      <div className="w-full h-[1px] bg-[color:var(--primary-text-color)]"></div>
      <div
        className="flex flex-col my-4 overflow-scroll"
        style={{ height: height - HEIGHT_OF_ABOVE_CONTENTS }}
      >
        {settingOptions
          .filter(
            (o) =>
              o.info.toLowerCase().includes(searchText.toLowerCase()) ||
              o.type.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((option) => {
            let showInput;
            if (option.inputType === "list")
              showInput = (
                <select
                  name={option.name}
                  className="w-48 h-7 bg-[color:var(--sidepannel-color)]"
                >
                  {option.listOptions
                    ? option.listOptions.map((opt) => (
                        <option
                          value={opt}
                          key={opt}
                          selected={opt === option.initialValue}
                        >
                          {opt}
                        </option>
                      ))
                    : ""}
                </select>
              );
            else if (option.inputType === "number")
              showInput = (
                <Input
                  type={option.inputType}
                  className="mt-2 bg-[color:var(--sidepannel-color)] px-2 py-1 text-sm"
                  inputRef={null}
                  value={option.initialValue as number}
                />
              );
            else
              showInput = (
                <label className="container mt-2">
                  <Input
                    type="checkbox"
                    className="mt-12"
                    inputRef={null}
                    checked={option.initialValue as boolean}
                  />
                  <span className="checkmark"></span>
                  <p className="text-xs">{option.info}</p>
                </label>
              );
            return (
              <div className="px-4 py-4 text-sm hover:brightness-125 ">
                <h3 className="font-semibold">
                  <span className="text-[color:var(--primary-text-color)] ">
                    {option.name}:
                  </span>
                  <span className="text-[color:var(--highlight-color-text)]">
                    &nbsp;{option.type}
                  </span>
                </h3>

                {option.inputType === "checkbox" ? (
                  showInput
                ) : (
                  <>
                    <p className="mt-1 text-xs">{option.info}</p>
                    {showInput}
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Setting;
