import React from "react";
import LabelsNavBar from "../components/NavBar/LabelsNavBar";
import { useNotes } from "../context/NotesProvider";
import { NotesList } from "../components/Notes/Notes";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";

const LabelsPage = () => {
  const { getNotesByLabelId } = useNotes();

  const { labelId } = useParams();

  const notes = getNotesByLabelId(labelId);

  return (
    <div className="p-3">
      <LabelsNavBar />
      <SideBar />
      <NotesList notes={notes} />
    </div>
  );
};

export default LabelsPage;
