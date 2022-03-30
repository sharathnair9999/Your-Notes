import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Alert, ErrorPage, Footer, Landing, Login, NotesPage, ResetPassword, Signup } from "./imports/imports";
import Mockman from "mockman-js";

function App() {

  return (
    <div className="App">
      <Alert/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="reset-password" element={<ResetPassword/>}/>
        <Route path="notes" element={<NotesPage />} />
        <Route path="mockapi" element={<Mockman />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
