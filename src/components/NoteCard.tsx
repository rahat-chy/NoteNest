import { useNoteContext } from "../contexts/NoteContext";
import "../css/noteCard.css";

function NoteCard({ note }: any) {
  const { addToDoneNotes, removeNote } = useNoteContext();

  function onDoneClick(e: any) {
    e.preventDefault();
    addToDoneNotes(note);
    alert("Marked as Done!");
  }

  function onDeleteClick(e: any) {
    e.preventDefault();
    removeNote(note.id);
  }

  return (
    <div className="container">
      <div className="note-card row">
        <div className="note-text col-md-9">
          <h3>{note.text}</h3>
          <p>{note.dateAdded}</p>
        </div>
        <div className="note-button col-md-3">
          {window.location.pathname !== "/doneNotes" && (
            <button className="done-button" onClick={onDoneClick}>
              Done
            </button>
          )}
          <button className="delete-button" onClick={onDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
