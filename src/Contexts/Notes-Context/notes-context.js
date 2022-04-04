import { createContext, useReducer, useContext } from "react";
import { callApi } from "../../imports/imports";
import { useDetails } from "../User-Context/user-context";
import { initialNoteState, notesReducer } from "./notes-utils";

const NoteContext = createContext(initialNoteState);

const NoteProvider = ({ children }) => {
  const [notesState, notesDispatch] = useReducer(
    notesReducer,
    initialNoteState
  );
  const { userState, showAlert } = useDetails();
  const { encodedToken } = userState;

  const getNotes = async () => {
    try {
      const { data } = await callApi("GET", encodedToken, "/api/notes");
      const { notes } = data;
      notesDispatch({ type: "GET_ALL_NOTES", payload: notes });
    } catch (error) {
      showAlert("error", "Error retrieving your notes", 1500);
      return;
    }
  };

  const addNewNote = async (
    title,
    description,
    tags,
    bgColor,
    isPinned,
    createdDate,
    createdTime
  ) => {
    const note = {
      title,
      description,
      tags,
      bgColor,
      isPinned,
      createdDate,
      createdTime,
    };
    try {
      const { data } = await callApi("POST", encodedToken, "/api/notes", {
        note,
      });
      const { notes } = data;
      notesDispatch({ type: "ADD_NEW_NOTE", payload: notes });
      showAlert("success", "Successfully Added Note :)", 1500);
    } catch (error) {
      showAlert("error", "Error while adding your note currently :(", 1500);
    }
  };

  const updateNote = async (
    title,
    description,
    tags,
    _id,
    isPinned,
    bgColor,
    createdDate,
    createdTime
  ) => {
    const note = {
      title,
      description,
      tags,
      isPinned,
      bgColor,
      createdDate,
      createdTime,
    };
    try {
      const { data } = await callApi(
        "POST",
        encodedToken,
        `/api/notes/${_id}`,
        {
          note,
        }
      );
      const { notes } = data;
      notesDispatch({ type: "UPDATE_NOTE", payload: notes });
      showAlert("success", "Successfully Updated Note :)", 1500);
    } catch (error) {
      showAlert("error", "Error while updating your note currently :(", 1500);
    }
  };

  const deleteNote = async (
    title,
    description,
    tags,
    _id,
    isPinned,
    bgColor,
    createdDate,
    createdTime
  ) => {
    try {
      const { data } = await callApi(
        "DELETE",
        encodedToken,
        `/api/notes/${_id}`
      );
      const { notes } = data;
      const note = {
        title,
        description,
        tags,
        _id,
        isPinned,
        bgColor,
        createdDate,
        createdTime,
      };
      notesDispatch({ type: "DELETE_NOTE", payload: notes });
      notesDispatch({ type: "ADD_TO_TRASH", payload: note });
      showAlert("success", "Successfully Deleted Note :)", 1500);
    } catch (error) {
      showAlert("error", "Couldn't delete this note at the moment", 1500);
    }
  };

  const restoreFromTrash = (
    title,
    description,
    tags,
    _id,
    isPinned,
    bgColor,
    createdDate,
    createdTime
  ) => {
    const newTrash = notesState.trashNotes.filter((note) => note._id !== _id);
    notesDispatch({ type: "RESTORE_FROM_TRASH", payload: newTrash });
    addNewNote(
      title,
      description,
      tags,
      isPinned,
      bgColor,
      createdDate,
      createdTime
    );
  };

  const getArchivedNotes = async () => {
    try {
      const { data } = await callApi("GET", encodedToken, "/api/archives");
      const { archives } = data;
      notesDispatch({ type: "GET_ARCHIVED_NOTES", payload: archives });
      showAlert("success", "Successfully Moved Note to Archives :)", 1500);
    } catch (error) {
      showAlert("error", "Couldn't load archived notes", 1500);
    }
  };

  const addNoteToArchives = async (_id) => {
    try {
      const { data } = await callApi(
        "POST",
        encodedToken,
        `/api/notes/archives/${_id}`
      );
      const { archives, notes } = data;
      console.log(archives, notes);
      notesDispatch({
        type: "ADD_NOTE_TO_ARCHIVES",
        payload: { archives, notes },
      });
      showAlert("success", "Added Note to archives :)", 1500);
    } catch (error) {
      showAlert("error", "Couldn't add the note to archives", 1500);
    }
  };

  const restoreNoteFromArchives = async (_id) => {
    try {
      const { data } = await callApi(
        "POST",
        encodedToken,
        `/api/archives/restore/${_id}`
      );
      const { archives, notes } = data;
      notesDispatch({
        type: "RESTORE_FROM_ARCHIVES",
        payload: { archives, notes },
      });
      showAlert("success", "Added the note back to main page :)", 1500);
    } catch (error) {
      showAlert(
        "error",
        "Couldn't restore the current note from archives",
        1500
      );
    }
  };

  const deleteFromArchives = async (_id) => {
    try {
      const { data } = await callApi(
        "DELETE",
        encodedToken,
        `/api/archives/delete/${_id}`
      );
      const { archives } = data;
      notesDispatch({ type: "DELETE_NOTE_FROM_ARCHIVES", payload: archives });
      showAlert("success", "Successfully Deleted Note from Archives :)", 1500);
    } catch (error) {
      showAlert("error", "Couldn't delete the note from archives", 1500);
    }
  };

  const value = {
    notesState,
    notesDispatch,
    showAlert,
    addNewNote,
    deleteFromArchives,
    deleteNote,
    updateNote,
    restoreNoteFromArchives,
    addNoteToArchives,
    getArchivedNotes,
    getNotes,
    restoreFromTrash,
  };
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

const useNotes = () => useContext(NoteContext);

export { useNotes, NoteProvider };
