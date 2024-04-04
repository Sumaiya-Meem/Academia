import { useContext } from "react";
import { ContextProvider } from "../../../Context/AuthProvider";


const AdminHome = () => {
    const {user} = useContext(ContextProvider);
    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi, Welcome</span>
                {
                    user?.displayName ? user.displayName : 'Meem'
                }
            </h2>
        </div>
    );
};

export default AdminHome;