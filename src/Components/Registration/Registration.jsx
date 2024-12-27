import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { IoClose } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import img from "../../assets/register4.png";
import SocialLogin from "../SocialLogin";

const userss = {
    name: '',
    roll: '',
    registration: '',
    semester: '',
    shift: '',
    session: '',
    permanentAddress: '',
    address: '',
    email: '',
    password: '',
    phone: '',
    photo: ''
};

const Registration = () => {
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ ...userss });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { email, password, ...restData } = formData;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                ...restData,
                uid: user.uid,
                email: user.email,
            });

            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="py-20">
            <div className="lg:flex max-w-7xl mx-auto items-center justify-between gap-6 p-1 lg:px-24 bg-ray-100">
                <div>
                    <img className="w-full" src={img} alt="" />
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
                            <h3 className="text-4xl font-bold">Sign Up</h3>
                            <p className="font-medium">Sign Up into your pages account</p>
                        </div>
                        {error && <p className="text-red-600 text-center">{error}</p>}
                        <form className="mb-6" onSubmit={handleRegister}>
                            {/* Input fields for user data */}
                            {Object.keys(userss).map((key, index) => (
                                key !== 'password' && (
                                    <div className="form-control mb-3" key={index}>
                                        <label className="label">
                                            <span className="label-text text-lg text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                        </label>
                                        <input
                                            type="text"
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleInputChange}
                                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                            className="border-2 p-4"
                                            required
                                        />
                                    </div>
                                )
                            ))}
                            <div className="form-control relative mb-4">
                                <label className="label">
                                    <span className="label-text text-lg text-gray-500">Password*</span>
                                </label>
                                <input
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="*********"
                                     className="border-2 p-4"
                                    required
                                />
                                <span className="absolute top-[60px] right-2" onClick={() => setShowPass(!showPass)}>
                                    {showPass ? <FaEyeSlash className="text-2xl" /> : <FaEye className="text-2xl" />}
                                </span>
                            </div>
                            <div className="form-control mt-6">
                                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-5 text-white font-bold">
                                    Sign Up
                                </button>
                            </div>
                            <div className="divider text-gray-400">Login With</div>
                            <SocialLogin />
                            <div className="mt-3 text-center font-medium text-gray-500 text-lg">
                                <p>
                                    Already have an account? Go to{" "}
                                    <Link to="/login" className="text-blue-500 hover:text-green-500">Login</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
