import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const Signup = () => {
    const router = useRouter()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true)
        const data = {
            name,
            email,
            mobileNumber,
            password
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        fetch("https://gravity-grill.onrender.com/api/user/signup", requestOptions)
            .then(response => response.text(),)
            .then(result => {
                setLoading(false)
                const data = JSON.parse(result);
                console.log("DATA", data)
                setLoading(false);
                if (data.resCode === 200) {
                    toast.success(
                        "Account Created Successfully",
                        {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        }
                    );
                    localStorage.setItem("userId", data.userId)
                    router.push('/login')
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
        <>
            <div className='my-2 pt-2 rounded-lg text-center border mx-auto md:w-[40%] flex flex-col items-center text-[#ebebeb]'>
                <h1 className='text-[30px]'>SIGN UP</h1>
                <form
                    className="flex flex-col justify-center space-y-5 md:w-[80%] w-full rounded-lg p-7"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col">
                        <label>
                            Name:
                            <span className="text-red-500 font-bold">
                                *
                            </span>
                        </label>
                        <input
                            type="text"
                            className="border rounded px-4 py-2 text-black"
                            placeholder="Enter your name"
                            name="name"
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label>
                            Email:
                            <span className="text-red-500 font-bold">
                                *
                            </span>
                        </label>
                        <input
                            type="email"
                            className="border rounded px-4 py-2 text-black"
                            placeholder="Enter your email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label>
                            Phone Number:
                            <span className="text-red-500 font-bold">
                                *
                            </span>
                        </label>
                        <input
                            type="number"
                            className="border rounded px-4 py-2 text-black"
                            placeholder="Enter your phone number"
                            onWheel={(e) => e.target.blur()}
                            value={mobileNumber}
                            onChange={(event) => setMobileNumber(event.target.value)}
                            required
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
                            className="border rounded px-4 py-2 text-black"
                            placeholder="Enter your password"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        {loading ? (
                            <FaSpinner className="animate-spin" />
                        ) : (
                            <button
                                type="submit"
                                className="py-1 px-7 text-[#ebebeb] font-bold bg-[#7d4e84] rounded hover:text-[#7d4e84] hover:bg-[#ebebeb]"
                            >
                                <span>Sign Up</span>
                            </button>
                        )}
                    </div>
                </form>
                <p className='mb-10'>Already have an account? <span className=' text-blue-800 cursor-pointer' onClick={() => router.push('/login')}>LogIn</span></p>
            </div>
        </>
    )
}

export default Signup;
