import { useEffect, useState } from "react";
import { useNotes } from "../../context/NotesProvider";
import { useParams } from "react-router-dom";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";
import { TiPlus } from "react-icons/ti";
import { MdOutlineDragIndicator } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Tasks = () => {
  const {
    getTasks,
    getNote,
    notes,
    handleNoteNameChange,
    handleTaskTitleChange,
    deleteTask,
    addTask,
    toggleCompleteTask,
  } = useNotes();
  const { noteId } = useParams();

  const tasks = getTasks(noteId);
  const note = getNote(noteId);

  // useEffect(() => {}, [notes]);

  return (
    <div className="text-lg">
      <input
        className="text-2xl mb-3.5 mt-2 text-gray-400 focus:border-none focus:outline-none"
        value={note.name}
        placeholder="Título"
        autoFocus
        onChange={(e) => handleNoteNameChange(noteId, e.target.value)}
      />
      <TasksList tasks={tasks} />
      <div
        className="flex items-center gap-2 pl-6 cursor-pointer"
        onClick={() => addTask(noteId)}
      >
        <TiPlus />
        <span>Elemento de la lista</span>
      </div>
    </div>
  );
};

const TasksList = ({ tasks }) => {
  const { noteId } = useParams();
  const { setNotes } = useNotes();

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Si el elemento se arrastra y se suelta en el mismo lugar, no hacemos nada.
    if (!over || active.id === over.id) return;

    // Actualizamos las notas
    setNotes((prevNotes) => {
      // Encuentra la nota que contiene la tarea que se está moviendo
      const updatedNotes = prevNotes.map((note) => {
        if (note.id == noteId) {
          const activeTaskIndex = note.tasks.findIndex(
            (task) => task.id === active.id
          );
          const overTaskIndex = note.tasks.findIndex(
            (task) => task.id === over.id
          );

          // Si la tarea que se está moviendo pertenece a esta nota, movemos su posición
          if (activeTaskIndex !== -1 && overTaskIndex !== -1) {
            // Movemos la tarea usando arrayMove
            const updatedTasks = arrayMove(
              note.tasks,
              activeTaskIndex,
              overTaskIndex
            );

            // Retornamos la nota con las tareas actualizadas
            return { ...note, tasks: updatedTasks };
          }

          // Si no encontramos las tareas, devolvemos la nota original
        }
        return note;
      });

      localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor) // Agrega soporte para touch
  );

  // const getTaskPosition = (id) => tasks.findIndex((task) => task.id == id);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      {tasks.length > 0 && (
        <ul className="flex flex-col gap-1">
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <Task
                completed={task.completed}
                description={task.description}
                id={task.id}
                noteId={noteId}
                title={task.title}
                key={task.id}
              />
            ))}
          </SortableContext>
        </ul>
      )}
    </DndContext>
  );
};

const Task = ({ id, title, completed, description, noteId }) => {
  const { deleteTask, handleTaskTitleChange, toggleCompleteTask } = useNotes();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [preventBlur, setPreventBlur] = useState(false);

  //
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleFocus = () => setIsInputFocused(true);
  const handleBlur = () => {
    if (!preventBlur) {
      setIsInputFocused(false);
    }
  };

  const handleMouseDownOnIcon = () => {
    // Prevenir el blur al hacer clic en el ícono
    setPreventBlur(true);
  };

  const handleMouseUpOnIcon = () => {
    // Permitir el blur después de que se haya hecho clic en el ícono
    setPreventBlur(false);
  };

  return (
    <li
      className="flex gap-2 w-[95%] items-center"
      style={style}
      ref={setNodeRef}
    >
      <MdOutlineDragIndicator
        {...attributes}
        {...listeners}
        className="cursor-move"
      />
      {completed ? (
        <RiCheckboxFill
          className="cursor-pointer"
          onClick={() => toggleCompleteTask(noteId, id)}
        />
      ) : (
        <RiCheckboxBlankLine
          className="cursor-pointer"
          onClick={() => toggleCompleteTask(noteId, id)}
        />
      )}
      <input
        value={title}
        onChange={(e) => handleTaskTitleChange(noteId, id, e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={(e) => e.stopPropagation()}
      />
      {isInputFocused && (
        <div
          className="ml-auto cursor-pointer"
          onMouseDown={handleMouseDownOnIcon}
          onMouseUp={handleMouseUpOnIcon}
          onClick={() => deleteTask(noteId, id)}
        >
          <IoClose />
        </div>
      )}
    </li>
  );
};

export default Tasks;
