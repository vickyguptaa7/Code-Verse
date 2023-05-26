import React from "react";
import { MdVerified } from "react-icons/md";
import { VscCloudDownload, VscStarFull } from "react-icons/vsc";
import { IExtensionInfo } from "../../../@types/Extension.d";
import defaultIcon from "../../../Assets/images/Extension/defaultIcon.png";
import { useAppSelector } from "../../../Store/store";
import Button from "../../UI/Button.component";
import Image from "../../UI/Image.component";

interface IPROPS {
  height: number;
}
const CODEVERSE_MARKETPLACE_INITIAL_URL =
  "https://marketplace.visualstudio.com";

const ExtensionDetails: React.FC<IPROPS> = ({ height }) => {
  const fileInformations = useAppSelector(
    (state) => state.Directory.filesInformation
  );

  // parse the extension info from the file information
  const info: IExtensionInfo = JSON.parse(fileInformations.extension.body);

  // get the ratings star from the info
  const ratingsStar = info.ratings.split(" ")[2];

  return (
    <div className="overflow-auto hidescrollbar1 hidescrollbar2">
      <div
        className="text-[color:var(--highlight-text-color)] w-4/5 mx-auto px-3 min-w-[16rem]"
        style={{ height: height }}
      >
        {/* use this div for just vertical spacing using margin or padding wont allow to fully expand the bottomPannel */}
        <div className="h-6"></div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="min-w-[160px] max-w-[160px] aspect-square flex items-center justify-center">
            <Image
              fallback={<img src={defaultIcon} alt="" />}
              src={info.imageUrl.replace("Small", "Default")}
              alt={info.extensionName}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold">{info.extensionName}</h1>
            <div className="flex items-center">
              <h3 className="font-semibold text-md">{info.publisher}</h3>
              {info.verified.length !== 0 ? (
                <>
                  <MdVerified className="ml-2 text-blue-500 " />
                  <h3
                    className="ml-1 text-blue-500 cursor-pointer"
                    onClick={() => {
                      window.open("https://" + info.verified, "_blank");
                    }}
                  >
                    {info.verified}
                  </h3>
                </>
              ) : null}
            </div>
            <div
              className="flex items-center justify-start gap-1.5 mt-0.5"
              title={info.ratings}
            >
              <div className="flex items-center justify-start gap-1">
                <VscCloudDownload className="text-[color:var(--primary-text-color)] text-xl" />
                <span className="text-sm text-[color:(--highlight-text-color)]">
                  {info.downloadCount}
                </span>
              </div>
              <span className="w-[1px] h-5 bg-[color:var(--primary-text-color)]"></span>
              <div className="flex items-center justify-center gap-1">
                <VscStarFull className="text-orange-400 text-md" />
                <span className="text-sm text-[color:(--highlight-text-color)]">
                  {ratingsStar}
                </span>
              </div>
              <span className="w-[1px] h-5 bg-[color:var(--primary-text-color)]"></span>
              <span className="text-sm">Free</span>
            </div>
            <Button
              className="bg-[color:var(--primary-color)] w-fit px-4 py-0.5 rounded-sm mt-2.5 hover:brightness-125 text-white"
              onClick={() => {
                window.open(
                  CODEVERSE_MARKETPLACE_INITIAL_URL + info.extensionUrl,
                  "_blank"
                );
              }}
            >
              More Info
            </Button>
          </div>
        </div>
        <div className="w-full mt-4">
          <div className="flex">
            <h3 className="px-1 pb-1 text-md text-[color:var(--highlight-text-color)] border-b-2 border-b-[color:var(--primary-color)]">
              DETAILS
            </h3>
          </div>
          <div className="w-full h-[2px] bg-[color:var(--border-color)]"></div>
          <div className="mt-1">
            <p className="text-[color:var(--tertiary-text-color)]">
              {info.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtensionDetails;
