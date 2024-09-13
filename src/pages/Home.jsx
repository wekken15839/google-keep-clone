import ListsNavBar from "../components/NavBar/NotesNavBar";
import AddNoteButtom from "../components/Notes/AddNoteButtom";
import Notes from "../components/Notes/Notes";
import SelectedNotesMenu from "../components/Notes/SelectedNotesMenu";
import SideBar from "../components/SideBar/SideBar";
import { useNotes } from "../context/NotesProvider";
import { useEffect, useState } from "react";

export default function Home() {
  const [AddNotesPopUpVisible, setAddNotesPopUpVisible] = useState(false);
  const { isSelectionMode } = useNotes();

  const handleAddNotesPopup = () => {
    setAddNotesPopUpVisible((prevState) => !prevState);
  };

  useEffect(() => {}, []);

  return (
    <div className="">
      <ListsNavBar />
      <SideBar />
      <Notes />
      <AddNoteButtom onClick={handleAddNotesPopup} />
      {isSelectionMode && <SelectedNotesMenu />}
    </div>
  );
}
