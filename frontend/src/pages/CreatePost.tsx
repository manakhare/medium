import {   useState } from "react"
import { BACKEND_URL } from "../../config"
import Appbar from "../components/Appbar"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { editBlogAtom } from "../recoil/atom/blogDetailsAtom"
import TextEditor from "../components/TextEditor"
import { toast } from "react-toastify"

export const CreatePost = () => {
    const navigate = useNavigate();
    const useBlogValue = useRecoilValue(editBlogAtom)
    const [loading, setLoading] = useState(false)
    const [blogData, setBlogData] = useState({
        title: useBlogValue.title,
        content: useBlogValue.content
    })
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);

    const sendBlogData = async () => {
        try {
            if(blogData.title && blogData.title.trim()!='') {
                if(blogData.content && blogData.content.trim() != '') {
                    setLoading(true)
                    
                    const date = new Date();
            
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        ...blogData,
                        date,
                        published: true
                    }, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    })
            
                    const id = response.data.id;
                    setLoading(false);
                    setTitleError(false);
                    setContentError(false);
                    navigate(`/blog/${id}`);
                }
                else {
                    setContentError(true)
                }
            } else {
                setTitleError(true)
            } 
        } catch (error) {
            toast.error("Please fill in the required details!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            })
        }
    }

    const getPlainText = () => {
        
    }


    return (
        <div className="h-screen w-screen relative z-0">
            <div>
                <Appbar />
            </div>

            <div className={loading ?
                "px-10 flex flex-col justify-center items-center w-full cursor-wait"
                :
                "px-10 flex flex-col justify-center items-center w-full"}>

                <div className="max-w-screen-lg w-full flex flex-col items-center justify-center">

                    <div className="mt-6 w-full font-semibold font-serif text-3xl flex justify-start items-start">
                        Create New Blog
                    </div>

                    <div className="my-8 w-full">
                        <div className="flex flex-row justify-between items-center">
                            <label className="text-lg py-2 font-bold font-serif uppercase">Title</label>
                            {titleError ? <div className="text-lg py-2 items-center text-red-500 font-semibold">*Title is required</div> : null}
                        </div>
                        {/* <div>{blogData.title + " " + blogData.content}</div>
                        <div>{useBlogValue.title + " " + useBlogValue.content}</div> */}
                        <input 
                            type="text" 
                            // value={useBlogValue.title || ''} 
                            onChange={(e) => {
                                setBlogData({
                                    ...blogData,
                                    title: e.target.value
                                })
                            }} 
                            className="focus:outline-blue-300 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />
                    </div>

                    <div className="w-full">
                        <div className="flex flex-row justify-between items-center">
                            <label className="text-lg py-3 font-bold font-serif uppercase">Content</label>
                            {contentError ? <div className="text-lg py-2 items-center text-red-500 font-semibold">*Content is required</div> : null}
                        </div>
                        <TextEditor setBlogData={setBlogData} blogData={blogData}/>
                    </div>

                    <div className="mt-6 w-full">
                        <button
                            disabled={loading ? true : false}
                            onClick={sendBlogData}
                            className={loading ?
                                "w-full py-3 bg-blue-600  text-slate-50 rounded-lg cursor-not-allowed text-lg font-bold hover:bg-blue-500"
                                :
                                "w-full py-3 bg-blue-600  text-slate-50 rounded-lg cursor-pointer text-lg font-bold hover:bg-blue-500"}>
                            Post
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}

