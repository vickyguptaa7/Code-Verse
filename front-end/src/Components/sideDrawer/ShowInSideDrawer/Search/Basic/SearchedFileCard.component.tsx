import React from "react";
import { RxCross2 } from "react-icons/rx";
import { VscFile, VscReplace } from "react-icons/vsc";
import { useAppSelector } from "../../../../../Store/store";
import Button from "../../../../UI/Button.component";
import Image from "../../../../UI/Image.component";
import useSearch from "../hooks/useSearch.hook";

interface IPROPS {
  id: string;
  name: string;
  iconUrls: string[];
  removeHandler: (event: React.MouseEvent, id: string) => void;
  openFileHandler: (event: React.MouseEvent, id: string) => void;
}

const SearchedFileCard: React.FC<IPROPS> = ({
  id,
  name,
  iconUrls,
  removeHandler,
  openFileHandler,
}) => {
  
  const isReplaceOpen = useAppSelector((state) => state.search.isReplaceOpen);
  
  const { replaceTextInFiles } = useSearch();
  
  let languageLogo = (
    <div className="max-w-[20px] min-w-[20px]">
      <Image
        fallback={
          <VscFile className="text-[18px] text-[color:var(--primary-color)] " />
        }
        src={iconUrls[0]}
        className="object-contain"
        alt="icon"
      />
    </div>
  );

  return (
    <div
      className="flex items-center cursor-pointer justify-between gap-2 px-2.5 py-1 group hover:bg-[color:var(--hover-text-color)]"
      onClick={(event) => openFileHandler(event, id)}
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
      <div className="close-logo pt-[2px] text-[color:var(--primary-text-color)] group-hover:visible invisible flex">
        {isReplaceOpen ? (
          <Button
            onClick={(event) => {
              event.stopPropagation();
              replaceTextInFiles([{ id: id, type: "file" }]);
            }}
            className="flex items-center justify-start"
            title="Replace"
          >
            <VscReplace className="text-lg hover:text-[color:var(--highlight-text-color)] rounded-md duration-100 p-[2px] flex" />
          </Button>
        ) : null}
        <Button
          onClick={(event) => removeHandler(event, id)}
          title="Remove"
          className="flex items-center justify-start"
        >
          <RxCross2 className="text-lg hover:text-[color:var(--highlight-text-color)] rounded-md duration-100 p-[2px] flex" />
        </Button>
      </div>
    </div>
  );
};

export default SearchedFileCard;
