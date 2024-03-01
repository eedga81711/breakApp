/* eslint-disable no-unused-vars */
import React from "react";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";

const Notification = () => {
  return (
    <div className="">
      <NovuProvider
        subscriberId={"65a54d91aeb88319dd3d857e"}
        applicationIdentifier={"eDGCaSBCSaoC"}
      >
        <PopoverNotificationCenter colorScheme={"light"}>
          {({ unseenCount }) => (
            <NotificationBell
              unseenCount={unseenCount}
              className="text-black"
            />
          )}
        </PopoverNotificationCenter>
      </NovuProvider>
    </div>
  );
};

export default Notification;
