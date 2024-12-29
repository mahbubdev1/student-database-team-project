import { useEffect, useState } from "react";
import { signOut, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
            setEditData(docSnap.data());
          } else {
            console.error("No user data found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    if (auth.currentUser) {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, editData);
        setUserData(editData);
        setIsEditing(false);
      } catch (error) {
        console.error("Error saving changes:", error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (auth.currentUser) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );
      if (confirmDelete) {
        try {
          const userDocRef = doc(db, "users", auth.currentUser.uid);
          await deleteDoc(userDocRef); // Delete user document from Firestore
          await deleteUser(auth.currentUser); // Delete user from Firebase Authentication
          navigate("/signup"); // Redirect to signup
        } catch (error) {
          console.error("Error deleting account:", error.message);
        }
      }
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      {userData ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Section */}
          <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">
              Welcome, {userData.name}
            </h2>
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <img
                  className="w-32 h-32 object-cover rounded-full"
                  src={userData.photo || "/default-avatar.jpg"}
                  alt="User Photo"
                />
              </div>
              <div className="w-full sm:w-3/4 md:w-1/2 space-y-4">
                <div>
                  <label className="font-semibold">Name:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name || ""}
                      onChange={handleEditChange}
                      className="input input-bordered w-full mt-2"
                    />
                  ) : (
                    <p className="mt-2">{userData.name}</p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Email:</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email || ""}
                      onChange={handleEditChange}
                      className="input input-bordered w-full mt-2"
                    />
                  ) : (
                    <p className="mt-2">{userData.email}</p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Roll:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="roll"
                      value={editData.roll || ""}
                      onChange={handleEditChange}
                      className="input input-bordered w-full mt-2"
                    />
                  ) : (
                    <p className="mt-2">{userData.roll}</p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Registration:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="registration"
                      value={editData.registration || ""}
                      onChange={handleEditChange}
                      className="input input-bordered w-full mt-2"
                    />
                  ) : (
                    <p className="mt-2">{userData.registration}</p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Address:</label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={editData.address || ""}
                      onChange={handleEditChange}
                      className="textarea textarea-bordered w-full mt-2"
                    />
                  ) : (
                    <p className="mt-2">{userData.address}</p>
                  )}
                </div>
                <div className="text-center mt-6">
                  {isEditing ? (
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={handleSaveChanges}
                        className="btn btn-success text-white rounded-lg px-6 py-2"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="btn btn-secondary text-white rounded-lg px-6 py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn btn-primary text-white rounded-lg px-6 py-2"
                      >
                        Edit Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="btn btn-secondary text-white rounded-lg px-6 py-2"
                      >
                        Log Out
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        className="btn btn-danger text-white rounded-lg px-6 py-2"
                      >
                        Delete Account
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Feature Tile Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-bold text-center mb-4">Features</h3>
            <div className="space-y-4">
              <button
                onClick={() => navigate("/cv", { state: userData })}
                className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                <img
                  src="https://i.postimg.cc/4ys9g4qK/image.png"
                  alt="CV Maker Icon"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-bold text-lg">Make CV</h4>
                  <p className="text-sm text-gray-600">
                    Create and customize your CV
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Dashboard;
