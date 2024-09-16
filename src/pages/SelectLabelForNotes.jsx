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
import { CiSquareMinus } from "react-icons/ci";

const SelectLabelForNotes = () => {
  const {
    toggleLabelForSelectedNotes,
    selectedNotes,
    notes,
    labels,
    allSelectedNotesHaveLabel,
    noneSelectedNotesHaveLabel,
  } = useNotes();

  return (
    <div className="flex flex-col text-xl p-5">
      <Menu />
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
            <div className="cursor-pointer">
              {/* Lógica para renderizar los tres iconos */}
              {allSelectedNotesHaveLabel(label.id) ? (
                <MdCheckBox
                  onClick={() => toggleLabelForSelectedNotes(label.id)}
                />
              ) : noneSelectedNotesHaveLabel(label.id) ? (
                <MdCheckBoxOutlineBlank
                  onClick={() => toggleLabelForSelectedNotes(label.id)}
                />
              ) : (
                <CiSquareMinus
                  onClick={() => toggleLabelForSelectedNotes(label.id)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Menu = () => {
  const { exitSelectionMode } = useNotes();

  return (
    <div className="flex gap-5 space-between items-center">
      <Link to={`/notes`} onClick={exitSelectionMode}>
        <IoArrowBack />
      </Link>
      <input
        placeholder="Ingresar el nombre de la etiqueta"
        className="w-full"
      />
    </div>
  );
};

export default SelectLabelForNotes;
