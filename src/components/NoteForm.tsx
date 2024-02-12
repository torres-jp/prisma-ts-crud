"use client";
import { useNotes } from "@/context/NoteContext";
import { useState, useRef, useEffect } from "react";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  const { createNote, selectedNote, setSelectedNote, updateNote } = useNotes();

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || "");
    }
  }, [selectedNote]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (selectedNote) {
          await updateNote(selectedNote.id, {
            title,
            content,
          });

          setSelectedNote(null);
        } else {
          await createNote({
            title,
            content,
          });
        }

        setTitle("");
        setContent("");

        titleRef.current?.focus();
      }}
    >
      <h1 className="text-white items-center text-2xl font-bold">
        Create Notes
      </h1>
      <label htmlFor="title" className="text-white items-center text-2xl">
        Title
      </label>
      <input
        type="text"
        name="title"
        value={title}
        autoFocus
        placeholder="Title"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setTitle(e.target.value)}
        ref={titleRef}
      />

      <label htmlFor="content" className="text-white items-center text-2xl">
        Content
      </label>
      <textarea
        name="content"
        value={content}
        placeholder="Write content"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <div className="flex justify-end gap-x-2">
        <button
          type="submit"
          disabled={!title || !content}
          className="px-5 py-2 text-white bg-blue-500 rounded-md focus:bg-blue-700
          disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {selectedNote ? "Update" : "Create"}
        </button>

        {selectedNote && (
          <button
            type="button"
            className="px-5 py-2 text-white bg-red-500 rounded-md focus:bg-red-700"
            onClick={() => {
              setSelectedNote(null);
              setTitle("");
              setContent("");
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
