import { createContext, useReducer, useContext, useEffect } from "react";
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
      console.log(notes);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewNote = async (title, description, tags) => {
    const note = { title, description, tags };
    try {
      const { data } = await callApi("POST", encodedToken, "/api/notes", {
        note,
      });
      console.log(data?.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async (title, description, tags, id) => {
    const note = { title, description, tags };
    try {
      const { data } = await callApi("POST", encodedToken, `/api/notes/${id}`, {
        note,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const {data} = await callApi("DELETE", encodedToken, `/api/notes/${id}`)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const value = { notesState, notesDispatch, showAlert };
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

const useNotes = () => useContext(NoteContext);

export { useNotes, NoteProvider };
