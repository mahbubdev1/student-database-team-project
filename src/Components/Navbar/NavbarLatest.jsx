import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { FaSignOutAlt } from "react-icons/fa"; // Import logout icon
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const NavbarLatest = () => {
  const [user, setUser] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Track if user has submitted their form
  const [userRole, setUserRole] = useState(null); // Track user's role (student or teacher)
  const navigate = useNavigate();
  console.log(isFormSubmitted)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Get user role from Firestore (student or teacher)
        const userDocRef = doc(db, "users", currentUser.uid); // Reference to the user's document in Firestore
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          // Check if the user has profile data in either students or teachers collection
          const role = docSnap.data().role; // Assuming user document contains the role (student or teacher)
          setUserRole(role);

          const collectionRef = doc(db, role === "teacher" ? "teachers" : "users", currentUser.uid);
          const userProfileDoc = await getDoc(collectionRef);

          if (userProfileDoc.exists()) {
            setIsFormSubmitted(true); // Data exists for the user (student or teacher)
          } else {
            setIsFormSubmitted(false); // No data found for the user
          }
        }
      } else {
        setUser(null); // If no user is logged in, reset state
        setIsFormSubmitted(false); // User is logged out, reset form submission
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    toast.promise(
      signOut(auth),
      {
        loading: "Logging out...",
        success: "Logged out successfully!",
        error: "Logout failed. Please try again."
      },
      {
        position: "top-center",
        autoClose: 3000
      }
    );

    navigate("/"); // Redirect to home after logout
  };

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
                stroke="currentColor"
              >
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
              className="bg-[rgb(37,168,214)] text-white menu menu-sm dropdown-content rounded-box z-50 mt-3 space-y-3 w-60 p-6 shadow"
            >
              <NavLink
                to="/"
                className="mr-8 text-base font-medium"
                style={({ isActive }) => isActive ? { borderBottom: '2px solid white' } : {}}>
                Home
              </NavLink>
              <NavLink
                to="/students"
                className="mr-8 text-base font-medium"
                style={({ isActive }) => isActive ? { borderBottom: '2px solid white' } : {}}>
                Students
              </NavLink>
              <NavLink
                to="/teachers"
                className="mr-8 text-base font-medium"
                style={({ isActive }) => isActive ? { borderBottom: '2px solid white' } : {}}>
                Teachers
              </NavLink>
              <NavLink
                to="/about"
                className="mr-8 text-base font-medium"
                style={({ isActive }) => isActive ? { borderBottom: '2px solid white' } : {}}>
                About
              </NavLink>
              <NavLink
                to="/feedBack"
                className="mr-8 text-base font-medium"
                style={({ isActive }) => isActive ? { borderBottom: '2px solid white' } : {}}>
                FeedBack
              </NavLink>
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <h4 className="text-3xl font-semibold hidden md:block">S P I</h4>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavLink
              to="/"
              className="mr-8 text-base font-medium"
              style={({ isActive }) => isActive ? { borderBottom: '2px solid white' } : {}}>
              Home
            </NavLink>
            <NavLink
              to="/students"
              className="mr-8 text-base font-medium"
              style={({ isActive }) => isActive ? { borderBottom: '2px solid white' } : {}}>
              Students
            </NavLink>
            <NavLink
              to="/teachers"
              className="mr-8 text-base font-medium"
              style={({ isActive }) => isActive ? { borderBottom: '2px solid white' } : {}}>
              Teachers
            </NavLink>
            <NavLink
              to="/about"
              className="mr-8 text-base font-medium"
              style={({ isActive }) => isActive ? { borderBottom: '2px solid white' } : {}}>
              About
            </NavLink>
            <NavLink
              to="/feedBack"
              className="mr-8 text-base font-medium"
              style={({ isActive }) => isActive ? { borderBottom: '2px solid white' } : {}}>
              FeedBack
            </NavLink>

          </ul>
        </div>
        <div className="navbar-end gap-3 flex items-center">
          {user ? (
            <>
              {/* Show the Join button only if the user hasn't submitted their data */}
              {!isFormSubmitted && (
                <button
                  onClick={() => navigate("/join")}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
                >
                  Join
                </button>
              )}

              {/* Show the Dashboard button if the user has submitted their data */}
              {isFormSubmitted && (
                <Link to="/dashbord">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
                    Dashboard
                  </button>
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
              >
                Logout
              </button>
            </>
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
