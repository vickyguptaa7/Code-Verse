import React from "react";
import { MdVerified } from "react-icons/md";
import {
  VscCloudDownload,
  VscSettingsGear,
  VscStarEmpty,
  VscStarFull,
} from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import { IExtensionInfo } from "../../../../../Interface/Extension.interface";
import { addFileToNavigation } from "../../../../../Store/reducres/Navigation/FileNavigation.reducer";
import { updateFileBody } from "../../../../../Store/reducres/SideDrawer/Directory/Directory.reducer";
import { useAppDispatch, useAppSelector } from "../../../../../Store/store";
import Button from "../../../../UI/Button.component";
import { MIN_DRAWER_SIZE_PX } from "../../../sideDrawer.Constant";

interface IPROPS {
  info: IExtensionInfo;
  isInstalled?: boolean;
  isRecommended?: boolean;
}

const ExtensionCard: React.FC<IPROPS> = ({
  info,
  isInstalled = true,
  isRecommended = false,
}) => {
  const sideDrawerWidth = useAppSelector(
    (state) => state.sideDrawer.sideDrawerWidth
  );
  const dispatch = useAppDispatch();
  const isVerified = info.verified.length !== 0;
  const ratingsStar = info.ratings.split(" ")[2];
  const isImageVisible = Math.abs(MIN_DRAWER_SIZE_PX - sideDrawerWidth) > 30;
  const addExtensionToNavigation = () => {
    dispatch(updateFileBody({id:"extension",body:JSON.stringify(info)}))
    dispatch(addFileToNavigation({ id: "extension", type: "extension" }));
  };
  return (
    <div
      className="cursor-pointer relative flex gap-2 hover:bg-[color:var(--hover-text-color)] px-4 py-3 w-full"
      onClick={addExtensionToNavigation}
    >
      {isRecommended ? (
        <>
          <div className="absolute top-0 left-0 w-0 h-0 border-[color:var(--accent-color)] border-b-[28px] border-l-[28px] border-r-8 border-r-transparent border-b-transparent"></div>
          <VscStarEmpty className="absolute left-[2px] text-xs top-[2px]" />
        </>
      ) : null}
      {isImageVisible ? (
        <div className="min-w-[3.5rem] max-w-[3.5rem]">
          <img
            src={info.imageUrl}
            className="object-contain h-14 aspect-square"
            alt={info.extensionName}
          />
        </div>
      ) : null}

      <div
        className={twMerge(
          "flex flex-col w-[calc(100%-70px)]",
          !isImageVisible ? "w-full" : ""
        )}
      >
        <div className="flex justify-between">
          <h2 className="font-semibold text-[1rem] text-[color:var(--highlight-text-color)] text-ellipsis overflow-hidden">
            {info.extensionName}
          </h2>
          {!isInstalled ? (
            <div
              className="flex items-center justify-start gap-1.5"
              title={info.ratings}
            >
              <div className="flex items-center justify-start gap-1">
                <VscCloudDownload className="text-[color:var(--primary-text-color)]" />{" "}
                <span className="text-xs text-[color:(--highlight-text-color)]">
                  {info.downloadCount}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <VscStarFull className="text-xs text-orange-400" />
                <span className="text-xs text-[color:(--highlight-text-color)]">
                  {ratingsStar}
                </span>
              </div>
            </div>
          ) : null}
        </div>
        <h3 className="text-[color:var(--primary-text-color)] text-ellipsis overflow-hidden mt-0.5">
          {info.description}
        </h3>
        <div className="flex items-center justify-between mt-0.5">
          <div className="flex items-center gap-1 min-w-[10px]">
            {isVerified ? (
              <MdVerified className="text-lg text-blue-500" />
            ) : null}
            <h4 className="text-[color:var(--primary-text-color)] font-semibold overflow-hidden text-ellipsis">
              {info.publisher}
            </h4>
          </div>
          {isInstalled ? (
            <Button className="text-[color:var(--primary-text-color)] hover:text-[color:var(--highlight-text-color)]">
              <VscSettingsGear className="" />
            </Button>
          ) : (
            <Button className="bg-[color:var(--accent-color)] text-xs text-[color:var(--highlight-text-color)] px-1  rounded-sm hover:brightness-125">
              Install
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtensionCard;
