import { appwriteService } from "../import";
import { useNavigate } from "react-router-dom";

function LogoutBtn(){
    const navigate = useNavigate();

    const Logout = async () => {
        await appwriteService.Logout();
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