import { appwriteService } from "../import";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../import";
import {useDispatch} from 'react-redux';
import { showSuccess } from "../toastUtility/toast"  // Assuming you have a utility for showing success messages

function LogoutBtn(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const Logout = async () => {
        await appwriteService.Logout();
        dispatch(removeUser());    
        showSuccess("Logged out successfully");

        // store -> remove the user data and set isAuthenticated to false.
        navigate("/login");
    }

    return(
        <>
            <button onClick={Logout}>
                Log Out
            </button>
        </>
    )
}

export default LogoutBtn;