import React, { useState } from "react";
import Input from "../../../UI/Input.component";
import { ISettingOption } from "../../../../Interface/settingOption.interface";
import { useAppDispatch } from "../../../../Store/store";

interface IPROPS {
  option: ISettingOption;
}

const SettingInputCards: React.FC<IPROPS> = ({ option }) => {
  const { inputType, name, info, initialValue, listOptions, updateInStore } =
    option;
  const dispatch = useAppDispatch();
  const [inputText, setInputText] = useState(initialValue);

  if (option.inputType === "list")
    return (
      <select
        name={name}
        onChange={(e) => {
          setInputText(e.target.value);
          updateInStore(dispatch, e.target.value);
        }}
        value={inputText as string}
        className=" bg-[color:var(--input-bg-color)] border border-[color:var(--input-border-color)] mt-2 outline-none px-1.5 py-1 rounded-sm min-w-[8rem]"
      >
        {listOptions
          ? listOptions.map((opt) => (
              <option value={opt} key={opt} className="px-1.5 py-1 rounded-sm">
                {opt}
              </option>
            ))
          : ""}
      </select>
    );
  else if (inputType === "number")
    return (
      <Input
        type={inputType}
        className="mt-2 bg-[color:var(--input-bg-color)] border border-[color:var(--input-border-color)] px-2 py-1 text-sm"
        inputRef={null}
        onChange={(e) => {
          setInputText(e.target.value);
          updateInStore(dispatch, e.target.value);
        }}
        value={inputText as typeof inputType}
      />
    );
  else
    return (
      <label className="container mt-2">
        <Input
          type="checkbox"
          className="mt-12 bg-[color:var(--input-bg-color)] "
          inputRef={null}
          onChange={(e) => {
            setInputText(e.target.checked);
            updateInStore(dispatch, e.target.checked);
          }}
          checked={inputText as boolean}
        />
        <span className="checkmark"></span>
        <p className="text-xs">{info}</p>
      </label>
    );
};

export default SettingInputCards;
