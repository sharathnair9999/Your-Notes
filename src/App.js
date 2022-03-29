import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ErrorPage, Footer, Landing, Login, NotesPage, Signup } from "./imports/imports";
import Mockman from "mockman-js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="all-notes" element={<NotesPage />} />
        <Route path="mockapi" element={<Mockman />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
