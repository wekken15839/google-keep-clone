import React from "react";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../../context/NotesProvider";
import { useSideBar } from "../../context/SideBarProvider";

const AddNoteButtom = () => {
  const navigate = useNavigate();
  const { addNote } = useNotes();
  const { isSidebarVisible } = useSideBar();

  const handleClick = async () => {
    const newNote = addNote();
    if (newNote) {
      navigate(`/notes/${newNote.id}`, { replace: true });
    }
  };

  return (
    <div
      className={`${
        isSidebarVisible ? "hidden" : ""
      } rounded-xl  bg-gray-400 cursor-pointer h-12 w-12 flex items-center justify-center fixed right-6 bottom-7`}
      onClick={handleClick}
    >
      <BiPlus className="text-3xl " />
    </div>
  );
};

export default AddNoteButtom;
