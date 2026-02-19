import { useEffect, useRef } from "react";
import useNotification from "@/hooks/notification";
import { useAppSelector } from "@/hooks/redux";
import { selectNotifications } from "@/utils/store/notification/notification.slice";

const Notification = () => {
  const { error } = useNotification();
  const notifications = useAppSelector(selectNotifications);
  const shownCount = useRef(0);

  useEffect(() => {
    const newNotifications = notifications.slice(shownCount.current);

    newNotifications.forEach((notification) => {
      if (notification.type === "error") {
        error(notification.message);
      }
    });

    shownCount.current = notifications.length;
  }, [notifications, error]);

  return null;
};

export default Notification;
