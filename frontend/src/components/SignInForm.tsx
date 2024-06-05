import { Link, useNavigate } from "react-router-dom"
import Input from "./Input"
import { useState } from "react"
import { SigninInput } from "@manakhare/common-module"
import axios from "axios"
import { BACKEND_URL } from "../../config.ts"
import { useSetRecoilState } from "recoil"
import { isUserLoggedInAtom } from "../recoil/atom/userDetailsAtom.ts"


const SignInForm = () => {
    const setLoggedIn = useSetRecoilState(isUserLoggedInAtom)

    const navigate = useNavigate();
    const [userInput, setUserInput] = useState<SigninInput>({
        email: "",
        password: ""
    })

    async function sendSignInData() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, userInput);
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            setLoggedIn({ loggedIn: true });
            navigate('/blogs')
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
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
                <button onClick={sendSignInData} className="w-full p-2 my-3 text-lg bg-black rounded-lg text-slate-50 font-bold align-middle">Sign In</button>
            </div>
        </div>
    )
}

export default SignInForm 