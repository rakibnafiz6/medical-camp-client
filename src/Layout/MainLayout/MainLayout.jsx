import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <section className="w-11/12 mx-auto">
            <Outlet></Outlet>
            </section>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;