import React from 'react';
import { createRoot } from 'react-dom/client';

// styling:
import './index.css';

// pages:
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import CourseCard from './pages/CoursePage.jsx';
import ProtectedRoutes from './components/ProtectedRoute.jsx';

import Dashboard from './pages/Dashboard.jsx';
// import EnrollmentPage from './pages/EnrollementPage.jsx';
import EnrollmentPage from './pages/EnrollementPage.jsx';

// store and router:
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux/store.js";

// toast notifications:
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: (
                        <Home />
                )
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'Course/:courseId',
                element: (
                    <ProtectedRoutes>
                        <CourseCard />
                    </ProtectedRoutes>
                )
            },
            {
                path: 'dashboard',
                element: (
                     <ProtectedRoutes>
                        <Dashboard />
                    </ProtectedRoutes>
                )
            },
            {
                path: 'enrollements/:id',
                element: (
                    <ProtectedRoutes>
                        <EnrollmentPage />
                    </ProtectedRoutes>
                )   
            }
        ]
    }
]);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
    </Provider>
);
