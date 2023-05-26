import React from "react";
import { ISettingOption } from "../../../../@types/settingOption.d";
import SettingInputCards from "./SettingInputCards.component";

const HEIGHT_OF_ABOVE_CONTENTS = 150;

interface IPROPS {
  height: number;
  settingOptions: Array<ISettingOption>;
}

const SettingList: React.FC<IPROPS> = ({ height, settingOptions }) => {
  return (
    <div
      className="flex flex-col my-4 overflow-auto"
      style={{ height: height - HEIGHT_OF_ABOVE_CONTENTS }}
    >
      {settingOptions.map((option) => {
        return (
          <div
            className="px-4 py-4 text-sm hover:bg-[color:var(--border-color)] "
            key={option.type}
          >
            <h3 className="font-semibold">
              <span className="text-[color:var(--primary-text-color)] ">
                {option.name}:
              </span>
              <span className="text-[color:var(--highlight-color-text)]">
                &nbsp;{option.type}
              </span>
            </h3>
            {option.inputType === "checkbox" ? (
              <SettingInputCards option={option} />
            ) : (
              <>
                <p className="mt-1 text-xs">{option.info}</p>
                <SettingInputCards option={option} />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SettingList;
