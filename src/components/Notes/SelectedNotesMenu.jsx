import React, { useEffect, useState } from "react";
import { BiPin, BiSolidPin } from "react-icons/bi";
import { motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { IoMdColorPalette } from "react-icons/io";
import { MdNotificationAdd, MdOutlineLabel } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { useNotes } from "../../context/NotesProvider";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

const SelectedNotesMenu = () => {
  const { selectedNotes, exitSelectionMode, toggleFixedNotes, notes } =
    useNotes();
  const { noteId } = useParams();

  const areAllSelectedNotesFixed = () => {
    const selectedNotesObjects = notes.filter((note) =>
      selectedNotes.includes(note.id)
    );

    return selectedNotesObjects.every((note) => note.isFixed);
  };

  return (
    <motion.div
      animate={selectedNotes.length > 0 ? { top: 0 } : { top: "-100%" }}
      transition={{ duration: 0.2 }}
      className={`
      }  fixed top-[-100%] left-0 p-4 w-full bg-blue-200`}
    >
      <div className="flex items-center text-2xl justify-between">
        <div className="flex gap-2 items-center justify-center">
          <IoCloseSharp
            className="cursor-pointer"
            onClick={exitSelectionMode}
          />
          <span className="mb-0.5">{selectedNotes.length}</span>
        </div>
        <div className="flex gap-5">
          {areAllSelectedNotesFixed() ? (
            <BiSolidPin onClick={() => toggleFixedNotes(noteId)} />
          ) : (
            <BiPin onClick={() => toggleFixedNotes(noteId)} />
          )}

          <Link to={"/notes/select-label"}>
            <MdOutlineLabel />
          </Link>
          <MenuDropDown />
        </div>
      </div>
    </motion.div>
  );
};

const MenuDropDown = () => {
  const [isActive, setIsActive] = useState(false);
  const { deleteSelectedNotes, selectedNotes, copySelectedNote } = useNotes();

  return (
    <div className="relative inline-block text-left text-base">
      <div>
        <SlOptionsVertical
          className="text-lg cursor-pointer"
          onClick={() => setIsActive(!isActive)}
        />
      </div>

      <div
        className={`${
          !isActive
            ? "opacity-0 -translate-y-5 invisible"
            : "opacity-100 translate-y-0 visible"
        } duration-200 transform transition-all absolute right-0 top-7 z-10 w-56 rounded-md bg-blue-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        <div className="py-1" role="none">
          <div
            className="block px-4 py-2 text-gray-700 cursor-pointer"
            onClick={() => {
              deleteSelectedNotes();
              setIsActive(false);
            }}
          >
            Borrar
          </div>
          {selectedNotes.length == 1 && (
            <div>
              <div
                className="block px-4 py-2 text-gray-700 cursor-pointer"
                onClick={() => {
                  copySelectedNote();
                  setIsActive(false);
                }}
              >
                Crear una copia
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedNotesMenu;
