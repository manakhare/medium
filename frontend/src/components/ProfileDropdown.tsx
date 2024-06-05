import { useRecoilValue } from "recoil"
import { userNameAtom } from "../recoil/atom/userDetailsAtom"
import DropdownMenu from "./DropdownMenu";
import { useState } from "react";

const ProfileDropdown = () => {
    const { name } = useRecoilValue(userNameAtom);
    const [block, setBlock] = useState('hidden')

    const onProfileHover = () => {
        if (block === 'hidden') {
            setBlock('block');
        } else {
            setBlock('hidden');
        }
    }

    return (
        <div className="flex flex-col justify-center items-center relative">
            <button
                onClick={onProfileHover}
                className="inline-flex outline-slate-700 py-2 px-4 bg-slate-600 justify-center rounded-full h-full text-slate-300">
                {name[0]}
            </button>

            <div className={`${block} absolute top-12`}>
                <DropdownMenu />
            </div>
        </div>
    )
}

export default ProfileDropdown