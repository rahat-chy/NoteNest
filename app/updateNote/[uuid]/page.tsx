"use client";

import { useParams, useRouter } from "next/navigation";
import { useNoteContext } from "@/app/contexts/NoteContext";
import { useState } from "react";
import styles from "./UpdateNote.module.css";

export default function UpdateNotePage() {
  const router = useRouter();
  const { updateNote } = useNoteContext();
  const { uuid } = useParams();
  const { notes } = useNoteContext();

  const note = notes.find((n) => n.uuid === uuid);

  const [inputNote, setinputNote] = useState(note?.text || "");

  if (!note) return <p>Note not found</p>;

  const handleUpdate = () => {
    updateNote(note);
    router.push("/");
  };

  return (
    <div className={`${styles.updateNoteContainer}`}>
      <h1>Update Note</h1>
      <p className={`${styles.separator}`}>
        ------------------------------ . ------------------------------
      </p>

      <input
        className={`${styles.updateInput}`}
        value={inputNote}
        onChange={(e) => setinputNote(e.target.value)}
      />

      <button className={styles.updateButton} onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
}
