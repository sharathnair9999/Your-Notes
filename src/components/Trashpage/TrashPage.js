import React, { useState } from "react";
import "./Trashpage.css";
import {
  useNotes,
  extractContent,
  RichTextEditor,
  MainSearchBar,
  EmptyData,
} from "../../imports/imports";

const TrashPage = () => {
  const { notesState } = useNotes();
  const { trashNotes } = notesState;
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="flex-and-center flex-col">
      <MainSearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <div className="trash-container">
        {trashNotes.length > 0 ? (
          trashNotes.filter((note) =>
            searchInput?.length > 0
              ? note.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                extractContent(note.description.toLowerCase()).includes(
                  searchInput.toLowerCase()
                )
              : true
          ).length > 0 ? (
            trashNotes.map((note) => (
              <RichTextEditor
              key={note._id}
                note={note}
                existingNote
                width
                canAddToArchive
                canRestore
                disableArchive
                cannotEdit
              />
            ))
          ) : (
            <EmptyData message={"No Match Found"} />
          )
        ) : (
          <EmptyData message={"Empty Trash"} />
        )}
      </div>
    </div>
  );
};

export default TrashPage;
