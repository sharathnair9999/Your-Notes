export const initialNoteState = {
  allNotes: [],
  archivedNotes: [],
  totalNotes: [],
};

export const notesReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_NOTES":
      return {
        ...state,
        allNotes: payload,
      };
    case "ADD_NEW_NOTE":
      return {
        ...state,
        allNotes: payload,
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        allNotes: payload,
      };
    case "DELETE_NOTE":
      return { ...state, allNotes: payload };
    case "GET_ARCHIVED_NOTES":
      return {
        ...state,
        archivedNotes: payload,
      };
    case "ADD_NOTE_TO_ARCHIVES":
      return {
        ...state,
        archivedNotes: payload.archives,
        allNotes: payload.notes,
      };
    case "RESTORE_FROM_ARCHIVES":
      return {
        ...state,
        archivedNotes: payload.archives,
        allNotes: payload.notes,
      };
    case "DELETE_NOTE_FROM_ARCHIVES":
      return {
        ...state,
        archivedNotes: payload,
      };
    default:
      return state;
  }
};
