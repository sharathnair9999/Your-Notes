import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./NotesPage.css";

const NotesPage = () => {
  return (
    <div className="notes-page-section">
      <nav>
        <ul className="flex-and-center flex-col gap-sm p-sm">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
            to={"all-notes"}
          >
            Home
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
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default NotesPage;
