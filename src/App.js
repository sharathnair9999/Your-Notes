import { Routes, Route } from "react-router-dom";
import {
  Alert,
  ErrorPage,
  Footer,
  Landing,
  Login,
  NotesPage,
  ResetPassword,
  Signup,
  UserAvatar,
} from "./imports/imports";
import Mockman from "mockman-js";
import { RedirectLoggedUser, RequireAuth } from "./Contexts/User-Context/user-context";

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
        />
        <Route path="mockapi" element={<Mockman />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
