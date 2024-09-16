import React, { useState } from "react";
import { BiLabel, BiPlus, BiTrash } from "react-icons/bi";
import { IoMdColorPalette } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate, useParams } from "react-router-dom";
import { useNotes } from "../../context/NotesProvider";

const NoteMenu = () => {
  const [isPopupActive, setIsPopupActive] = useState(false);

  const togglePopup = () => {
    setIsPopupActive((prev) => !prev);
  };

  return (
    <>
      <div className="fixed bg-blue-50 bottom-0 left-0 w-full p-1.5">
        <div className="flex text-xl p-2 items-center">
          <div className="flex gap-3 items-center">
            <BiPlus />
            <IoMdColorPalette />
          </div>
          <small className="ml-auto">Última edición: 10 sep</small>
          <SlOptionsVertical className="ml-auto" onClick={togglePopup} />
        </div>
      </div>
      {isPopupActive && <MenuPopup togglePopup={togglePopup} />}
    </>
  );
};

const MenuPopup = ({ togglePopup }) => {
  const { noteId } = useParams();
  const { deleteNote, addNote, getNote } = useNotes();

  const navigate = useNavigate();

  return (
    <>
      <div
        className="absolute opacity-75 h-[100vh] top-0 left-0 w-full bg-black"
        onClick={togglePopup}
      ></div>
      <div className="fixed bottom-0 w-full left-0 flex flex-col gap-3 text-xl bg-white p-3">
        <Option
          icon={<BiTrash />}
          text={"Borrar"}
          action={() => {
            deleteNote(noteId);
            navigate("/notes");
          }}
        />
        <Option
          icon={<MdContentCopy />}
          text={"Crear una copia"}
          action={() => {
            const note = getNote(noteId);
            addNote("", note);
            navigate("/notes");
          }}
        />
        <Option
          icon={<BiLabel />}
          text={"Etiquetas"}
          action={() => {
            navigate(`/notes/${noteId}/select-label`);
          }}
        />
      </div>
    </>
  );
};

const Option = ({ icon, text, action }) => {
  return (
    <div className="flex gap-1.5 items-center cursor-pointer" onClick={action}>
      {icon}
      {text}
    </div>
  );
};

export default NoteMenu;
