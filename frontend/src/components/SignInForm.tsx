import { Link, useNavigate } from "react-router-dom"
import Input from "./Input"
import { useState } from "react"
import { SigninInput } from "@manakhare/common-module"
import axios from "axios"
import { BACKEND_URL } from "../../config.ts"
import { useSetRecoilState } from "recoil"
import { isUserLoggedInAtom, userEmailAtom, userNameAtom } from "../recoil/atom/userDetailsAtom.ts"
import { toast } from 'react-toastify';


const SignInForm = () => {
    const [loading, setLoading] = useState(false);
    const setLoggedIn = useSetRecoilState(isUserLoggedInAtom)
    const setUserEmail = useSetRecoilState(userEmailAtom);
    const setUSerName = useSetRecoilState(userNameAtom);

    const navigate = useNavigate();
    const [userInput, setUserInput] = useState<SigninInput>({
        email: "",
        password: ""
    })

    async function sendSignInData() {
        try {
            setLoading(true)
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, userInput);
            const jwt = response.data.token;
            console.log(response.data);
            
            console.log(response);


            localStorage.setItem("token", jwt);
            localStorage.setItem("user", JSON.stringify(response.data.storedUser))
            setLoggedIn({ loggedIn: true });
            setUserEmail(userInput.email);
            setUSerName({ name: response.data.storedUser.name })

            
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
            
            setLoading(false)
            navigate('/blogs');

        } catch (e: any) {
            console.log(e);

            toast.error("Something went wrong. Please try again!", {
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
        <div className={loading ? "h-screen flex flex-col justify-center items-center cursor-wait" : "h-screen flex flex-col justify-center items-center"}>
            
            <div className="w-fit py-5">
                <div className="flex px-10  flex-col justify-center items-center">
                    <div className="text-4xl font-extrabold py-2">Login</div>
                    <div className="text-lg text-slate-500 mb-5">
                        Don't have an account? {' '}
                        <Link to={'/signup'} className="underline underline-offset-2 cursor-pointer">
                            Sign up
                        </Link></div>
                </div>

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
                {/* <Button buttonText={"Sign In"} onClick={sendSignInData}/> */}
                <button
                    disabled={loading ? true: false}
                    onClick={sendSignInData} 
                    className={loading ? 
                                "w-full p-2 my-3 text-lg bg-black rounded-lg text-slate-50 font-bold align-middle cursor-not-allowed" 
                                :
                                "w-full p-2 my-3 text-lg bg-black rounded-lg text-slate-50 font-bold align-middle cursor-pointer"}>
                        Sign In
                </button>
            </div>


        </div>
    )
}

export default SignInForm 