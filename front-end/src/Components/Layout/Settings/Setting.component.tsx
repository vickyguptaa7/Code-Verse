import React, { useRef, useState } from "react";
import SearchInput from "../../sideDrawer/ShowInSideDrawer/Search/Basic/SearchInput.component";

import { useSettingData } from "./hooks/useSettingData.hook";

import "./Setting.styles.css";
import SettingList from "./Basic/SettingList.component";

interface IPROPS {
  height: number;
}

const Setting: React.FC<IPROPS> = ({ height }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");
  const settingResult = useSettingData().filter(
    (settingOption) =>
      settingOption.info.toLowerCase().includes(searchText.toLowerCase()) ||
      settingOption.type.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className="oveflow-auto">
      <div
        className="text-[color:var(--highlight-text-color)] w-4/5 mx-auto px-3"
        style={{ height: height}}
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
        <div className="h-[1px] bg-[color:var(--primary-text-color)]"></div>
        <SettingList height={height} settingOptions={settingResult} />
      </div>
    </div>
  );
};

export default Setting;
