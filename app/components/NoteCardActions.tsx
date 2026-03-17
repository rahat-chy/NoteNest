"use client";
import { useNoteContext } from "@/app/contexts/NoteContext";
import { usePathname } from "next/navigation";
import styles from "./NoteCardActions.module.css";
import Link from "next/link";

export default function NoteCardActions({ note }: { note: any }) {
  const { addToDoneNotes, removeNote } = useNoteContext();
  const pathname = usePathname();

  return (
    <div className={`${styles.noteButton}`}>
      {pathname !== "/doneNotes" && (
        <>
          <button
            className={`${styles.doneButton}`}
            onClick={() => {
              addToDoneNotes(note);
              alert("Marked as Done!");
            }}
          >
            Done
          </button>
          <Link href={`/updateNote/${note.uuid}`}>
            <button className={styles.updateButton}>Update</button>
          </Link>
        </>
      )}
      <button
        className={`${styles.deleteButton}`}
        onClick={() => removeNote(note.uuid)}
      >
        Delete
      </button>
    </div>
  );
}
