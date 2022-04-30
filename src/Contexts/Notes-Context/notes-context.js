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
      showAlert("error", "Error retrieving your notes", 2000);
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
    createdTime,
    bgLight
  ) => {
    const note = {
      title,
      description,
      tags,
      bgColor,
      isPinned,
      createdDate,
      createdTime,
      bgLight,
    };
    try {
      const { data } = await callApi("POST", encodedToken, "/api/notes", {
        note,
      });
      const { notes } = data;
      notesDispatch({ type: "ADD_NEW_NOTE", payload: notes });
      showAlert("success", "Successfully Added Note :)", 2000);
    } catch (error) {
      showAlert("error", "Error while adding your note currently :(", 2000);
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
    createdTime,
    bgLight
  ) => {
    const note = {
      title,
      description,
      tags,
      isPinned,
      bgColor,
      createdDate,
      createdTime,
      bgLight,
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
      showAlert("success", "Successfully Updated Note :)", 2000);
    } catch (error) {
      showAlert("error", "Error while updating your note currently :(", 2000);
    }
  };

  const deleteNote = async (_id) => {
    try {
      const { data } = await callApi(
        "POST",
        encodedToken,
        `/api/trash/delete/${_id}`
      );
      const { notes, trash } = data;

      notesDispatch({ type: "GET_ALL_NOTES", payload: notes });
      notesDispatch({ type: "TRASH", payload: trash });
      showAlert("success", "Successfully Deleted Note :)", 2000);
    } catch (error) {
      showAlert("error", "Couldn't delete this note at the moment", 2000);
    }
  };

  const restoreFromTrash = async (_id) => {
    try {
      const {
        data: { trash, notes },
      } = await callApi("POST", encodedToken, `/api/trash/restore/${_id}`);

      notesDispatch({ type: "GET_ALL_NOTES", payload: notes });
      notesDispatch({ type: "TRASH", payload: trash });
    } catch (error) {
      showAlert("error", "Couldn't Restore the note at this moment", 2000);
    }
  };

  const getArchivedNotes = async () => {
    try {
      const { data } = await callApi("GET", encodedToken, "/api/archives");
      const { archives } = data;
      notesDispatch({ type: "GET_ARCHIVED_NOTES", payload: archives });
      showAlert("success", "Successfully Moved Note to Archives :)", 2000);
    } catch (error) {
      showAlert("error", "Couldn't load archived notes", 2000);
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
      showAlert("success", "Added Note to archives :)", 2000);
    } catch (error) {
      showAlert("error", "Couldn't add the note to archives", 2000);
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
      showAlert("success", "Added the note back to main page :)", 2000);
    } catch (error) {
      showAlert(
        "error",
        "Couldn't restore the current note from archives",
        2000
      );
    }
  };

  const deleteFromArchives = async (_id) => {
    try {
      const {
        data: { archives },
      } = await callApi("DELETE", encodedToken, `/api/archives/delete/${_id}`);
      notesDispatch({ type: "DELETE_NOTE_FROM_ARCHIVES", payload: archives });
      showAlert("success", "Successfully Deleted Note from Archives :)", 2000);
    } catch (error) {
      showAlert("error", "Couldn't delete the note from archives", 2000);
    }
  };

  const getAllTrashNotes = async () => {
    try {
      const {
        data: { trash },
      } = await callApi("GET", encodedToken, "/api/trash");
      notesDispatch({ type: "TRASH", payload: trash });
    } catch (error) {
      showAlert("error", "Could not retrieve your trash data");
    }
  };

  const removeFromTrash = (_id) => {
    const newTrash = notesState.trashNotes.filter((note) => note._id !== _id);
    notesDispatch({ type: "DELETE_NOTE_FROM_TRASH", payload: newTrash });
    showAlert("success", "Deleted Note Permanently", 2000);
  };

  const deleteAllPermanently = async () => {
    try {
      const {
        data: { trash },
      } = await callApi("DELETE", encodedToken, "/api/trash/delete");
      notesDispatch({ type: "TRASH", payload: trash });
      showAlert("success", "Whooshh!! The Trash got lighter", 2000);
    } catch (error) {
      showAlert("error", "Couldn't empty the trash", 2000);
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
    removeFromTrash,
    deleteAllPermanently,
    getAllTrashNotes,
  };
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

const useNotes = () => useContext(NoteContext);

export { useNotes, NoteProvider };
