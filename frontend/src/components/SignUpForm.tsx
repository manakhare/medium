import { Link, useNavigate } from "react-router-dom"
import Input from "./Input"
import { useState } from "react"
import { SignupInput } from "@manakhare/common-module"
import axios from "axios"
import { BACKEND_URL } from "../../config.ts"
import { useSetRecoilState } from "recoil"
import { isUserLoggedInAtom, userEmailAtom, userNameAtom } from "../recoil/atom/userDetailsAtom.ts"
import Loader from "./Loader.tsx"
import { toast } from "react-toastify"

const SignUpForm = () => {
    const [loading, setLoading] = useState(false);
    const setUserName = useSetRecoilState(userNameAtom)
    const setLoggedIn = useSetRecoilState(isUserLoggedInAtom);
    const setUserEmail = useSetRecoilState(userEmailAtom);

    const navigate = useNavigate();
    const [userInput, setUserInput] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    async function sendSignUpData() {
        try {
            setLoading(true)
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, userInput);
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);

            setUserName({ name: userInput.name || "Anonymous" });
            setLoggedIn({ loggedIn: true })
            setUserEmail(userInput.email)
            setLoading(false)

            toast.success('Sign in successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            })

            navigate('/blogs')
        } catch (e: any) {
            console.log(e);
            toast.error(e.response?.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            })
            setLoading(false)
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            {loading ? <Loader /> :
                <div className="w-fit py-5">
                    <div className="flex px-10  flex-col justify-center items-center">
                        <div className="text-4xl font-extrabold py-2">Create an account</div>
                        <div className="text-lg text-slate-500 mb-5">
                            Already have an account?{' '}
                            <Link to={'/signin'} className="underline underline-offset-2 cursor-pointer">
                                Login
                            </Link></div>
                    </div>
                    <Input label={"Username"} placeholder={"Enter your username"} onChange={(e) => {
                        setUserInput(c => ({
                            ...c,
                            name: e.target.value
                        }))
                    }} />
                    <Input label={"Email"} type={"email"} placeholder={"m@example.com"} onChange={(e) => {
                        setUserInput(c => ({
                            ...c,
                            email: e.target.value
                        }))
                    }} />
                    <Input label={"Password"} type={"password"} placeholder={"******"} onChange={(e) => {
                        setUserInput(c => ({
                            ...c,
                            password: e.target.value
                        }))
                    }} />

                    <button onClick={sendSignUpData} className="w-full p-2 my-3 text-lg bg-black rounded-lg text-slate-50 font-bold align-middle">Sign Up</button>
                </div>
            }
        </div>
    )
}

export default SignUpForm