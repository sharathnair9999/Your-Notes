import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useComponentVisible from "../../components/useComponentVisible";
import { useNotes } from "../../imports/imports";
import "./NotesPage.css";

const NotesPage = () => {
  const { notesState } = useNotes();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  return (
    <div className="notes-page-section gap-2">
      <button
        id="nav-toggle"
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        {isComponentVisible ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fa-solid fa-bars"></i>
        )}
      </button>
      <nav
        ref={ref}
        className={`notes-nav-section ${isComponentVisible ? "show" : "hide"}`}
      >
        <ul
          className="notes-ul flex justify-fs items-fs flex-col w-100"
          onClick={(e) => e.stopPropagation()}
        >
          <li onClick={() => setIsComponentVisible(!isComponentVisible)}>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "active-link" : "inactive-link"
                }  flex justify-fs items-center gap-sm w-100`
              }
              to={"/"}
            >
              <i className="fa-solid fa-note-sticky"></i>
              <span>Notes</span>
              <span className="ml-auto px-1">
                {notesState?.allNotes?.length > 0 &&
                  notesState?.allNotes?.length}
              </span>
            </NavLink>
          </li>
          <li onClick={() => setIsComponentVisible(!isComponentVisible)}>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "active-link" : "inactive-link"
                } w-100 flex justify-fs items-center gap-sm w-100 `
              }
              to={"label"}
            >
              <i className="fa-solid fa-box-archive"></i>
              <span>Label</span>
              <span className="ml-auto px-1">
                {notesState?.label?.length > 0 && notesState?.label?.length}
              </span>
            </NavLink>
          </li>
          <li onClick={() => setIsComponentVisible(!isComponentVisible)}>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "active-link" : "inactive-link"
                } w-100 flex justify-fs items-center gap-sm w-100 `
              }
              to={"archive"}
            >
              <i className="fa-solid fa-tag"></i>
              <span>Archive</span>
              <span className="ml-auto px-1">
                {notesState?.archivedNotes?.length > 0 &&
                  notesState?.archivedNotes?.length}
              </span>
            </NavLink>
          </li>
          <li onClick={() => setIsComponentVisible(!isComponentVisible)}>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "active-link" : "inactive-link"
                } w-100 flex justify-fs items-center gap-sm w-100 `
              }
              to={"trash"}
            >
              <i className="fa-solid fa-trash-can"></i>
              <span>Trash</span>
              <span className="ml-auto px-1">
                {notesState?.trashNotes?.length > 0 &&
                  notesState?.trashNotes?.length}
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="notes-view">
        <Outlet />
      </div>
    </div>
  );
};

export default NotesPage;
