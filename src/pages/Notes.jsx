import { useEffect } from "react";
import ListsNavBar from "../components/NavBar/NotesNavBar";
import SideBar from "../components/SideBar/SideBar";
import Tasks from "../components/Tasks/Tasks";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { useNotes } from "../context/NotesProvider";
import TopBar from "../components/Tasks/TopBar";
import TaskMenu from "../components/Tasks/TaskMenu";
import NoteMenu from "../components/Notes/NoteMenu";

export default function Notes() {
  const { getNote, notes } = useNotes();
  const { noteId } = useParams();
  // const navigate = useNavigate();

  // const note = getNote(noteId);

  // useEffect(() => {
  // const note = getNote(noteId);
  // if (!note) {
  //   navigate("/notes");
  // }
  // }, [notes]);

  // if (!note) return <Navigate to={"/"} />;

  return (
    <div className="p-3">
      <ListsNavBar />
      <SideBar />
      <TopBar />
      <Tasks />
      <TaskMenu />
      <NoteMenu />
    </div>
  );
}
