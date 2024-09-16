import React, { useState } from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoSearchSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { SlOptionsVertical } from "react-icons/sl";
import { useSideBar } from "../../context/SideBarProvider";

const LabelsNavBar = () => {
  const { toggleSideBar } = useSideBar();

  return (
    <div className="flex rounded-full p-3 items-center justify-between mb-2">
      <RxHamburgerMenu onClick={toggleSideBar} className="cursor-pointer" />
    </div>
  );
};

export default LabelsNavBar;
