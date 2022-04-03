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

  const addNewNote = async (title, description, tags, bgColor, isPinned) => {
    const note = { title, description, tags, bgColor, isPinned };
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

  const updateNote = async (title, description, tags, id, isPinned, bgColor) => {
    const note = { title, description, tags, isPinned, bgColor };
    try {
      const { data } = await callApi("POST", encodedToken, `/api/notes/${id}`, {
        note,
      });
      const { notes } = data;
      notesDispatch({ type: "UPDATE_NOTE", payload: notes });
      showAlert("success", "Successfully Updated Note :)", 1500);
    } catch (error) {
      showAlert("error", "Error while updating your note currently :(", 1500);
    }
  };

  const deleteNote = async (id) => {
    try {
      const { data } = await callApi(
        "DELETE",
        encodedToken,
        `/api/notes/${id}`
      );
      const { notes } = data;
      notesDispatch({ type: "DELETE_NOTE", payload: notes });
      showAlert("success", "Successfully Deleted Note :)", 1500);
    } catch (error) {
      showAlert("error", "Couldn't delete this note at the moment", 1500);
    }
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

  const addNoteToArchives = async (id, note) => {
    try {
      const { data } = await callApi(
        "POST",
        encodedToken,
        `/api/notes/archives/${id}`,
        {
          note,
        }
      );
      const { archives, notes } = data;
      notesDispatch({
        type: "ADD_NOTE_TO_ARCHIVES",
        payload: { archives, notes },
      });
      showAlert("success", "Added Note to archives :)", 1500);
    } catch (error) {
      showAlert("error", "Couldn't add the note to archives", 1500);
    }
  };

  const restoreNoteFromArchives = async (id) => {
    try {
      const { data } = await callApi(
        "POST",
        encodedToken,
        `/api/archives/restore/${id}`
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

  const deleteFromArchives = async (id) => {
    try {
      const { data } = await callApi(
        "DELETE",
        encodedToken,
        `/api/archives/delete/${id}`
      );
      const { archives } = data;
      notesDispatch({ type: "DELETE_NOTE_FROM_ARCHIVES", payload: archives });
      showAlert("success", "Successfully Moved Note to Archives :)", 1500);
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
  };
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

const useNotes = () => useContext(NoteContext);

export { useNotes, NoteProvider };
