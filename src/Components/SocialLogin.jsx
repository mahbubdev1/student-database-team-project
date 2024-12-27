import { FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {
    return (
        <div>
            <button
                className="flex gap-3 items-center justify-center py-3 w-full bg-green-500 hover:bg-green-600 text-white font-bold">
                <FaGoogle className="text-lg"></FaGoogle>
                <span> Login with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;