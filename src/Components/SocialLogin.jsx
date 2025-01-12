import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SocialLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                navigate('/')
                toast.success('Google Login Success');
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    return (
        <div>
            <button
                className="flex gap-3 items-center justify-center py-3 w-full bg-green-500 hover:bg-green-600 text-white font-bold">
                <FaGoogle className="text-lg"></FaGoogle>
                <span onClick={handleGoogleLogin}> Login with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;