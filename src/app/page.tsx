"use client";
import NoteCard from "@/components/NoteCard";
import NoteForm from "@/components/NoteForm";
import { useNotes } from "@/context/NoteContext";
import { useEffect } from "react";

function HomePage() {
  const { notes, loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <NoteForm />

        {notes.map((note) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
//01:12
