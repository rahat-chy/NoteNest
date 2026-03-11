import NavBar from "./components/NavBar";
import { NoteProvider } from "./contexts/NoteContext";
import DoneNotes from "./pages/DoneNotes";
import NoteList from "./pages/NoteList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <NoteProvider>
      <NavBar></NavBar>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<NoteList />}></Route>
          <Route path="/doneNotes" element={<DoneNotes />}></Route>
        </Routes>
      </main>
    </NoteProvider>
  );
}

export default App;
