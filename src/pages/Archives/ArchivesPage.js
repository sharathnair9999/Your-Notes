import React from "react";
import { useNotes } from "../../imports/imports";
import { RichTextEditor } from "../../imports/imports";

const ArchivesPage = () => {
  const { noteState } = useNotes();
  const { archivedNotes } = noteState;
  return (
    <div>
      {archivedNotes?.map((note) => (
        <RichTextEditor key={note._id} note={note} editNote width existingNote />
      ))}
    </div>
  );
};

export default ArchivesPage;
