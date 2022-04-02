import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./NotesPage.css";

const NotesPage = () => {
  return (
    <div className="notes-page-section gap-2">
      <nav className="notes-nav-section">
        <ul className="notes-ul flex justify-fs items-fs flex-col w-100">
          <li>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "active-link":"inactive-link"} w-100 flex justify-fs items-center gap-sm`
              }
              to={"all-notes"}
            >
             <i className="fa-solid fa-note-sticky"></i><span>Notes</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
              `${isActive ? "active-link":"inactive-link"} w-100 flex justify-fs items-center gap-sm `
              }
              to={"label"}
            >
              <i className="fa-solid fa-box-archive"></i><span>Label</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "active-link":"inactive-link"} w-100 flex justify-fs items-center gap-sm `
              }
              to={"archive"}
            >
              <i className="fa-solid fa-tag"></i><span>Archive</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "active-link":"inactive-link"} w-100 flex justify-fs items-center gap-sm `
              }
              to={"trash"}
            >
              <i className="fa-solid fa-trash-can"></i><span>Trash</span>
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
