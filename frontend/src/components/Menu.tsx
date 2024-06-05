import { Link } from "react-router-dom";

const Menu = ({ switchCrossSign, hidden }: {
    switchCrossSign: () => void,
    hidden: string
}) => {

    return (
        < div className="z-10 flex start-0 justify-center top-0 right-0 h-screen w-screen inset-0 flex-col items-center fixed" >
            <div className="z-20 fixed inset-0 flex items-center justify-center text-white"></div>

            <div className="z-30 fixed  bg-slate-50 inset-0 flex flex-col items-center justify-center">
                <div onClick={switchCrossSign} className={`${hidden} mb-20 cursor-pointer`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </div>


                <div className="flex items-center justify-center py-3 mt-2 px-20 w-2/3 rounded-full text-lg cursor-pointer bg-gray-100 hover:bg-gray-200">
                    <Link to={'/create'}>New Post</Link>
                </div>
                <div className="flex items-center justify-center py-3 mt-2 px-20 w-2/3 rounded-full text-lg cursor-pointer bg-gray-100 hover:bg-gray-200">
                    <Link to={'/signin'}>Logout</Link>
                </div>
            </div>
        </div >

    )
}

export default Menu

