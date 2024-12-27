import { Link, NavLink } from "react-router-dom";
import { Bounce } from "react-awesome-reveal";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./Navbar.css";

const NavbarLatest = () => {
  const [user, setUser] = useState(null);
  const [Mydata, setMydata] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch the user's name from Firestore
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMydata(docSnap.data());
        } else {
          console.error("No user data found in Firestore.");
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const links = (
    <>
      <NavLink className={({ isActive }) => `mr-8 text-base font-medium ${isActive && "border-b-[2px]"}`} to="/">
        Home
      </NavLink>
      <NavLink className={({ isActive }) => `mr-8 text-base font-medium ${isActive && "border-b-[2px]"}`} to="/students">
        Students
      </NavLink>
      <NavLink className={({ isActive }) => `mr-8 text-base font-medium ${isActive && "border-b-[2px]"}`} to="/teachers">
        Teachers
      </NavLink>
    </>
  );

  return (
    <div className="bg-[rgb(37,168,214)] text-white py-3">
      <div className="navbar max-w-[1400px] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="bg-[rgb(37,168,214)] text-white menu menu-sm dropdown-content rounded-box z-50 mt-3 space-y-3 w-60 p-6 shadow">
              {links}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <Bounce duration={3000}>
              <h4 className="text-3xl font-semibold hidden md:block">S P I</h4>
            </Bounce>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-3">
          {user ? (
            <Link to="/dashbord">
              <button className="bg-green-500 py-3 px-8 text-white hover:bg-green-600 font-bold transition-colors">
                Dashboard
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-white py-3 px-8 text-black hover:text-white font-bold hover:bg-[rgb(10,132,176)] transition-colors">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarLatest;
