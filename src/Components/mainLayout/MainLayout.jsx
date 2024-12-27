import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavbarLatest from "../Navbar/NavbarLatest";


const MainLayout = () => {
    const location = useLocation();
 
    return (
        <div>

            <div className="">
                { <NavbarLatest></NavbarLatest>}
            </div>

            <div className='max-w-[1400px] mx-auto' >
                <Outlet ></Outlet>
            </div>

            <div>
                { <Footer></Footer>}
            </div>
        </div>
    );
};

export default MainLayout;