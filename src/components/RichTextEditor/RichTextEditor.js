import React, { useState, useRef, useEffect } from "react";
import "./RichTextEditor.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BsPinAngle, BsPinAngleFill, BsArchiveFill } from "react-icons/bs";
import { AiTwotoneEdit, AiTwotoneDelete, AiTwotoneSave } from "react-icons/ai";
import { formats, modules, newNoteState } from "./utils";
import { useDetails, useNotes, extractContent } from "../../imports/imports";
import ReactTooltip from "react-tooltip";
import { dateAndTime } from "../../app-utils/app-utils";

const RichTextEditor = ({
  editNote,
  width,
  newNote,
  canUpdateNote,
  disableDelete,
  disableArchive,
  existingNote,
  note,
  setCreateNote,
  inArchives,
}) => {
  const {
    addNewNote,
    updateNote,
    deleteNote,
    addNoteToArchives,
    restoreNoteFromArchives,
  } = useNotes();
  const { showAlert } = useDetails();
  const currentNoteState = existingNote ? note : newNoteState;
  const [noteState, setNoteState] = useState(currentNoteState);
  const [edit, setEdit] = useState(editNote || false);
  const noteTextRef = useRef(null);
  const currentRef = useRef(null);

  useEffect(() => {
    noteState?.bgColor
      ? (noteTextRef.current.style.backgroundColor = noteState.bgColor)
      : (noteTextRef.current.style.backgroundColor = "#dedfe8");
    if (!noteState.description || !noteTextRef.current) return;

    const { currentDate, currentTime } = dateAndTime();
    setNoteState((state) => ({
      ...state,
      createdDate: currentDate,
      createdTime: currentTime,
    }));
  }, [noteState.bgColor, noteState.description, noteTextRef]);

  useEffect(() => {
    if (!currentRef.current) return;
    currentRef.current.innerHTML = noteState.description;
  }, [noteState.description, edit]);

  const addThisNote = async () => {
    if (!extractContent(noteState.description).length > 0 || !noteState.title) {
      showAlert("error", "Enter both Title and Description", 1500);
      return;
    }
    await addNewNote(
      noteState.title,
      noteState.description,
      noteState.tags,
      noteState.bgColor,
      noteState.isPinned,
      noteState.createdDate,
      noteState.createdTime
    );
    setEdit(false);
    newNote && setCreateNote((state) => !state);
  };

  const updateThisNote = async () => {
    if (!extractContent(noteState.description).length > 0 || !noteState.title) {
      showAlert("error", "Enter both Title and Description", 1500);
      return;
    }
    await updateNote(
      noteState.title,
      noteState.description,
      noteState.tags,
      noteState._id,
      noteState.isPinned,
      noteState.bgColor,
      noteState.createdDate,
      noteState.createdTime
    );
    setEdit(false);
  };

  const changeBg = () => {
    const colorArray = [
      "#dedfe8",
      "#fbf8cc",
      "#ffcfd2",
      "#b9fbc0",
      "#8eecf5",
      "#e6ccb2",
      "#d8b4fe",
      "#fda4af",
      "#f8fafc",
      "#fdba74",
    ];
    var randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    setNoteState((state) => ({ ...state, bgColor: randomColor }));
    noteTextRef.current.style.backgroundColor = randomColor;
  };

  return (
    <div
      ref={noteTextRef}
      className={`text-editor-container ${
        width ? "limit-width" : "full-width"
      }`}
    >
      <ReactTooltip
        place="bottom"
        afterShow={() => {
          setTimeout(ReactTooltip.hide, 2000);
        }}
      />
      <div className="input-container flex justify-space-btw items-center">
        {edit && (
          <input
            autoFocus={edit}
            type="text"
            className="note-title w-100"
            placeholder="Title"
            value={noteState.title}
            onChange={(e) => {
              setNoteState((state) => ({ ...state, title: e.target.value }));
            }}
          />
        )}
        {!edit && <p className="bold">{noteState.title}</p>}

        <button
          className="btn-transparent"
          data-tip="Pin"
          onClick={() => {
            if (!edit) {
              showAlert(
                "error",
                "Changes can be applied only in Edit Mode",
                2000
              );
              return;
            }
            setNoteState((state) => ({
              ...state,
              isPinned: !state.isPinned,
            }));
          }}
        >
          {noteState.isPinned ? (
            <BsPinAngleFill size={"1.1rem"} />
          ) : (
            <BsPinAngle size={"1.1rem"} />
          )}
        </button>
      </div>
      {edit ? (
        <ReactQuill
          id="text-editor"
          className="text-editor"
          value={noteState.description}
          onChange={(value) => {
            setNoteState((state) => ({ ...state, description: value }));
          }}
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="Start writing your note here..."
        />
      ) : (
        <div className="text-editor-contents" ref={currentRef}></div>
      )}

      <div className="action-btn-section flex justify-space-btw items-center ">
        <div className="left-btns flex-and-center gap-sm ">
          {edit && (
            <button onClick={() => changeBg()} data-tip="Change Background">
              <i className="fa-solid fa-palette"></i>
            </button>
          )}
        </div>
        {!edit && (
          <div className="middle-section flex justify-fs items-fs flex-col mr-auto">
            <p>{noteState.createdDate}</p>
            <p>{noteState.createdTime}</p>
          </div>
        )}

        <div className="right-btns flex-and-center gap-sm ">
          {edit ? (
            <button
              data-tip="Save"
              disabled={
                !extractContent(noteState.description) || !noteState.title
              }
              className={` ${
                (!extractContent(noteState.description) || !noteState.title) &&
                "cursor-no-drop"
              }  `}
              onClick={async () => {
                canUpdateNote ? await updateThisNote() : await addThisNote();
              }}
            >
              <AiTwotoneSave size={"1.1rem"} />
            </button>
          ) : (
            <button
              data-tip="Edit"
              onClick={() => {
                setEdit(true);
              }}
            >
              <AiTwotoneEdit size={"1.1rem"} />
            </button>
          )}
          {!disableArchive && !inArchives && (
            <button
              onClick={() => addNoteToArchives(currentNoteState._id)}
              data-tip="Add to Archives"
            >
              <BsArchiveFill size={"1.1rem"} />
            </button>
          )}
          {inArchives && (
            <button
              onClick={() => restoreNoteFromArchives(currentNoteState._id)}
              data-tip="Remove From Archives"
            >
              <BsArchiveFill size={"1.1rem"} />
            </button>
          )}
          {!disableDelete && (
            <button
              onClick={() => deleteNote(currentNoteState._id)}
              data-tip="Delete"
            >
              <AiTwotoneDelete size={"1.1rem"} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
