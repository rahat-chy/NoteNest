import { useNoteContext } from "../contexts/NoteContext";
import NoteCard from "../components/NoteCard";
import "../css/doneNotes.css";

function DoneNotes() {
  const { notes } = useNoteContext();
  const doneNotes = notes.filter((item) => item.isDone);
  return (
    <>
      <div className="note-list">
        <h1>Done Notes</h1>
        <p style={{ color: "white", marginBottom: 40 }}>
          ------------------------------ . ------------------------------
        </p>
        {doneNotes.length === 0 ? (
          <div className="done-notes-empty">
            <h2>No Done Notes Yet!</h2>
            <p>Start marking notes as done and they will appear here.</p>
          </div>
        ) : (
          <ol>
            {doneNotes.map((item: any) => (
              <NoteCard note={item} key={item.id} />
            ))}
          </ol>
        )}
      </div>
    </>
  );
}

export default DoneNotes;
