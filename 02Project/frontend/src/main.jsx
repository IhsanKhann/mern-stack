import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./features/store.jsx";
import { setCredentials } from "./features/sliceUser.jsx";
import { setAuthToken } from "./apis/api.js";
import App from "./App";
import "./index.css";   // Make sure this line exists

import Courses from "./pages/Courses.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EnrolledCourses from "./pages/EnrolledCourses.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const token = localStorage.getItem("token");
let user = null;

try {
  const storedUser = localStorage.getItem("user");
  user = storedUser ? JSON.parse(storedUser) : null;
} catch (e) {
  console.warn("Failed to parse user from localStorage", e);
}

if (token) {
  setAuthToken(token);
  if (user) {
    store.dispatch(setCredentials({ user, token }));
  }
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses/:id",
        element: (
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        ),
      },
      {
        path: "enrolled-courses/:id",
        element: (
          <ProtectedRoute>
            <EnrolledCourses />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
