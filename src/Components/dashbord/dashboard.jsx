import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const getUserData = async () => {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
            setEditData(docSnap.data());
          }
        };
        getUserData();
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    if (auth.currentUser) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, editData);
      setUserData(editData);
      setIsEditing(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      {userData ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Welcome, {userData.name}</h2>

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
                    value={editData.name}
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
                    value={editData.email}
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
                    value={editData.roll}
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
                    value={editData.registration}
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
                    value={editData.address}
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
                      onClick={handleLogout}
                      className="btn btn-secondary text-white rounded-lg px-6 py-2"
                    >
                      Log Out
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
                  </div>
                )}
              </div>
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
