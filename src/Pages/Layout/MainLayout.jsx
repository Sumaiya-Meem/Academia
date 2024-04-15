import { Outlet } from "react-router-dom";
import Header from "../SharePage/Header/Header";
import Footer from "../SharePage/Footer/Footer";


const MainLayout = () => {
    return (
        <div className="max-w-screen-lg mx-auto">
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;