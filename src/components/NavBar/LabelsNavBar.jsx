import React, { useState } from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoSearchSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { SlOptionsVertical } from "react-icons/sl";
import { useSideBar } from "../../context/SideBarProvider";

const LabelsNavBar = () => {
  const [searchNote, setSearchNote] = useState("");
  const {toggleSideBar} = useSideBar();

  return (
    <div className="flex rounded-full p-3 items-center justify-between mb-2">
      <RxHamburgerMenu onClick={toggleSideBar}/>
      <input
        value={searchNote}
        onChange={(e) => setSearchNote(e.target.value)}
        placeholder="Search"
      />
      <IoSearchSharp />
      <HiOutlineSquares2X2 />
      <SlOptionsVertical />
    </div>
  );
};

export default LabelsNavBar;
