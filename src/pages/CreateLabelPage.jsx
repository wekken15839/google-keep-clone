import React, { useState } from "react";
import { BiArrowBack, BiLabel, BiPlus, BiTrash } from "react-icons/bi";
import { useNotes } from "../context/NotesProvider";
import { MdDone, MdOutlineLabel } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CreateLabelPage = () => {
  const {
    labels,
    setLabels,
    setNotes,
    updatedLabelsInLocalStorage,
    updatedNotesInLocalStorage,
  } = useNotes();
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState();

  const handleChangeLabelName = (labelId, newValue) => {
    setLabels((prevLabels) => {
      const updatedLabels = prevLabels.map((label) => {
        if (label.id == labelId) {
          return { ...label, name: newValue };
        }
        return label;
      });

      updatedLabelsInLocalStorage(updatedLabels);

      return updatedLabels;
    });
  };

  const handleClick = () => {
    setLabels((prevLabels) => {
      const updatedLabels = [
        ...prevLabels,
        { id: crypto.randomUUID(), name: text },
      ];

      updatedLabelsInLocalStorage(updatedLabels);
      return updatedLabels;
    });
    setText("");
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleLabelDelete = (labelId) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) => {
        if (note.labelIds.includes(labelId)) {
          const filteredLabelIds = note.labelIds.filter(
            (label) => label != labelId
          );

          return {
            ...note,
            labelIds: filteredLabelIds,
          };
        }
        return note;
      });

      setLabels((prevLabels) => {
        return prevLabels.filter((label) => label.id != labelId);
      });

      updatedNotesInLocalStorage(updatedNotes);
      return updatedNotes;
    });
  };

  return (
    <div className=" flex flex-col gap-3">
      <div className="flex items-center gap-5 font-semibold py-5 px-5 ">
        <Link to="/notes">
          <BiArrowBack />
        </Link>
        <span>Editar etiquetas</span>
      </div>
      <ul className="flex flex-col gap-2">
        <div
          className={`flex items-center gap-5 text-lg px-5 py-2 ${
            isFocused ? "border" : ""
          }`}
        >
          <BiPlus className="cursor-pointer" />
          <input
            placeholder="Crear etiqueta nueva"
            className="outline-none border-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {text.length > 0 && (
            <MdDone className="ml-auto cursor-pointer" onClick={handleClick} />
          )}
        </div>
        {labels.map((label) => (
          <div
            className="flex items-center gap-5 text-lg px-5 py-2"
            key={label.id}
          >
            <MdOutlineLabel />
            <input
              value={label.name}
              onChange={(e) => handleChangeLabelName(label.id, e.target.value)}
              className="border-none outline-none"
            />
            <BiTrash
              onClick={() => handleLabelDelete(label.id)}
              className="ml-auto"
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CreateLabelPage;
