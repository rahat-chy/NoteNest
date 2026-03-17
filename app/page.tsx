"use client";

import { useState } from "react";
import NoteCard from "@/app/components/NoteCard";
import { useNoteContext } from "@/app/contexts/NoteContext";
import styles from "./home.module.css";

function NoteList() {
  const { addNote, notes } = useNoteContext();

  const [newNote, setNewNote] = useState("");

  function handleInputChange(event: any) {
    setNewNote(event.target.value);
  }

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
      <div className={`${styles.noteList}`}>
        <h1>Note Nest</h1>
        <p style={{ color: "white", marginBottom: 40 }}>
          ------------------------------ . ------------------------------
        </p>
        <div>
          <input
            type="text"
            placeholder="Enter a Note..."
            className={`${styles.addInput}`}
            value={newNote}
            onChange={handleInputChange}
          />
          <button className={`${styles.addButton}`} onClick={initAddNote}>
            Add
          </button>
        </div>

        <div>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for Notes..."
              className={`${styles.searchInput}`}
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
              item.text.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                <NoteCard note={item} key={item.uuid}></NoteCard>
              ),
          )}
        </ol>
      </div>
    </>
  );
}

export default NoteList;
