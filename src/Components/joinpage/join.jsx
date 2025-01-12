import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { IoClose } from "react-icons/io5";
import img from "../../assets/register4.png";
import SocialLogin from "../SocialLogin";
import { toast } from "react-toastify";

const ROLES = {
  student: [
    "name",
    "roll",
    "registration",
    "semester",
    "shift",
    "session",
    "permanentAddress",
    "address",
    "phone",
    "photo",
  ],
  teacher: [
    "name",
    "designation",
    "faculty",
    "department",
    "batch",
    "office_phone",
    "personal_phone",
    "roomNo",
    "photo",
  ],
};

const TecStuJoin = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState([]);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // Update fields dynamically based on role selection
  useEffect(() => {
    if (role) {
      setFields(ROLES[role]);
      setFormData(
        ROLES[role].reduce((acc, field) => {
          acc[field] = "";
          return acc;
        }, {})
      );
    }
  }, [role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      setError("You must be logged in to complete this process.");
      return;
    }

    try {
      const userRoleCollection = role === "teacher" ? "teachers" : "users";

      await setDoc(doc(db, userRoleCollection, user.uid), {
        ...formData,
        uid: user.uid,
        email: user.email,
      });

      navigate("/");
      toast.success('Student Add Successful...')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="py-20">
      <div className="lg:flex max-w-7xl mx-auto items-center justify-between gap-6 p-1 lg:px-24 bg-gray-100">
        <div>
          <img className="w-full" src={img} alt="Join Page Image" />
        </div>
        <div className="lg:w-1/2 bg-white shadow-2xl p-4 lg:p-12">
          <div className="flex justify-end relative">
            <Link to="/">
              <button className="absolute top-3 right-3">
                <IoClose className="text-3xl text-red-600 hover:text-red-700" />
              </button>
            </Link>
          </div>
          <div>
            <div className="text-center space-y-1 mb-4">
              <h3 className="text-4xl font-bold">Register</h3>
              <p className="font-medium">Complete your profile</p>
            </div>
            {error && <p className="text-red-600 text-center">{error}</p>}

            {!role && (
              <div className="flex justify-center gap-6 mb-6">
                {Object.keys(ROLES).map((r) => (
                  <button
                    key={r}
                    className={`px-8 py-4 rounded-md ${r === "student"
                        ? "bg-blue-500 text-white"
                        : "bg-green-500 text-white"
                      }`}
                    onClick={() => setRole(r)}
                  >
                    Join as {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            )}

            {role && (
              <form className="mb-6" onSubmit={handleRegister}>
                {fields.map((field, index) => (
                  <div className="form-control mb-3" key={index}>
                    <label className="label">
                      <span className="label-text text-lg text-gray-500">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </span>
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      className="border-2 p-4"
                      required
                    />
                  </div>
                ))}

                <div className="form-control mt-6">
                  <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-5 text-white font-bold">
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TecStuJoin;
