import React, { useEffect } from "react";

import { IoMdDoneAll } from "react-icons/io";
import { VscClose, VscInfo, VscWarning } from "react-icons/vsc";
import { INotification } from "../../../@types/Notification.d";
import { removeNotification } from "../../../Store/reducres/Notification/Notification.reducer";
import { useAppDispatch } from "../../../Store/store";
import Button from "../../UI/Button.component";
import "./Notification.styles.css";

import { motion } from "framer-motion";

interface IPROPS {
  notification: INotification;
}

const NOTIFICATION_TIMER = 4000;

const Notification: React.FC<IPROPS> = ({ notification }) => {
  const dispatch = useAppDispatch();
  const { id, description, isWaitUntilComplete, type } = notification;

  const onCloseHandler = () => {
    dispatch(removeNotification({ id: id }));
  };

  // if the notification is not wait until complete then remove the notification after 4 seconds
  useEffect(() => {
    if (isWaitUntilComplete) return;
    const timerId = setTimeout(() => {
      dispatch(removeNotification({ id: id }));
    }, NOTIFICATION_TIMER);
    return () => clearTimeout(timerId);
  }, [dispatch, isWaitUntilComplete, id]);

  return (
    <motion.div
      className="overflow-hidden shadow-sm hover:brightness-110 w-fit notification shadow-[color:var(--hover-text-color)]"
      key={id}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ x: 350, transition: { duration: 0.5, delay: 0.5 } }}
    >
      <div className="text-[color:var(--highlight-text-color)] py-3 px-2 rouned-sm bg-[color:var(--notification-bg-color)]  flex text-sm items-center gap-1">
        {type === "info" ? (
          <VscInfo className="text-[color:var(--primary-color)] text-2xl" />
        ) : type === "error" ? (
          <VscWarning className="text-[color:var(--primary-color)] text-xl" />
        ) : (
          <IoMdDoneAll className="text-[color:var(--primary-color)] text-2xl p-1 border-[1.5px] rounded-full  border-[color:var(--primary-color)]" />
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
    </motion.div>
  );
};

export default Notification;
// please wait folder is uploading...
