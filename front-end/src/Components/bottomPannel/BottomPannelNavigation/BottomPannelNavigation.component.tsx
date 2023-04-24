import BottomPannelLeftNavigation from "./BottomPannelLeftNavigation.component";
import BottomPannelRightNavigation from "./BottomPannelRightNavigation.component";

const BottomPannelNavigation = () => {
  return (
    <div className="flex items-center justify-between gap-6 pb-32 mx-4 my-2 -mb-32 overflow-x-auto smd:gap-6 hidescrollbar1 hidescrollbar2">
      <BottomPannelLeftNavigation />
      <BottomPannelRightNavigation />
    </div>
  );
};

export default BottomPannelNavigation;
