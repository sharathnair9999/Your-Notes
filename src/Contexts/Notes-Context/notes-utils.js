export const initialNoteState = {
  allNotes: [],
  archivedNotes: [],
  trashNotes: [],
  labels: [],
  pinnedNotes: [],
};

export const notesReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_NOTES":
      return {
        ...state,
        allNotes: payload,
      };
    case "GET_PINNED_NOTES":
      return {
        ...state,
        pinnedNotes: payload,
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
    case "TRASH":
      return { ...state, trashNotes: payload };
    case "RESTORE_FROM_TRASH":
      return { ...state, trashNotes: payload };
    case "EMPTY_TRASH":
      return { ...state, trashNotes: [] };
    case "DELETE_NOTE_FROM_TRASH":
      return { ...state, trashNotes: payload };
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
