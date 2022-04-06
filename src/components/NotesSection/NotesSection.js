import React, { useEffect, useState } from "react";
import {
  useNotes,
  EmptyData,
  RichTextEditor,
  extractContent,
} from "../../imports/imports";
import MainSearchBar from "../MainSearchBar/MainSearchBar";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import "./NotesSection.css";

const NotesSection = () => {
  const { getNotes, notesState } = useNotes();
  const { allNotes } = notesState;
  const [createNote, setCreateNote] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    getNotes();
  }, []);
  const searchNotes = allNotes.filter((note) =>
    searchInput?.length > 0
      ? note.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        extractContent(note.description)
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      : true
  );
  const pinnedNotes = searchNotes.filter((note) => note.isPinned);

  const notPinnedNotes = searchNotes.filter((note) => !note.isPinned);

  return (
    <div className="flex-and-center w-100 flex-col mx-1 mt-1">
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
      {allNotes?.length > 0 ?
      searchNotes?.length> 0 ? (
        <div className="flex-and-center flex-col w-100 mt-1">
          <p className="flex-and-center gap-sm">
            <BsPinAngleFill size={"1.3rem"} /> <span>All Pinned Notes</span>
          </p>
          <div className="notes-container">
            {pinnedNotes.length > 0 ? (
              pinnedNotes.map((note) => {
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
              <EmptyData message={"No Pinned Notes Yet"} />
            )}
          </div>
          <p className="flex-and-center gap-sm">
            <BsPinAngle size={"1.3rem"} /> <span>Regular Notes</span>
          </p>
          <div className="notes-container">
            {notPinnedNotes.length > 0 ? (
              notPinnedNotes.map((note) => {
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
              <EmptyData message={"No Pinned Notes Yet"} />
            )}
          </div>
        </div>
      ):<EmptyData
      message={
        "No Match Found"
      }
    /> : (
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
