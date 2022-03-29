import "./App.css";
import {Routes, Route} from 'react-router-dom'
import { ErrorPage, Footer, Landing, NavBar, NotesPage } from "./imports/imports";
import Mockman from "mockman-js";

function App() {
  return <div className="App">
  <NavBar/>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path ="/all-notes" element={<NotesPage/>}/>
      <Route path="/mockapi" element={<Mockman/>}/>
      <Route path="*" element={<ErrorPage/>} />
    </Routes>
    <Footer/>
  </div>;
}

export default App;
