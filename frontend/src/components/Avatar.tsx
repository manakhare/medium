

interface AvatarProps {
    size: number;
    username: string;
}

const Avatar = ({ size, username }: AvatarProps) => {
  
    let width = `w-${size}`;
    let height = `h-${size}`;

    return (
        <div className={`cursor-pointer inline-flex items-center justify-center  ${width} ${height} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className={`inline-flex justify-center items-center text-sm font-medium text-gray-600 dark:text-gray-300`}>
                {username.split(' ').length !== 1 ? username[0] + username.split(' ')[1][0] : username[0]}
            </span>
        </div>
    )
}

export default Avatar