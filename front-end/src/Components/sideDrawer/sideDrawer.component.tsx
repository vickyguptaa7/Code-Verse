import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "../../Store/store";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";
import Pannel from "../sidePannel/sidePannel.component";
import Drawer from "./ShowInSideDrawer/ShowInDrawer.component";

const SideDrawer = () => {
  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);
  const isDrawerOpenSideIsLeft = useAppSelector(
    (state) => state.sideDrawer.isDrawerOpenSideIsLeft
  );

  return (
    <div
      className={mergeClass([
        "flex h-full bg-[color:var(--sidedrawer-color)]",
        isDrawerOpenSideIsLeft ? "flex-row-reverse " : "",
      ])}
    >
      <Pannel />
      <AnimatePresence>{isDrawerOpen && <Drawer />}</AnimatePresence>
    </div>
  );
};

export default SideDrawer;
