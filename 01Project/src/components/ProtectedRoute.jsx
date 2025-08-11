import { Navigate, useLocation } from 'react-router-dom';
import { appwriteService,setUser} from '../import';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import CustomSpinner from './Spinners';

function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState(false);

  useEffect(() => {
    appwriteService.GetUser()
      .then((user) => {
        if (user) {
          setAuthStatus(true);
          dispatch(setUser(user)); // update Redux with actual user
        } else {
          setAuthStatus(false);
        }
      })
      .catch(() => setAuthStatus(false))
      .finally(() => setLoading(false)); 
    //   this is gonna run anyway

  }, [dispatch]);

  if (loading) {
    return <CustomSpinner />;
  }

  if (!isAuthenticated && !authStatus) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoutes;
