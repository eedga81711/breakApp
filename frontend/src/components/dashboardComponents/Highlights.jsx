/* eslint-disable no-unused-vars */
import React from "react";

const Highlights = () => {
  return (
    <div className="highlight flex flex-col px-2">
      <div className="px-5 pt-2">
        <h3 className="text-yellow-300 text-[14px]">Highlights</h3>
      </div>

      <div className=" flex justify-center gap-4 items-center w-[100%]">
        <div className="item w-[20%] rounded-full">Debt Status</div>
        <div className="item w-[20%] rounded-full ">Balance Status</div>
        <div className="item w-[20%] rounded-full">Order Status</div>
        <div className="item w-[20%] rounded-full">Notification Status</div>
      </div>
    </div>
  );
};

export default Highlights;
