import React, { useState } from "react";
import { useNotes, EmptyData, RichTextEditor } from "../../imports/imports";
import "./LabelsPage.css";
import { availableTags } from "../../app-utils/app-utils";

const LabelsPage = () => {
  const { notesState } = useNotes();
  const { allNotes } = notesState;
  const [filter, setFilter] = useState([]);
  const applyFilters = (item) => {
    filter.includes(item)
      ? setFilter((filterArray) => {
          return [...filterArray.filter((thisItem) => thisItem !== item)];
        })
      : setFilter((filterArray) => {
          return [...filterArray, item];
        });
  };
  const containsInFilters = (filterItem) => {
    return filter.some((item) => item === filterItem);
  };
  return (
    <div className="flex-and-center flex-col gap-1">
      {availableTags.length > 0 && (
        <div className="chips-container flex items-center wrap">
          {availableTags.map((item) => (
            <span
              onClick={() => {
                applyFilters(item);
              }}
              className={`chip-item ${
                containsInFilters(item) && "chip-active"
              } `}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      )}
      {allNotes.length > 0 ? (
        allNotes
          .filter(({ tags }) => tags.some((item) => filter.includes(item)))
          .map((note) => <RichTextEditor existingNote note={note} canUpdateNote canAddToArchive />)
      ) : (
        <EmptyData message={"No Notes with you yet."} />
      )}
    </div>
  );
};

export default LabelsPage;
