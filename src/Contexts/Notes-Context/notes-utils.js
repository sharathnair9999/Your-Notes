export const initialNoteState = {
  currentNotes: [],
  archivedNotes: [],
  deletedNotes: [],
  labels: [],
  totalNotes: [],
};

export const notesReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_NOTES":
      return {
        ...state,
        currentNotes: payload,
      };
    case "GET_ARCHIVED_NOTES":
      return {
        ...state,
        archivedNotes: payload,
      };
    case "GET_TRASH_NOTES":
      return {
        ...state,
        deletedNotes: payload,
      };
    default:
      return state;
  }
};
