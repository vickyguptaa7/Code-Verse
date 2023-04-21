import React, { useEffect } from "react";

import { VscClose, VscInfo, VscWarning } from "react-icons/vsc";
import { IoMdDoneAll } from "react-icons/io";
import Button from "../../UI/Button.component";
import "./Notification.styles.css";
import { removeNotification } from "../../../Store/reducres/Notification/Notification.reducer";
import { useAppDispatch } from "../../../Store/store";
import { INotification } from "../../../Interface/Notification.interface";

interface IPROPS {
  notification: INotification;
}

const NOTIFICATION_TIMER = 4000;

const Notification: React.FC<IPROPS> = ({ notification }) => {
  const { id, description, isWaitUntilComplete, type } = notification;
  const dispatch = useAppDispatch();
  const onCloseHandler = () => {
    dispatch(removeNotification({ id: id }));
  };
  useEffect(() => {
    if (isWaitUntilComplete) return;
    const timerId = setTimeout(() => {
      dispatch(removeNotification({ id: id }));
    }, NOTIFICATION_TIMER);
    return () => clearTimeout(timerId);
  }, [dispatch, isWaitUntilComplete, id]);
  return (
    <div className="overflow-hidden shadow-sm hover:brightness-110 w-fit notification shadow-[color:var(--hover-text-color)]">
      <div className="text-[color:var(--highlight-text-color)] py-3 px-2 rouned-sm bg-[color:var(--sidepannel-color)]  flex text-sm items-center gap-1">
        {type === "info" ? (
          <VscInfo className="text-[color:var(--accent-color)] text-2xl" />
        ) : type === "error" ? (
          <VscWarning className="text-[color:var(--accent-color)] text-xl" />
        ) : (
          <IoMdDoneAll className="text-[color:var(--accent-color)] text-2xl p-1 border-[1.5px] rounded-full  border-[color:var(--accent-color)]" />
        )}
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {description}
        </p>
        <div className="flex items-center justify-center gap-1 mx-1">
          <Button
            className="hover:bg-[color:var(--hover-text-color)] p-1 rounded-md"
            onClick={onCloseHandler}
          >
            <VscClose className="text-md" />
          </Button>
        </div>
      </div>
      {isWaitUntilComplete ? <div className="moving-div"></div> : null}
    </div>
  );
};

export default Notification;
// please wait folder is uploading...
