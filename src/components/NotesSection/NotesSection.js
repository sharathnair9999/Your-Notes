import React, { useEffect, useState } from "react";
import {
  useNotes,
  EmptyData,
  RichTextEditor,
  extractContent,
} from "../../imports/imports";
import MainSearchBar from "../MainSearchBar/MainSearchBar";
import { BsPinAngleFill } from "react-icons/bs";
import "./NotesSection.css";
import { Modal } from "./Modal";

const NotesSection = () => {
  const { getNotes, notesState } = useNotes();
  const { allNotes } = notesState;
  const [modalShown, toggleModal] = React.useState(false);

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
    <div className="flex-and-center w-100 flex-col mx-1 mt-1 relative">
      <MainSearchBar
        setSearchInput={setSearchInput}
        searchInput={searchInput}
      />
      <div className="mt-1 notes flex-and-center flex-col gap-1">
        <button
          className="btn btn-primary"
          onClick={() => {
            toggleModal(!modalShown);
          }}
        >
          {"Create Note"}
        </button>
        <Modal
          shown={modalShown}
          close={() => {
            toggleModal(false);
          }}
        >
          <div className={`flex-col gap-1`}>
            <div className={`modal-container`}>
              <RichTextEditor
                newNote
                disableDelete
                disableArchive
                editNote
                width
                setCreateNote={toggleModal}
              />
            </div>
          </div>
        </Modal>
      </div>
      {allNotes?.length > 0 ? (
        searchNotes?.length > 0 ? (
          <div className="flex items-center justify-space-btw y-auto">
            {pinnedNotes?.length > 0 ? (
              <div className="flex flex-col items-center gap-sm mt-1 justify-fs ">
                <div className="flex flex-col gap-sm justify-fs items-fs ">
                  <p className="flex-and-center gap-sm ">
                    <BsPinAngleFill />{" "}
                    <span>{`Pinned Notes - ${pinnedNotes.length}`}</span>
                  </p>
                  <div className="notes-container">
                    {pinnedNotes.map((note) => (
                      <RichTextEditor
                        note={note}
                        canUpdateNote
                        existingNote
                        key={note._id}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1 justify-fs items-center ">
                  <p className="flex-and-center gap-sm">
                    <BsPinAngleFill />{" "}
                    <span>{`Other Notes - ${notPinnedNotes.length}`}</span>
                  </p>
                  <div className="notes-container">
                    {notPinnedNotes.map((note) => (
                      <RichTextEditor
                        note={note}
                        canUpdateNote
                        existingNote
                        key={note._id}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {allNotes.length > 0 ? (
                  <div className="flex flex-col gap-1 justify-fs items-fs w-100">
                    <p>{`Added Notes - ${allNotes.length}`}</p>
                    <div className="notes-container">
                      {notPinnedNotes.map((note) => (
                        <RichTextEditor
                          note={note}
                          canUpdateNote
                          existingNote
                          key={note._id}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <EmptyData message={"No Notes Added Yet"} />
                )}
              </div>
            )}
          </div>
        ) : (
          <EmptyData message={"No Match Found"} />
        )
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
