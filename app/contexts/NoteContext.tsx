"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Note = {
  uuid: string;
  text: string;
  dateAdded: string;
  isDone: boolean;
};

type NoteContextType = {
  notes: Note[];
  addNote: (note: string) => void;
  removeNote: (noteUuid: string) => void;
  addToDoneNotes: (note: Note) => void;
  updateNote: (note: Note) => void;
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
  function setNotesAndStore(newNotes: Note[]) {
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  }

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  function addNote(newNote: string) {
    const now = new Date();
    const formatted = now.toISOString().slice(0, 19).replace("T", " ");

    const newNoteWithId = {
      uuid: crypto.randomUUID(),
      text: newNote,
      dateAdded: formatted,
      isDone: false,
    };
    const newNotes: Note[] = [...notes, newNoteWithId];
    setNotesAndStore(newNotes);
  }

  const addToDoneNotes = (note: Note) => {
    const updatedNotes = notes.map((item: Note) => {
      return item.uuid === note.uuid ? { ...item, isDone: true } : item;
    });
    setNotesAndStore(updatedNotes);
  };

  const removeNote = (noteUuid: string) => {
    setNotes((prevNotes: Note[]) => {
      const updatedNotes = prevNotes.filter((n) => n.uuid !== noteUuid);
      setNotesAndStore(updatedNotes);
      return updatedNotes;
    });
  };

  const updateNote = (note: Note) => {
    const updatedNotes = notes.map((item: Note) => {
      return item.uuid === note.uuid ? note : item;
    });
    setNotesAndStore(updatedNotes);
  };

  const value: NoteContextType = {
    notes,
    addNote,
    removeNote,
    addToDoneNotes,
    updateNote,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
