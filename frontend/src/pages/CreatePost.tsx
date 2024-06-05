import { useState } from "react"
import { BACKEND_URL } from "../../config"
import Appbar from "../components/Appbar"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const CreatePost = () => {
    const navigate = useNavigate();
    const [blogData, setBlogData] = useState({
        title: "",
        content: ""
    })


    const sendBlogData = async () => {
        const date = new Date();

        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
            ...blogData,
            date
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })

        const id = response.data.id;
        navigate(`/blog/${id}`);
    }

    return (
        <div className="h-screen w-screen relative z-0">
            <div>
                <Appbar />
            </div>

            <div className="px-10 flex flex-col justify-center items-center w-full">
                <div className="max-w-screen-lg w-full flex flex-col items-center justify-center">

                    <div className="my-6 w-full font-semibold text-2xl flex justify-start items-start">
                        Create New Blog
                    </div>

                    <div className="mt-8 w-full">
                        <input type="text" onChange={(e) => {
                            setBlogData({
                                ...blogData,
                                title: e.target.value
                            })
                        }} className="focus:outline-blue-300 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />
                    </div>

                    <div className="mt-6 my-2 w-full">
                        <textarea onChange={(e) => {
                            setBlogData({
                                ...blogData,
                                content: e.target.value
                            })
                        }} rows={10} className="block focus:outline-blue-300 p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your content here..."></textarea>
                    </div>

                    <div className="mt-6 w-full">
                        <button onClick={sendBlogData} className="w-full py-3 bg-blue-600  text-slate-200 rounded-lg cursor-pointer text-lg font-bold hover:bg-blue-500">
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}