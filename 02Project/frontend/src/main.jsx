import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// pages:
import Courses from './pages/Courses.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import EnrolledCourses from "./pages/EnrolledCourses.jsx";

// router:
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

// store here:
import store from './features/store.jsx';
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index:true,
        element: <Home/>
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "courses/:id",
        element: <Courses />
      },
      {
        path: "enrolled-courses/:id",
        element: <EnrolledCourses />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
