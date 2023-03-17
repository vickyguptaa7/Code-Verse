import React from "react";
import { RxCross2 } from "react-icons/rx";
import { VscFile } from "react-icons/vsc";
import Button from "../../../../UI/Button.component";

interface IPROPS {
  id: string;
  name: string;
  iconUrls: string[];
  removeHandler: (id: string) => void;
  openFileHandler: (id: string) => void;
}

const SearchedFileCard: React.FC<IPROPS> = ({
  id,
  name,
  iconUrls,
  removeHandler,
  openFileHandler,
}) => {
  let languageLogo: JSX.Element;

  if (iconUrls.length === 0)
    languageLogo = (
      <VscFile className="text-[18px] text-[color:var(--accent-color)] " />
    );
  else
    languageLogo = (
      <div className="max-w-[20px] min-w-[20px]">
        <img src={iconUrls[0]} className="object-contain" alt="icon" />
      </div>
    );

  return (
    <div
      className="flex items-center cursor-pointer justify-between gap-2 px-2.5 py-1 group hover:bg-[color:var(--hover-text-color)]"
      onClick={() => openFileHandler(id)}
    >
      <div className="flex gap-2">
        <div className="flex items-center justify-center language-logo">
          {languageLogo}
        </div>
        <div className="text-start whitespace-nowrap">
          <h1 className="pr-3 text-[color:var(--highlight-text-color)]">
            {name}
          </h1>
        </div>
      </div>
      <div className="close-logo pt-[2px] text-[color:var(--primary-text-color)] group-hover:visible invisible">
        <Button
          onClick={() => removeHandler(id)}
          className="flex items-center justify-start"
        >
          <RxCross2 className="text-lg hover:text-[color:var(--highlight-text-color)] rounded-md duration-100 p-[2px] flex" />
        </Button>
      </div>
    </div>
  );
};

export default SearchedFileCard;
