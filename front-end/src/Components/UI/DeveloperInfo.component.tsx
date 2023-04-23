import { motion } from "framer-motion";

import { VscLocation } from "react-icons/vsc";
import codeforces from "../../Assets/images/social/codeforces.svg";
import developer from "../../Assets/images/social/dev.webp";
import github from "../../Assets/images/social/github.svg";
import leetcode from "../../Assets/images/social/leetcode.svg";
import linkedin from "../../Assets/images/social/linkedin.svg";
import { useAppSelector } from "../../Store/store";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";
import Button from "./Button.component";

const githubUrl = "https://github.com/vickyguptaa7";
const leetcodeUrl = "https://leetcode.com/vickyguptaa7/";
const codeforcesUrl = "https://codeforces.com/profile/vickyguptaa7";
const linkedinUrl = "https://www.linkedin.com/in/vickyguptaa7/";

const DeveloperInfo = () => {
  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );
  
  const onClickHandler = (url: string) => {
    window.open(url, "_blank");
  };
  
  return (
    <motion.div
      className={mergeClass([
        "absolute z-10 flex flex-col items-start w-56 rounded-md overflow-hidden bottom-[74px]",
        isSidePannelPositionOnLeft ? "left-[54px]" : "right-[54px]",
      ])}
      initial={{
        x: isSidePannelPositionOnLeft ? -125 : 125,
        y: 120,
        scale: 0,
        opacity: 0,
      }}
      animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{
        x: isSidePannelPositionOnLeft ? -125 : 125,
        y: 120,
        scale: 0,
        opacity: 0,
      }}
    >
      <div className="bg-[color:var(--primary-color)] h-20 w-full"></div>
      <div className="absolute flex items-center justify-around w-full top-4 ">
        <img
          src={developer}
          className="h-24 rounded-full aspect-square border-[5px] border-[color:var(--primary-color)]"
          alt=""
        />
      </div>
      <div className="flex flex-col items-center justify-between w-full px-4 pt-10 pb-8 bg-gray-50 ">
        <h3 className="whitespace-nowrap text-[color:var(--primary-color)] font-semibold">
          Vicky Gupta
        </h3>
        <div className="bg-[color:var(--highlight-text-color)] h-[3px] w-8 rounded-lg mt-0.5"></div>
        <h4 className="whitespace-nowrap text-[color:var(--primary-text-color)] text-sm mt-1">
          Web Developer
        </h4>
        <div className="flex gap-1 mt-0.5 text-xs">
          <VscLocation className="text-[1rem]" />
          <h5>India, Delhi</h5>
        </div>
      </div>
      <div className="flex items-center justify-around w-full px-4 py-4 bg-[color:var(--primary-color)] relative">
        <Button
          className="absolute left-6 -top-4 "
          onClick={() => onClickHandler(leetcodeUrl)}
        >
          <img
            src={leetcode}
            className="p-1 duration-300 rounded-bl-full rounded-br-full h-7 bg-gray-50 hover:-translate-y-1"
            alt="leetcode"
          />
        </Button>
        <Button
          className="absolute -top-4 left-[74px]"
          onClick={() => onClickHandler(codeforcesUrl)}
        >
          <img
            src={codeforces}
            className="p-1 duration-300 rounded-bl-full rounded-br-full h-7 bg-gray-50 hover:-translate-y-1"
            alt="codeforces"
          />
        </Button>
        <Button
          className="absolute right-[74px] -top-4"
          onClick={() => onClickHandler(githubUrl)}
        >
          <img
            src={github}
            className="p-1 duration-300 rounded-bl-full rounded-br-full h-7 bg-gray-50 hover:-translate-y-1"
            alt="github"
          />
        </Button>
        <Button
          className="absolute right-6 -top-4"
          onClick={() => onClickHandler(linkedinUrl)}
        >
          <img
            src={linkedin}
            className="p-1 duration-300 rounded-bl-full rounded-br-full h-7 bg-gray-50 hover:-translate-y-1"
            alt="linkedin"
          />
        </Button>
      </div>
    </motion.div>
  );
};

export default DeveloperInfo;
