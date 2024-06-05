import { Link } from "react-router-dom"
import { isUserLoggedInAtom } from "../recoil/atom/userDetailsAtom";
import { useSetRecoilState } from "recoil";

const DropdownMenu = () => {
    const setLoggedIn = useSetRecoilState(isUserLoggedInAtom)

    const logout = () => {
        localStorage.removeItem("token");
        setLoggedIn({ loggedIn: false })
    }

    return (
        <div className="z-10 mt-3 bg-slate-100 divide-y divide-gray-300 rounded-lg shadow w-44 ">
            <div onClick={logout} className="p-2 cursor-pointer rounded-lg hover:bg-slate-200">
                <Link to='/signin'>
                    Logout
                </Link>
            </div>
        </div>
    )
}

export default DropdownMenu