import { motion } from "framer-motion";
import React from "react";
import ReactDOM from "react-dom";
import vscodeImage from "../../Assets/images/code-verse/code-verse.svg";
import { setIsDeleteWarningEnable } from "../../Store/reducres/SideDrawer/SideDrawer.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";
import Button from "./Button.component";

interface IPROPS {
  name: string;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

const Warning: React.FC<IPROPS> = ({ name, onCancel, onDelete }) => {
  const dispatch = useAppDispatch();
  const isChecked = useAppSelector(
    (state) => state.sideDrawer.isDeleteWarningEnable
  );

  const onCheckHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    dispatch(setIsDeleteWarningEnable(!isChecked));
  };

  const content = (
    <div
      className="fixed z-20 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 md:-translate-y-3/4 left-1/2 top-1/2"
      // avoid event bubbling
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <motion.div
        className="flex flex-col gap-4 p-6 bg-[color:var(--dropmenu-bg-color)] rounded-md md:flex-row text-[color:var(--highlight-text-color)] border border-[color:var(--dropmenu-border-color)]"
        initial={{ scale: 0.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        exit={{ scale: 0, transition: { duration: 0.2 } }}
      >
        <div className="flex items-center justify-center md:block ">
          <img
            src={vscodeImage}
            className="w-28 md:w-36 aspect-square"
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-md">
              Are you sure you want to delete {name}?
            </h3>
            <p className="mt-1 text-sm">
              This item will be deleted immediately. You can't undo this
              actions.
            </p>
            <div className="flex justify-center gap-2 mt-0.5 md:justify-start">
              <input
                type="checkbox"
                id="checkbox"
                checked={!isChecked}
                onChange={onCheckHandler}
              />
              <label htmlFor="checkbox">
                <p className="text-[13px] ">Do not ask me again!</p>
              </label>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-6 justify-evenly md:justify-end">
            <Button
              className={mergeClass([
                "px-4 rounded-sm border-2 border-[color:var(--accent-color)] bg-[color:var(--accent-color)] text-[color:var(--dropmenu-bg-color)]",
                "hover:bg-transparent hover:text-[color:var(--accent-color)]",
              ])}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              className={mergeClass([
                "px-4 rounded-sm border-2 text-[color:var(--accent-color)] border-[color:var(--accent-color)] ",
                "hover:bg-[color:var(--accent-color)] hover:text-[color:var(--dropmenu-bg-color)]",
              ])}
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
  const warnElement = document.getElementById("warning-hook");
  return warnElement ? ReactDOM.createPortal(content, warnElement) : null;
};

export default Warning;
