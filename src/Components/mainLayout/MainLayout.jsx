import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavbarLatest from "../Navbar/NavbarLatest";
import { ToastContainer } from "react-toastify";


const MainLayout = () => {
    const location = useLocation();
 
    return (
        <div>

            <div className="">
                { <NavbarLatest></NavbarLatest>}
            </div>

            <div className='max-w-[1400px] mx-auto min-h-[calc(100vh-200px)]' >
                <Outlet ></Outlet>
            </div>

            <div>
                { <Footer></Footer>}
            </div>
            <ToastContainer />
        </div>
    );
};

export default MainLayout;