"use client";

import { useNoteContext } from "@/app/contexts/NoteContext";
import NoteCard from "@/app/components/NoteCard";
import styles from "./DoneNotes.module.css";
import { useMemo } from "react";

function DoneNotes() {
  const { notes } = useNoteContext();
  const doneNotes = useMemo(() => notes.filter((n) => n.isDone), [notes]);
  return (
    <>
      <div className={`${styles.noteList}`}>
        <h1>Done Notes</h1>
        <p className={`${styles.separator}`}>
          ------------------------------ . ------------------------------
        </p>
        {doneNotes.length === 0 ? (
          <div className={`${styles.doneNotesEmpty}`}>
            <h2>No Done Notes Yet!</h2>
            <p>Start marking notes as done and they will appear here.</p>
          </div>
        ) : (
          <ol>
            {doneNotes.map((item: any) => (
              <NoteCard key={item.uuid} note={item} />
            ))}
          </ol>
        )}
      </div>
    </>
  );
}

export default DoneNotes;
