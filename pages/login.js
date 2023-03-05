import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true)
        const data = {
            email,
            password
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        fetch("https://gravity-grills-backend.onrender.com/api/user/login", requestOptions)
            .then(response => response.text(),)
            .then(result => {
                setLoading(false)
                const data = JSON.parse(result);
                console.log("DATA", data)
                setLoading(false);
                if (data.resCode === 200) {
                    toast.success(
                        "User logged in successfully",
                        {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        }
                    );
                    router.push('/dashboard')
                }
                else {
                    toast.error(
                        `${data.message}`,
                        {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        }
                    );
                }
            })
            .catch(error => console.log('error', error));
    };

    return (
        <div className="login-bg h-screen pt-20">
            <div className='rounded-lg text-center border mx-auto md:w-[40%] flex flex-col items-center bg-white'>
                <h1 className='text-[30px]'>LogIn</h1>
                <form
                    className="flex flex-col justify-center space-y-5 md:w-[80%] w-full rounded-lg p-7"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col">
                        <label>
                            Email:
                            <span className="text-red-500 font-bold">
                                *
                            </span>
                        </label>
                        <input
                            type="email"
                            className="border rounded px-4 py-2 bg-[#3a3c3b] text-white"
                            placeholder="Enter your email"
                            name="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label>
                            Password:
                            <span className="text-red-500 font-bold">
                                *
                            </span>
                        </label>
                        <input
                            type="password"
                            className="border rounded px-4 py-2 bg-[#3a3c3b] text-white"
                            placeholder="Enter your password"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <span className="text-sm my-2 text-blue-800 cursor-pointer"
                        // onClick={() => router.push('/forgot_password')}
                        >
                            Forgot password?
                        </span>

                    </div>
                    <div className="flex justify-center">
                        {loading ? (
                            <FaSpinner className="animate-spin" />
                        ) : (
                            <button
                                type="submit"
                                className="py-1 px-7 text-[#ebebeb] font-bold bg-[#7d4e84] rounded hover:text-[#7d4e84] hover:bg-[#ebebeb]"
                            >
                                <span>LogIn</span>
                            </button>
                        )}
                    </div>
                </form>
                <p className='mb-10'>Don&apos;t have an account? <span className=' text-blue-800 cursor-pointer' onClick={() => router.push('/signup')}>SignUp</span></p>
            </div>
        </div>
    )
}

export default Login;
