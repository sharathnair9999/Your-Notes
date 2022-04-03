import Login from "../pages/Login/Login";
import Landing from "../pages/Landing/Landing";
import HomePage from "../pages/HomePage/HomePage";
import Signup from "../pages/Signup/Signup";
import SingleNotePage from "../pages/SingleNotePage/SingleNotePage";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import NotesPage from "../pages/NotesPage/NotesPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { constants } from "../app-utils/constants";
import Alert from "../components/Alert/Alert";
import { useDetails } from "../Contexts/User-Context/user-context";
import { capitalize } from "../Contexts/User-Context/user-utils";
import Password from "../components/Password/Password";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import LabelPage from "../components/Trashpage/TrashPage";
import TrashPage from "../components/Trashpage/TrashPage";
import ArchivesPage from "../components/ArchivesPage/ArchivesPage";
import NotesSection from "../components/NotesSection/NotesSection";
import { callApi, extractContent } from "../app-utils/app-utils";
import LabelsPage from "../components/LabelsPage/LabelsPage";
import NotesLanding from "../components/NotesLanding/NotesLanding";
import MainSearchBar from "../components/MainSearchBar/MainSearchBar";
import { useNotes } from "../Contexts/Notes-Context/notes-context";
import EmptyData from "../components/EmptyData/EmptyData";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";

export {
  Alert,
  Login,
  HomePage,
  Landing,
  SingleNotePage,
  Signup,
  ResetPassword,
  NotesPage,
  ErrorPage,
  NavBar,
  Footer,
  constants,
  useDetails,
  capitalize,
  Password,
  UserAvatar,
  LabelPage,
  ArchivesPage,
  TrashPage,
  NotesSection,
  callApi,
  extractContent,
  LabelsPage,
  NotesLanding,
  MainSearchBar,
  useNotes,
  EmptyData,
  RichTextEditor
};
