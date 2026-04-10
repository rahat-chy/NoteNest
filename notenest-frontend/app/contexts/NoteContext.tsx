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
  date_added: string;
  is_done: boolean;
};

type NoteContextType = {
  notes: Note[];
  addNote: (note: string) => void;
  removeNote: (noteUuid: string) => void;
  addToDoneNotes: (note: Note) => void;
  updateNote: (note: Note) => void;
};

const NoteContext = createContext<NoteContextType | undefined>(undefined);
const BASE_URL = "http://127.0.0.1:8000/notes/";

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
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch notes from Django");
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error loading notes:", error);
      }
    };

    fetchNotes();
  }, []);

  async function addNote(newNote: string) {
    const now = new Date();
    const formatted = now.toISOString().slice(0, 19).replace("T", " ");

    const newNoteWithId = {
      uuid: crypto.randomUUID(),
      text: newNote,
      date_added: formatted,
      is_done: false,
    };
    const newNotes: Note[] = [...notes, newNoteWithId];
    setNotes(newNotes);
    await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNoteWithId),
    });
  }

  const addToDoneNotes = (note: Note) => {
    const updatedNote = { ...note, is_done: true };

    const updatedNotes = notes.map((item: Note) => {
      return item.uuid === note.uuid ? updatedNote : item;
    });
    setNotes(updatedNotes);
    updateQuery(updatedNote, note.uuid);
  };

  const removeNote = async (noteUuid: string) => {
    const updatedNotes = notes.filter((n) => n.uuid !== noteUuid);
    setNotes(updatedNotes);
    await fetch(`${BASE_URL}${noteUuid}/`, {
      method: "DELETE",
    });
    return updatedNotes;
  };

  const updateNote = (note: Note) => {
    const updatedNotes = notes.map((item: Note) => {
      return item.uuid === note.uuid ? note : item;
    });
    setNotes(updatedNotes);
    updateQuery(note, note.uuid);
  };

  async function updateQuery(updatedNote: Note, uuid: string) {
    await fetch(`${BASE_URL}${uuid}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote),
    });
  }

  const value: NoteContextType = {
    notes,
    addNote,
    removeNote,
    addToDoneNotes,
    updateNote,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
