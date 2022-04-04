import React from "react";
import { useNotes, EmptyData } from "../../imports/imports";
import "./ArchivesPage.css"
import { RichTextEditor } from "../../imports/imports";

const ArchivesPage = () => {
  const { notesState } = useNotes();
  const { archivedNotes } = notesState;
  return (
    <div className="archives-container">
      {archivedNotes.length>0 ? archivedNotes.map((note) => (
        <RichTextEditor key={note._id} note={note} width canUpdateNote existingNote inArchives />
      ))
    :
        <EmptyData message={"No Notes have been added to Archives yet."}/>
    }
    </div>
  );
};

export default ArchivesPage;
