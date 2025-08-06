import React from 'react';
import { createRoot } from 'react-dom/client';
// import App from './App.jsx'; 
import App from './App.jsx';
import './index.css' ;
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
              path:'register',
              element:<Register/>
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);
