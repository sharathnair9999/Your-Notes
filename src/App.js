import { Routes, Route } from "react-router-dom";
import {
  Alert,
  ArchivesPage,
  ErrorPage,
  Footer,
  LabelPage,
  Landing,
  Login,
  NotesPage,
  NotesSection,
  ResetPassword,
  Signup,
  TrashPage,
  UserAvatar,
} from "./imports/imports";
import Mockman from "mockman-js";
import {
  RedirectLoggedUser,
  RequireAuth,
} from "./Contexts/User-Context/user-context";

function App() {
  return (
    <div className="App">
      <UserAvatar />
      <Alert />
      <Routes>
        <Route
          path="/"
          element={
            <RedirectLoggedUser>
              <Landing />
            </RedirectLoggedUser>
          }
        />
        <Route
          path="login"
          element={
            <RedirectLoggedUser>
              <Login />
            </RedirectLoggedUser>
          }
        />
        <Route path="signup" element={<Signup />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route
          path="notes"
          element={
            <RequireAuth>
              <NotesPage />
            </RequireAuth>
          }
        >
          <Route index element={<h1>Toggle</h1>} />
          <Route path="all-notes" element={<NotesSection />} />
          <Route path="label" element={<LabelPage />} />
          <Route path="archive" element={<ArchivesPage />} />
          <Route path="trash" element={<TrashPage />} />
          <Route
            path="*"
            element={
              <main>
                <h1>Error page</h1>
              </main>
            }
          />
        </Route>
        <Route path="mockapi" element={<Mockman />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
