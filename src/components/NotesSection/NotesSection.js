import React, { useEffect, useState } from "react";
import {
  useNotes,
  EmptyData,
  RichTextEditor,
  extractContent,
} from "../../imports/imports";
import MainSearchBar from "../MainSearchBar/MainSearchBar";
import "./NotesSection.css";

const NotesSection = () => {
  const { getNotes, notesState } = useNotes();
  const [createNote, setCreateNote] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    getNotes();
  }, [getNotes, notesState]);

  return (
    <div className="flex-and-center w-100 flex-col">
      <MainSearchBar
        setSearchInput={setSearchInput}
        searchInput={searchInput}
      />
      <div className="mt-1 flex-and-center flex-col gap-1">
        <button
          className="btn btn-primary"
          onClick={() => setCreateNote(!createNote)}
        >
          {createNote ? "Cancel" : "Create Note"}
        </button>
        {createNote && (
          <RichTextEditor
            newNote
            disableDelete
            disableArchive
            editNote
            setCreateNote={setCreateNote}
          />
        )}
      </div>
      {notesState?.allNotes.length > 0 ? (
        <div className="notes-container">
          {notesState.allNotes?.filter((note) =>
            searchInput?.length > 0
              ? extractContent(note?.description).includes(
                  searchInput?.toLowerCase()
                ) ||
                note?.title.toLowerCase().includes(searchInput?.toLowerCase())
              : true
          ).length > 0 ? (
            notesState.allNotes.map((note) => {
              return (
                <RichTextEditor
                  key={note._id}
                  note={note}
                  existingNote
                  canUpdateNote
                  width
                />
              );
            })
          ) : (
            <EmptyData message={"Match not found."} />
          )}
        </div>
      ) : (
        <EmptyData
          message={
            "No Notes have been added by you yet. Add your note instantly by clicking above"
          }
        />
      )}
    </div>
  );
};

export default NotesSection;
