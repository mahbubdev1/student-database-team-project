
import PropTypes from 'prop-types';
import logo from '../../assets/spiLogo.png';
import { NavLink } from 'react-router-dom';
import './Navbar.css'
const Navbar = () => {
    return (
        <div>
            <div className="grid lg:grid-cols-2 gap-5 justify-items-center bg-green-300 py-4 px-10">
                <div className="flex justify-center items-center gap-2">
                    <div className="bg-transparent border-2 border-white rounded-xl">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "active-logo-class" : "inactive-logo-class"
                            }
                        >
                            <img className="w-36 h-12" src={logo} alt="Logo" />
                        </NavLink>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-y-4 justify-items-center">
                    <div className="grid gap-4 grid-cols-3">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "btn-active" : "btn"
                            }
                        >
                            <button>
                                Home
                            </button>
                        </NavLink>
                        <NavLink
                            to="/students"
                            className={({ isActive }) =>
                                isActive ? "btn-active" : "btn"
                            }
                        >
                            <button>
                                Students
                            </button>
                        </NavLink>

                        <NavLink
                            to="/teachers"
                            className={({ isActive }) =>
                                isActive ? "btn-active" : "btn"
                            }
                        >
                            <button>
                                Teachers
                            </button>
                        </NavLink>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <NavLink
                            to="/registrations"
                            className={({ isActive }) =>
                                isActive ? "btn-active" : "btn"
                            }
                        >
                            <button>
                                <i className="fa-solid fa-address-card"></i>
                            </button>
                        </NavLink>

                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? "btn-active" : "btn"
                            }
                        >
                            <button>
                                <i className="fa-solid fa-right-to-bracket"></i>
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

Navbar.propTypes = {

};

export default Navbar;