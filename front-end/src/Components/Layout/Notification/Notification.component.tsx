import React, { useEffect } from "react";

import { VscClose, VscInfo } from "react-icons/vsc";
import Button from "../../UI/Button.component";
import "./Notification.component.css";
import {
  removeNotification,
} from "../../../Store/reducres/Notification/Notification.reducer";
import { useAppDispatch } from "../../../Store/store";

interface IPROPS {
  info: { id: string; description: string; isWaitUntilComplete: boolean };
}

const Notification: React.FC<IPROPS> = ({ info }) => {
  const dispatch = useAppDispatch();
  const onCloseHandler = () => {
    dispatch(removeNotification({ id: info.id }));
  };
  useEffect(() => {
    if (info.isWaitUntilComplete) return;
    const timerId = setTimeout(() => {
      dispatch(removeNotification({ id: info.id }));
    }, 3000);
    return () => clearTimeout(timerId);
  }, []);
  return (
    <div className="overflow-hidden hover:brightness-90 w-fit notification">
      <div className="text-[color:var(--highlight-text-color)] py-3 px-2 shadow-md rouned-sm bg-slate-800 shadow-slate-900 flex text-sm items-center gap-1">
        <VscInfo className="text-[color:var(--accent-color)] text-2xl" />
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {info.description}
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
      {info.isWaitUntilComplete ? <div className="moving-div"></div> : null}
    </div>
  );
};

export default Notification;
// please wait folder is uploading...
