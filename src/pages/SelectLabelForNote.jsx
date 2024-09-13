import React, { useEffect, useState } from "react";
import { BiCheck, BiLabel, BiLeftArrow } from "react-icons/bi";
import { useNotes } from "../context/NotesProvider";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdOutlineLabel,
} from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const SelectLabelForNote = () => {
  const { labels, toggleLabelForNote, getLabels } = useNotes();
  const { noteId } = useParams();

  const labelsInThisNote = getLabels(noteId);

  return (
    <div className="flex flex-col text-xl p-5">
      <Menu noteId={noteId} />
      <div className="my-5">
        {labels.map((label) => (
          <div
            className="flex gap-5 items-center justify-between"
            key={label.id}
          >
            <div className="flex gap-5 items-center">
              <MdOutlineLabel />
              <span className="">{label.name}</span>
            </div>
            {labelsInThisNote.includes(label.id) ? (
              <MdCheckBox
                onClick={() => {
                  toggleLabelForNote(label.id);
                }}
              />
            ) : (
              <MdCheckBoxOutlineBlank
                onClick={() => {
                  toggleLabelForNote(label.id, noteId);
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Menu = ({ noteId }) => {
  return (
    <div className="flex gap-5 space-between items-center">
      <Link to={`/notes/${noteId}`}>
        <IoArrowBack />
      </Link>
      <input
        placeholder="Ingresar el nombre de la etiqueta"
        className="w-full"
      />
    </div>
  );
};

export default SelectLabelForNote;
