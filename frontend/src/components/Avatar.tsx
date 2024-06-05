import { useRecoilValue } from "recoil";
import { userNameAtom } from "../recoil/atom/userDetailsAtom";

interface AvatarProps {
    size: number;
}

const Avatar = ({ size }: AvatarProps) => {
    const { name } = useRecoilValue(userNameAtom);

    let width = `w-${size}`;
    let height = `h-${size}`;

    return (
        <div className={`cursor-pointer inline-flex  items-center justify-center  ${width} ${height} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className={`flex justify-center text-sm font-medium text-gray-600 dark:text-gray-300`}>
                {name.split(' ').length !== 1 ? name[0] + name.split(' ')[1][0] : name[0]}
            </span>
        </div>
    )
}

export default Avatar