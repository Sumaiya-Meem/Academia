import { Outlet } from "react-router-dom";
import Header from "../SharePage/Header/Header";
import Footer from "../SharePage/Footer/Footer";


const MainLayout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;