import { useState } from "react";
import NoteCard from "../components/NoteCard";
import "../css/noteList.css";
import { useNoteContext } from "../contexts/NoteContext";

function NoteList() {
  const { addNote } = useNoteContext();

  const [newNote, setNewNote] = useState("");

  function handleInputChange(event: any) {
    setNewNote(event.target.value);
  }

  const { notes } = useNoteContext();

  function initAddNote() {
    if (!newNote.trim()) return;
    addNote(newNote);
    setNewNote("");
  }

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      return;
    }
    alert(searchQuery);
  };

  return (
    <>
      <div className="note-list">
        <h1>Note Nest</h1>
        <p style={{ color: "white", marginBottom: 40 }}>
          ------------------------------ . ------------------------------
        </p>
        <div>
          <input
            type="text"
            placeholder="Enter a Note..."
            className="add-input"
            value={newNote}
            onChange={handleInputChange}
          />
          <button className="add-button" onClick={initAddNote}>
            Add
          </button>
        </div>

        <div>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for Notes..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <ol>
          {notes.map(
            (item: any) =>
              item.text &&
              !item.isDone &&
              item.text.toLowerCase().startsWith(searchQuery) && (
                <NoteCard note={item} key={item.id}></NoteCard>
              ),
          )}
        </ol>
      </div>
    </>
  );
}

export default NoteList;
