import { useAppSelector } from "../../Store/store";
import Drawer from "./ShowInSideDrawer/ShowInDrawer.component";
import Pannel from "../sidePannel/sidePannel.component";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";
import { AnimatePresence } from "framer-motion";

const SideDrawer = () => {
  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);

  return (
    <div
      className={mergeClass([
        "flex h-full bg-[color:var(--sidedrawer-color)]"
      ])}
    >
      <Pannel />
      <AnimatePresence>{isDrawerOpen && <Drawer />}</AnimatePresence>
    </div>
  );
};

export default SideDrawer;
