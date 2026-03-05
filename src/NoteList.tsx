import { useState } from "react";

function NoteList() {
  const [notes, setNotes] = useState(["Eat", "Workout"]);
  const [newNote, setNewNote] = useState("");

  function handleInputChange(event: any) {
    setNewNote(event.target.value);
  }

  function addTask() {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  }

  function deleteTask(index: any) {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  }

  return (
    <>
      <div className="note-list">
        <h1>Note List</h1>
        <div>
          <input
            type="text"
            placeholder="Enter a Note..."
            value={newNote}
            onChange={handleInputChange}
          />
          <button className="add-button" onClick={addTask}>
            Add
          </button>
        </div>

        <ol>
          {notes.map((note, index) => (
            <li key={index}>
              <span className="text">{note}</span>
              <button
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default NoteList;
