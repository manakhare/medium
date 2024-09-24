import { Link } from "react-router-dom"
import { isUserLoggedInAtom } from "../recoil/atom/userDetailsAtom";
import { useSetRecoilState } from "recoil";
import { useState } from "react";

const DropdownMenu = () => {
    const [login, setLogin] = useState(true);
    const setLoggedIn = useSetRecoilState(isUserLoggedInAtom)

    const logout = () => {
        console.log("Logged out!");

        setLogin(false);
        localStorage.removeItem("token");
        setLoggedIn({ loggedIn: false })
    }

    return (
        <div className="z-10 mt-3 bg-slate-100 divide-y divide-gray-400 rounded-md shadow w-44">
            <Link
                to='/signin'
                onClick={logout} >
                <div className="p-2 cursor-pointer rounded-lg hover:bg-slate-200">
                    Logout
                </div>
            </Link>
            <Link to='/my-posts'>
                <div className="p-2 cursor-pointer rounded-lg hover:bg-slate-200">
                    My Posts
                </div>
            </Link>
        </div>
    )
}

export default DropdownMenu