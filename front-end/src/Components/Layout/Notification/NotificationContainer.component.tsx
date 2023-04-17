import React from "react";
import { useAppSelector } from "../../../Store/store";
import Notification from "./Notification.component";

const NotificationContainer = () => {
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );
  return (
    <div className="absolute flex flex-col items-end justify-center gap-3 bottom-8 right-4">
      {notifications.map((notification) => (
        <Notification key={notification.id} info={notification} />
      ))}
    </div>
  );
};

export default NotificationContainer;
