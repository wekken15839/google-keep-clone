import { Link } from "react-router-dom";
import { useNotes } from "../../context/NotesProvider";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";
import { useState } from "react";

const Notes = () => {
  const { filterNotes } = useNotes();
  const filteredNotes = filterNotes();

  return (
    <>
      {filteredNotes.length > 0 ? (
        <NotesList notes={filteredNotes} />
      ) : (
        <p>No hay notas disponibles</p>
      )}
    </>
  );
};

export const NotesList = ({ notes, isSectioned }) => {
  const { handleNoteSelect, isSelectionMode } = useNotes();
  const fixedNotes = notes.filter((note) => note?.isFixed);
  const otherNotes = notes.filter((note) => !note.isFixed);

  return (
    <ul className="flex flex-col gap-2 text-sm m-3 ">
      {fixedNotes.length > 0 && (
        <NotesSection
          title={"Fijadas"}
          notes={fixedNotes}
          isSelectionMode={isSelectionMode}
          isSectioned={isSectioned}
        />
      )}
      {otherNotes.length > 0 && (
        <NotesSection
          title={"Otras"}
          notes={otherNotes}
          isSelectionMode={isSelectionMode}
          isSectioned={isSectioned}
        />
      )}
    </ul>
  );
};

const NotesSection = ({ title, notes, isSelectionMode, isSectioned }) => {
  return (
    <>
      {isSectioned && <span>{title}</span>}
      {notes.map((note) =>
        isSelectionMode ? (
          <Note note={note} key={note.id} />
        ) : (
          <Link
            key={note.id}
            className="max-h-[250px] overflow-hidden"
            to={`/notes/${note.id}`}
            replace={true}
          >
            <Note note={note} />
          </Link>
        )
      )}
    </>
  );
};

const Note = ({ note }) => {
  const {
    selectedNotes,
    handleNoteSelect,
    setIsSelectionMode,
    setSelectedNotes,
  } = useNotes();
  const [timer, setTimer] = useState(null);

  const handleMouseDown = () => {
    const holdTimer = setTimeout(() => {
      setIsSelectionMode(true);
      setSelectedNotes((prevSelected) => [...prevSelected, note.id]);
    }, 500);
    setTimer(holdTimer);
  };

  // const handleClick = ()=>{
  //   if(isSelectionMode)
  // }

  const handleMouseUp = () => {
    clearTimeout(timer);
    setTimer(null);
  };

  return (
    <li
      className={`border p-4 rounded-lg shadow ${
        selectedNotes.includes(note.id) ? "border-blue-700" : ""
      } max-h-[250px] overflow-hidden`}
      onClick={() => handleNoteSelect(note.id)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <h2 className="text-xl font-bold mb-2">{note.name}</h2>
      <TasksInNote tasks={note.tasks} />
    </li>
  );
};

const TasksInNote = ({ tasks }) => {
  return tasks.length > 0 ? (
    <ul className="flex flex-col gap-1">
      {tasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </ul>
  ) : (
    <EmptyNote />
  );
};

const Task = ({ task }) => {
  return (
    <li
      className={`flex items-center text-center gap-1 ${
        task.completed ? "line-through text-gray-500" : ""
      }`}
    >
      {task.completed ? <RiCheckboxFill /> : <RiCheckboxBlankLine />}{" "}
      {task.title}
    </li>
  );
};

const EmptyNote = () => {
  return <p className="text-gray-500">No hay tareas en esta nota.</p>;
};

export default Notes;
