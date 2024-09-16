import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 py-1 cursor-pointer">
      <IoArrowBack className="text-2xl" onClick={() => navigate("/notes")} />
    </div>
  );
};

export default TopBar;
