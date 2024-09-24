import { Link } from "react-router-dom"
import ProfileDropdown from "./ProfileDropdown"
import Menu from "./Menu"
import { memo, useState } from "react";
import { useRecoilValue } from "recoil";
import { isUserLoggedInAtom } from "../recoil/atom/userDetailsAtom";


const Appbar = memo(() => {
    const [block, setBlock] = useState('block');
    const [hidden, setHidden] = useState('hidden');

    const loggedIn = useRecoilValue(isUserLoggedInAtom);

    const switchMenuSign = () => {
        if (block === 'block') {
            setBlock('hidden');
            setHidden('block');
        }
        else {
            setBlock('block');
            setHidden('hidden')
        }
    }

    const switchCrossSign = () => {
        if (hidden === 'hidden') {
            setHidden('block');
            setBlock('hidden')
        }
        else {
            setHidden('hidden');
            setBlock('block')
        }
    }


    return (
        <div className="border-b flex justify-between px-20 py-4">
            <div className="cursor-pointer flex flex-col justify-center font-bold text-2xl">
                <Link to={'/blogs'}>
                    Medium
                </Link>
            </div>

            <div className="hidden md:flex flex-row justify-center">
                <div className="mr-4">
                    {loggedIn ?
                        (<Link to={"/create"}>
                            < button className="py-2 px-8 text-white font-bold text-md bg-green-700 hover:bg-green-600 border rounded-full">
                                New Post
                            </button>
                        </Link>) :
                        (<Link to={'/signin'}>
                            <button className="py-2 px-8 text-white font-bold text-md bg-green-700 hover:bg-green-600 border rounded-full">
                                Signup
                            </button>
                        </Link>)}
                </div>
                <div className="lg:flex justify-center">
                    <ProfileDropdown />
                </div>
            </div>

            <div className="md:hidden flex justify-center items-center">
                {block === 'block' ?
                    <div onClick={switchMenuSign} className={`${block} cursor-pointer`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`size-6`}>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                    : <Menu
                        switchCrossSign={switchCrossSign}
                        hidden={hidden}
                    />}

            </div>
        </div >
    )
})

export default Appbar