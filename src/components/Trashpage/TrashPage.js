import React, { useState, useEffect } from "react";
import "./Trashpage.css";
import {
  useNotes,
  extractContent,
  RichTextEditor,
  MainSearchBar,
  EmptyData,
} from "../../imports/imports";
import { BsFillTrashFill } from "react-icons/bs";

const TrashPage = () => {
  const { notesState, deleteAllPermanently, getAllTrashNotes } = useNotes();
  const { trashNotes } = notesState;
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    trashNotes.length === 0 && getAllTrashNotes();
  }, [trashNotes]);

  return (
    <div className="flex-and-center flex-col">
      <MainSearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <div className="my-1 flex-and-center w-100">
        <button
          className="btn btn-primary flex-and-center ml-auto gap-sm"
          onClick={() => deleteAllPermanently()}
        >
          <BsFillTrashFill />
          <span>Clear Trash</span>
        </button>
      </div>
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
                inTrash
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
