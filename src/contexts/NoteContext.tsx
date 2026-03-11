import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Note = {
  id: number;
  text: string;
  dateAdded: string;
  isDone: boolean;
};

type NoteContextType = {
  notes: Note[];
  addNote: (note: string) => void;
  removeNote: (noteId: number) => void;
  addToDoneNotes: (note: Note) => void;
};

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const useNoteContext = () => {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error("useNoteContext must be used inside NoteProvider");
  }

  return context;
};

type NoteProviderProps = {
  children: ReactNode;
};

export const NoteProvider = ({ children }: NoteProviderProps) => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    console.log("Notes changed");
  }, [notes]);

  function addNote(newNote: string) {
    const now = new Date();
    const formatted = now.toISOString().slice(0, 19).replace("T", " ");

    const newNoteWithId = {
      id: notes ? notes.length + 1 : 1,
      text: newNote,
      dateAdded: formatted,
      isDone: false,
    };
    const newNotes: Note[] = [...notes, newNoteWithId];
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  }

  const addToDoneNotes = (note: Note) => {
    const updatedNotes = notes.map((item: Note) => {
      return item.id === note.id ? { ...item, isDone: true } : item;
    });
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const removeNote = (noteId: number) => {
    setNotes((prevNotes: Note[]) => {
      const updatedNotes = prevNotes.filter((n) => n.id !== noteId);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  const value: NoteContextType = {
    notes,
    addNote,
    removeNote,
    addToDoneNotes,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
