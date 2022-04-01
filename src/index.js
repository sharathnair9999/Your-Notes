import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./Contexts/User-Context/user-context";
import { NoteProvider } from "./Contexts/Notes-Context/notes-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <NoteProvider>
        <Router>
          <App />
        </Router>
      </NoteProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
