import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useNotes } from "../../imports/imports";
import "./NotesPage.css";

const NotesPage = () => {
  const { notesState } = useNotes();
  return (
    <div className="notes-page-section gap-2">
      <nav className="notes-nav-section show">
        <ul className="notes-ul flex justify-fs items-fs flex-col w-100">
          <li>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "active-link" : "inactive-link"
                } w-100 flex justify-fs items-center gap-sm`
              }
              to={"all-notes"}
            >
              <i className="fa-solid fa-note-sticky"></i>
              <span>Notes</span>
              <span className="ml-auto">
                {notesState?.allNotes?.length > 0 &&
                  notesState?.allNotes?.length}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "active-link" : "inactive-link"
                } w-100 flex justify-fs items-center gap-sm `
              }
              to={"label"}
            >
              <i className="fa-solid fa-box-archive"></i>
              <span>Label</span>
              <span className="ml-auto">
                {notesState?.label?.length > 0 && notesState?.label?.length}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "active-link" : "inactive-link"
                } w-100 flex justify-fs items-center gap-sm `
              }
              to={"archive"}
            >
              <i className="fa-solid fa-tag"></i>
              <span>Archive</span>
              <span className="ml-auto">
                {notesState?.archivedNotes?.length > 0 &&
                  notesState?.archivedNotes?.length}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "active-link" : "inactive-link"
                } w-100 flex justify-fs items-center gap-sm `
              }
              to={"trash"}
            >
              <i className="fa-solid fa-trash-can"></i>
              <span>Trash</span>
              <span className="ml-auto">
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
