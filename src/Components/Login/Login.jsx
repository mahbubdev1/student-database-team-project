import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IoClose } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import img from "../../assets/login2.png";
import SocialLogin from "../SocialLogin";

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            navigate("/dashbord");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="py-20">
            <div className="lg:flex max-w-7xl mx-auto items-center justify-between gap-6 p-1 lg:px-24 bg-ray-100">
                <div>
                    <img className="w-full" src={img} alt="Login Illustration" />
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
                            <h3 className="text-4xl font-bold">Login</h3>
                            <p className="font-medium">Login into your pages account</p>
                        </div>
                        {error && <p className="text-red-600 text-center">{error}</p>}
                        <form className="mb-6" onSubmit={handleEmailLogin}>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text text-lg text-gray-500">Email Address*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ami@tmi.com"
                                     className="border-2 p-4"
                                    required
                                />
                            </div>
                            <div className="form-control relative mb-4">
                                <label className="label">
                                    <span className="label-text text-lg text-gray-500">Password*</span>
                                </label>
                                <input
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="*********"
                                     className="border-2 p-4"
                                    required
                                />
                                <span
                                    className="absolute top-[60px] right-2"
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {showPass ? <FaEyeSlash className="text-2xl" /> : <FaEye className="text-2xl" />}
                                </span>
                            </div>
                            <div className="form-control mt-6">
                                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-5 text-white font-bold">
                                    Login
                                </button>
                            </div>
                            <div className="divider text-gray-400">Login With</div>
                            <SocialLogin />
                            <div className="mt-3 text-center font-medium text-gray-500 text-lg">
                                <p>
                                    Are you new? Go to{" "}
                                    <Link to="/registrations" className="text-blue-500 hover:text-green-500">
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
