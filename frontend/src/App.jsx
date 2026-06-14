import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
}
from "react-router-dom";

import Login
from "./pages/Login";

import Register
from "./pages/Register";

import Dashboard
from "./pages/Dashboard";

import GroupDetails
from "./pages/GroupDetails";

import ImportPage
from "./pages/ImportPage";

function PrivateRoute(
  { children }
){

  const token =
    localStorage.getItem(
      "token"
    );

  if(
    !token
  ){

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  return children;

}

export default function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={
            <Login />
          }
        />

        <Route
          path="/register"
          element={
            <Register />
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/groups/:groupId"
          element={
            <PrivateRoute>
              <GroupDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/imports"
          element={
            <PrivateRoute>
              <ImportPage />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}