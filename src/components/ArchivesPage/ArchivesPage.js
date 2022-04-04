import React, { useState } from "react";
import { useNotes, EmptyData, extractContent } from "../../imports/imports";
import "./ArchivesPage.css";
import { RichTextEditor, MainSearchBar } from "../../imports/imports";

const ArchivesPage = () => {
  const { notesState } = useNotes();
  const { archivedNotes } = notesState;
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="flex-and-center flex-col">
      <MainSearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <div className="archives-container">
      {archivedNotes.length > 0 ? (
        archivedNotes
          ?.filter(
            (note) =>
              searchInput?.length>0 ? note.title.toLowerCase().includes(searchInput.toLowerCase()) ||
              extractContent(note.description).toLowerCase().includes(searchInput.toLowerCase()) : true
          ).length>0 ? archivedNotes.map((note) => (
            <RichTextEditor
              key={note._id}
              note={note}
              width
              canUpdateNote
              existingNote
              inArchives
            />
      )) : <EmptyData message={"No Match Found."} />) : (
        <EmptyData message={"No Notes have been added to Archives yet."} />
      )}
      </div>
    </div>
  );
};

export default ArchivesPage;
