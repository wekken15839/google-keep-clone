import { createContext, useContext, useEffect, useState } from "react";

const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within a NotesProvider");
  return context;
};

const initialNotes = [
  {
    id: "1",
    name: "Viajes",
    isFixed: false,
    tasks: [
      { id: "1", title: "Gamarra", completed: true, description: "" },
      { id: "2", title: "Aguachica", completed: false, description: "" },
      { id: "3", title: "Cucuta", completed: false, description: "" },
    ],
    labelIds: ["label1", "label2"],
  },
  {
    id: "2",
    name: "Cosas por aprender",
    tasks: [],
    labelIds: ["label3"],
    isFixed: true,
  },
];

export default function NotesProvider({ children }) {
  // ? <STATES>
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("savedNotes");
    if (!savedNotes) {
      localStorage.setItem("savedNotes", JSON.stringify(initialNotes));
    }

    return savedNotes ? JSON.parse(savedNotes) : initialNotes;
  });

  const [search, setSearch] = useState("");

  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const [selectedNotes, setSelectedNotes] = useState([]);

  const [labels, setLabels] = useState([
    { id: "label1", name: "Travel", notes: [] },
    { id: "label2", name: "Completed", notes: [] },
    { id: "label3", name: "Learning", notes: [] },
  ]);

  const getLabels = (noteId) => {
    const foundNote = notes.find((note) => note.id == noteId);

    if (!foundNote) return [];

    return foundNote.labelIds;
  };

  // ? </STATES>

  // * <NOTES>

  const copySelectedNote = () => {
    setNotes((prevNotes) => {
      const foundNote = prevNotes.find((note) =>
        selectedNotes.includes(note.id)
      );

      if (!foundNote) return prevNotes;

      const updatedNotes = [
        ...prevNotes,
        { ...foundNote, id: Date.now(), labelIds: [], isFixed: false },
      ];

      updatedNotesInLocalStorage(updatedNotes);
      exitSelectionMode();
      return updatedNotes;
    });
  };

  const toggleLabelForSelectedNotes = (labelId) => {
    setNotes((prevNotes) => {
      // Verificar si al menos una nota seleccionada ya tiene el labelId
      const anySelectedNoteHasLabel = selectedNotes.some((noteId) => {
        const note = prevNotes.find((note) => note.id === noteId);
        return note?.labelIds.includes(labelId);
      });

      const updatedNotes = prevNotes.map((note) => {
        if (selectedNotes.includes(note.id)) {
          if (anySelectedNoteHasLabel) {
            // Si alguna nota ya tiene el labelId, lo removemos de todas las seleccionadas
            return {
              ...note,
              labelIds: note.labelIds.filter((id) => id !== labelId),
            };
          } else {
            // Si ninguna nota tiene el labelId, lo agregamos a todas las seleccionadas
            return {
              ...note,
              labelIds: [...note.labelIds, labelId],
            };
          }
        }
        return note;
      });

      updatedNotesInLocalStorage(updatedNotes); // Si usas esta función para sincronizar con el localStorage
      return updatedNotes;
    });
  };

  const addNote = (name = "", note) => {
    if (note) {
      const updatedNote = {
        ...note,
        id: Date.now(),
        labelIds: [],
        isFixed: false,
      };
      setNotes((prevNotes) => {
        const updatedNotes = [...prevNotes, updatedNote];
        updatedNotesInLocalStorage(updatedNotes);
        return updatedNotes;
      });
      return updatedNote;
    }

    const newNote = {
      id: Date.now(),
      name,
      tasks: [
        { id: Date.now() + 1, title: "", completed: false, description: "" },
      ],
      labelIds: [],
    };
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      updatedNotesInLocalStorage(updatedNotes);
      return updatedNotes;
    });
    return newNote;
  };

  const deleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id != noteId));
  };

  const getNote = (noteId) => {
    const foundNote = notes.find((note) => note.id == noteId);
    if (!foundNote) return;
    return foundNote;
  };

  const getNotesByLabelId = (labelId) => {
    return notes.filter((note) => note.labelIds.includes(labelId));
  };

  const handleNoteNameChange = (noteId, newValue) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) => {
        if (note.id == noteId) {
          return { ...note, name: newValue };
        }
        return note;
      });

      updatedNotesInLocalStorage(updatedNotes);
      return updatedNotes;
    });
  };

  const deleteSelectedNotes = () => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => {
        if (selectedNotes.includes(note.id)) {
          return false;
        }
        return true;
      });

      exitSelectionMode();
      updatedNotesInLocalStorage(updatedNotes);
      return updatedNotes;
    });
  };

  const filterNotes = () => {
    return notes.filter((note) => {
      const toLowerSearch = search.toLowerCase();
      const toLowerNoteName = note.name.toLowerCase();

      if (toLowerNoteName.includes(toLowerSearch)) {
        return note;
      }

      return note.tasks.some((task) =>
        task.title.toLowerCase().includes(toLowerSearch)
      );
    });
  };

  const handleNoteSelect = (noteId) => {
    if (!isSelectionMode) return;

    const isSelected = selectedNotes.includes(noteId);

    setSelectedNotes((prevSelected) => {
      if (isSelected) {
        const updatedSelectedNotes = prevSelected.filter((id) => id !== noteId);
        setIsSelectionMode(updatedSelectedNotes.length > 0);
        return updatedSelectedNotes;
      } else {
        const updatedSelectedNotes = [...prevSelected, noteId];
        setIsSelectionMode(updatedSelectedNotes.length > 0);
        return updatedSelectedNotes;
      }
    });
  };

  // Si es una sola
  // Si son varias
  // Si son varias y alguna no están fijas
  // Si son varias y ninguna está fija
  // Si son varias y todas están fijas

  const toggleFixedNotes = (noteId) => {
    setNotes((prevNotes) => {
      const size = selectedNotes.length;

      if (size == 1) {
        const updatedNotes = prevNotes.map((note) =>
          selectedNotes.includes(note.id)
            ? { ...note, isFixed: !note.isFixed }
            : note
        );
        updatedNotesInLocalStorage(updatedNotes);
        return updatedNotes;
      } else if (size > 1) {
        const allFixed = selectedNotes.every(
          (noteId) => prevNotes.find((note) => note.id === noteId)?.isFixed
        );

        const updatedNotes = prevNotes.map((note) => {
          if (selectedNotes.includes(note.id)) {
            // Si todas están fijadas, desfiar todas
            // Si alguna no está fijada, fijar todas
            return { ...note, isFixed: !allFixed };
          }
          return note;
        });
        updatedNotesInLocalStorage(updatedNotes);
        return updatedNotes;
      }
    });
    exitSelectionMode();
  };
  // * </NOTES>

  // * <TASKS>
  const addTask = (noteId, title, description = "") => {
    setNotes((prevNotes) => {
      const noteExists = prevNotes.some((note) => note.id == noteId);
      if (!noteExists) {
        return prevNotes;
      }

      const newTask = {
        id: Date.now(),
        title: "",
        description: "",
        completed: false,
      };

      const updatedNotes = prevNotes.map((note) => {
        if (note.id == noteId) {
          return { ...note, tasks: [...note.tasks, newTask] };
        }

        return note;
      });

      updatedNotesInLocalStorage(updatedNotes);

      return updatedNotes;
    });
  };

  const getTasks = (noteId) => {
    const foundNote = notes.find((note) => note.id == noteId);

    if (!foundNote) return [];

    return foundNote.tasks;
  };

  const deleteTask = (noteId, taskId) => {
    setNotes((prevNotes) => {
      const noteExists = prevNotes.some((note) => note.id == noteId);
      if (!noteExists) {
        return prevNotes;
      }

      const updatedNotes = prevNotes.map((note) => {
        if (note.id == noteId) {
          const remainingTasks = note.tasks.filter(
            (task) => task.id !== taskId
          );
          return { ...note, tasks: remainingTasks };
        }

        return note;
      });

      updatedNotesInLocalStorage(updatedNotes);
      return updatedNotes;
    });
  };

  const handleTaskTitleChange = (noteId, taskId, newValue) => {
    setNotes((prevNotes) => {
      const noteExists = prevNotes.some((note) => note.id == noteId);
      if (!noteExists) {
        return prevNotes;
      }

      const updatedNotes = prevNotes.map((note) => {
        if (note.id == noteId) {
          const updatedTasks = note.tasks.map((task) => {
            if (task.id == taskId) {
              return { ...task, title: newValue };
            }
            return { ...task };
          });

          return { ...note, tasks: updatedTasks };
        }
        return { ...note };
      });

      updatedNotesInLocalStorage(updatedNotes);
      return updatedNotes;
    });
  };

  const toggleCompleteTask = (noteId, taskId) => {
    setNotes((prevNotes) => {
      const noteExists = notes.some((note) => note.id == noteId);
      if (!noteExists) {
        return prevNotes;
      }

      const updatedNotes = prevNotes.map((note) => {
        if (note.id == noteId) {
          const updatedTasks = note.tasks.map((task) => {
            if (task.id == taskId) {
              return { ...task, completed: !task.completed };
            }
            return { ...task };
          });
          return { ...note, tasks: updatedTasks };
        }
        return { ...note };
      });
      updatedNotesInLocalStorage(updatedNotes);

      return updatedNotes;
    });
  };

  // * </TASKS>

  // * <LABELS>

  const createLabel = (labelName) => {
    const newLabel = {
      id: Date.now().toString(), // Genera un ID único
      name: labelName,
    };

    setLabels((prevLabels) => [...prevLabels, newLabel]);
  };

  const toggleLabelForNote = (labelId, noteId) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) => {
        if (note.id == noteId) {
          const labelIds = note.labelIds || [];
          if (labelIds.includes(labelId)) {
            const filteredLabelIds = note.labelIds.filter(
              (label) => label != labelId
            );
            return { ...note, labelIds: filteredLabelIds };
          } else {
            return { ...note, labelIds: [...note.labelIds, labelId] };
          }
        } else {
          return { ...note };
        }
      });

      updatedNotesInLocalStorage(updatedNotes);
      return updatedNotes;
    });
  };

  // * </lABELS>

  // * <UTILS>
  const updatedNotesInLocalStorage = (notes) => {
    localStorage.setItem("savedNotes", JSON.stringify(notes));
  };

  const exitSelectionMode = () => {
    setSelectedNotes([]);
    setIsSelectionMode(false);
  };
  // * </UTILS>

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        handleNoteNameChange,
        addNote,
        getNote,
        search,
        setSearch,
        filterNotes,
        addTask,
        labels,
        getTasks,
        handleTaskTitleChange,
        deleteTask,
        toggleCompleteTask,
        getNotesByLabelId,
        selectedNotes,
        setSelectedNotes,
        isSelectionMode,
        toggleLabelForSelectedNotes,
        setIsSelectionMode,
        handleNoteSelect,
        exitSelectionMode,
        deleteSelectedNotes,
        deleteNote,
        getLabels,
        toggleLabelForNote,
        toggleFixedNotes,
        copySelectedNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
