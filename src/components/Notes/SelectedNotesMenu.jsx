import React, { useState } from "react";
import { BiPin, BiSolidPin } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";
import { IoMdColorPalette } from "react-icons/io";
import { MdNotificationAdd, MdOutlineLabel } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { useNotes } from "../../context/NotesProvider";
import { IoCloseSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";

const SelectedNotesMenu = () => {
  const { selectedNotes, exitSelectionMode, toggleFixedNotes, notes } =
    useNotes();
  const { noteId } = useParams();

  const areAllSelectedNotesFixed = () => {
    const selectedNotesObjects = notes.map((note) =>
      selectedNotes.includes(note.id)
    );

    const allFixed = selectedNotesObjects.every((note) => note.isFixed);

    return allFixed;
  };

  return (
    <div className="fixed top-0 left-0  p-4 w-full bg-blue-200">
      <div className="flex items-center text-2xl justify-between">
        <div className="flex gap-2 items-center justify-center">
          <IoCloseSharp
            className="cursor-pointer"
            onClick={exitSelectionMode}
          />
          <span className="mb-0.5">{selectedNotes.length}</span>
        </div>
        <div className="flex gap-5">
          {!areAllSelectedNotesFixed() ? (
            <BiPin onClick={() => toggleFixedNotes(noteId)} />
          ) : (
            <BiSolidPin onClick={() => toggleFixedNotes(noteId)} />
          )}

          <MdNotificationAdd />
          <IoMdColorPalette />
          <MdOutlineLabel />
          <MenuDropDown />
        </div>
      </div>
    </div>
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
          !isActive ? "hidden" : ""
        } absolute right-0 top-7 z-10 w-56  rounded-md bg-blue-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        <div className="py-1" role="none">
          <div href="#" className="block px-4 py-2  text-gray-700">
            Archivar
          </div>
          <div
            className="block px-4 py-2  text-gray-700"
            onClick={() => deleteSelectedNotes()}
          >
            Borrar
          </div>
          {selectedNotes.length == 1 && (
            <div>
              <div
                className="block px-4 py-2  text-gray-700"
                onClick={copySelectedNote}
              >
                Crear una copia
              </div>
              <div className="block w-full px-4 py-2 text-left  text-gray-700">
                Enviar
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedNotesMenu;
