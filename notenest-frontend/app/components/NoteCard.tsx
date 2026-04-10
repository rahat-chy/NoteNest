import NoteCardActions from "./NoteCardActions";
import styles from "./NoteCard.module.css";

export default function NoteCard({ note }: { note: any }) {
  return (
    <div className="container">
      <div className={`row ${styles.noteCard}`}>
        <div className={`${styles.noteText}`}>
          <h3>{note.text}</h3>
          <p>{note.dateAdded}</p>
        </div>
        <NoteCardActions note={note} />
      </div>
    </div>
  );
}
