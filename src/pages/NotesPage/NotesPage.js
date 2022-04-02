import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./NotesPage.css";

const NotesPage = () => {
  return (
    <div className="notes-page-section">
      <nav className="notes-nav-section">
        <ul className="flex justify-fs items-center flex-col">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
            to={"all-notes"}
          >
            Notes
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
            to={"label"}
          >
            Label
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
            to={"archive"}
          >
            Archive
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
            to={"trash"}
          >
            Trash
          </NavLink>
        </ul>
      </nav>
      <div className="notes-view">
        <Outlet />
      </div>
    </div>
  );
};

export default NotesPage;
