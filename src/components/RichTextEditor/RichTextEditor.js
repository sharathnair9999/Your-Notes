import React, { useState, useRef, useEffect } from "react";
import "./RichTextEditor.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BsPinAngle, BsPinAngleFill, BsArchiveFill } from "react-icons/bs";
import {
  AiTwotoneEdit,
  AiTwotoneDelete,
  AiTwotoneSave,
  AiFillDelete,
} from "react-icons/ai";
import { FaTrashRestore } from "react-icons/fa";
import { formats, modules, newNoteState } from "./utils";
import { useDetails, useNotes, extractContent } from "../../imports/imports";
import ReactTooltip from "react-tooltip";
import { colorArray, dateAndTime } from "../../app-utils/app-utils";
import { Multiselect } from "multiselect-react-dropdown";
import { availableTags } from "../../app-utils/app-utils";

const RichTextEditor = ({
  editNote,
  newNote,
  canUpdateNote,
  disableDelete,
  disableArchive,
  existingNote,
  note,
  setCreateNote,
  inArchives,
  canRestore,
  canAddToArchive,
  cannotEdit,
  inTrash,
}) => {
  const {
    addNewNote,
    updateNote,
    deleteNote,
    addNoteToArchives,
    restoreNoteFromArchives,
    deleteFromArchives,
    restoreFromTrash,
    removeFromTrash,
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
    var randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    setNoteState((state) => ({ ...state, bgColor: randomColor }));
    noteTextRef.current.style.backgroundColor = randomColor;
  };

  const addToTags = (selectedList, selectedItem) => {
    setNoteState((state) => {
      return { ...state, tags: [...selectedList] };
    });
  };

  const removeTag = (selectedList, selectedItem) => {
    setNoteState((state) => {
      return { ...state, tags: [...selectedList] };
    });
  };

  return (
    <div ref={noteTextRef} className={`text-editor-container flex flex-col`}>
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
        {!edit && <p className="note-title-read">{noteState.title}</p>}

        {!edit && (
          <button
            className="btn-transparent"
            data-tip="Pin"
            onClick={() => {
              updateNote(
                noteState.title,
                noteState.description,
                noteState.tags,
                noteState._id,
                noteState.isPinned ? false : true,
                noteState.bgColor,
                noteState.createdDate,
                noteState.createdTime
              );
            }}
          >
            {!cannotEdit ? (
              noteState.isPinned ? (
                <BsPinAngleFill size={"1.1rem"} />
              ) : (
                <BsPinAngle size={"1.1rem"} />
              )
            ) : (
              ""
            )}
          </button>
        )}
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
        <div className="text-editor-contents my-auto" ref={currentRef}></div>
      )}
      {!edit && (
        <div className="created-at flex justify-fs items-fs gap-sm  mr-auto">
          <p>Created at : {noteState.createdDate}</p>
          <p>{noteState.createdTime}</p>
        </div>
      )}

      <div className="action-btn-section flex justify-center items-center mt-auto">
        <div className="left-btns flex-and-center gap-sm ">
          {edit && (
            <button onClick={() => changeBg()} data-tip="Change Background">
              <i className="fa-solid fa-palette"></i>
            </button>
          )}
        </div>

        {edit && (
          <div className="label-section">
            <Multiselect
              options={availableTags}
              onSelect={addToTags}
              isObject={false}
              disable={!edit}
              placeholder="Add tags"
              hidePlaceholder={!edit}
              onRemove={removeTag}
              selectedValues={noteState.tags}
              emptyRecordMsg="No More Tags"
              style={{
                chips: {
                  background: "#22223b",
                  color: "#f8f9fa",
                  fontSize: "13px",
                  padding: "2px 5px",
                },
                searchBox: {
                  border: "none",
                  "border-bottom": "1px solid blue",
                  "border-radius": "0px",
                },
              }}
            />
          </div>
        )}
        {!edit && (
          <div className="flex-and-center chips-container-read">
            {noteState.tags.map((tag) => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="right-btns ml-auto flex-and-center gap-sm ">
          {!cannotEdit ? (
            edit ? (
              <button
                data-tip="Save"
                disabled={
                  !extractContent(noteState.description) || !noteState.title
                }
                className={` ${
                  (!extractContent(noteState.description) ||
                    !noteState.title) &&
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
            )
          ) : (
            ""
          )}
          {!disableArchive && !inArchives && (
            <button
              onClick={() =>
                addNoteToArchives(currentNoteState._id, canAddToArchive)
              }
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
          {!disableDelete && !canRestore && !inArchives && (
            <button
              onClick={() =>
                deleteNote(
                  noteState.title,
                  noteState.description,
                  noteState.tags,
                  noteState._id,
                  noteState.isPinned,
                  noteState.bgColor,
                  noteState.createdDate,
                  noteState.createdTime
                )
              }
              data-tip="Delete"
            >
              <AiTwotoneDelete size={"1.1rem"} />
            </button>
          )}
          {inArchives && (
            <button
              onClick={() => deleteFromArchives(currentNoteState._id)}
              data-tip="Delete From Archives"
            >
              <AiTwotoneDelete size={"1.1rem"} />
            </button>
          )}
          {inTrash && (
            <button
              onClick={() => removeFromTrash(currentNoteState._id)}
              data-tip="Delete Permanently"
            >
              <AiFillDelete size={"1.5rem"} />
            </button>
          )}
          {canRestore && (
            <button
              onClick={() => {
                restoreFromTrash(
                  noteState.title,
                  noteState.description,
                  noteState.tags,
                  noteState._id,
                  noteState.isPinned,
                  noteState.bgColor,
                  noteState.createdDate,
                  noteState.createdTime
                );
              }}
              data-tip="Restore Note"
            >
              <FaTrashRestore size={"1.1rem"} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
