import React from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlinePushPin } from "react-icons/md";

const TaskMenu = () => {
  return (
    <div className="flex fixed top-0 left-0 w-full h-[80px] shadow hidden">
      <IoClose />
      <span>1</span>
      <MdOutlinePushPin />
    </div>
  );
};

export default TaskMenu;
