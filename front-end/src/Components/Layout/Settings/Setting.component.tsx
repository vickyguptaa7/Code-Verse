import React, { useRef, useState } from "react";
import SearchInput from "../../sideDrawer/ShowInSideDrawer/Search/Basic/SearchInput.component";
import Input from "../../UI/Input.component";

interface IPROPS {
  height: number;
}

const settingOptions = [
  {
    name: "Editor",
    type: "Font Size",
    inputType: "text",
    info: "Controls the font size in pixels.",
  },
  {
    name: "Editor",
    type: "Word Wrap",
    inputType: "checkbox",
    info: "Controls if lines should wrap.",
  },
];

const Setting: React.FC<IPROPS> = ({ height }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");
  return (
    <div className="overflow-scroll">
      <div
        className="text-[color:var(--highlight-text-color)] w-4/5 mx-auto py-12 px-3 min-w-[16rem] gap-12"
        style={{ height: height }}
      >
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
            User
          </h3>
        </div>
        <div className="w-full h-[1px] bg-[color:var(--primary-text-color)]"></div>
        <div className="flex flex-col gap-8 mt-8">
          {settingOptions
            .filter((o) => o.info.toLowerCase().includes(searchText.toLowerCase()))
            .map((option) => {
              return (
                <div className="text-sm">
                  <h3 className="font-semibold">
                    <span className="text-[color:var(--primary-text-color)] ">
                      {option.name}:
                    </span>
                    <span className="text-[color:var(--highlight-color-text)]">
                      &nbsp;{option.type}
                    </span>
                  </h3>
                  <p className="mt-1 text-xs">{option.info}</p>
                  <Input
                    type={option.inputType}
                    className="mt-2 bg-white"
                    inputRef={null}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Setting;
