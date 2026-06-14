import {
  BrowserRouter,
  Routes,
  Route
}
from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GroupDetails from "./pages/GroupDetails";
import ImportPage from "./pages/ImportPage";

export default function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/groups/:groupId"
          element={<GroupDetails />}
        />

        <Route
          path="/imports"
          element={<ImportPage />}
        />

      </Routes>

    </BrowserRouter>

  );
}