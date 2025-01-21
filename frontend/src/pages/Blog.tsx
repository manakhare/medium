import Appbar from "../components/Appbar";
import Avatar from "../components/Avatar";
import { useBlog } from "../hooks"
import { Loading } from "../components/Loading";
import { Link, useParams } from "react-router-dom";
import { month } from "../constants";
import { userEmailAtom } from "../recoil/atom/userDetailsAtom";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import { editBlogAtom } from "../recoil/atom/blogDetailsAtom";


const Blog = () => {
  const email = useRecoilValue(userEmailAtom);
  const setBlogDetails = useSetRecoilState(editBlogAtom)

  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" })


  if (loading || !blog) {
    return <div className="w-full flex flex-col items-center justify-center">
      <div className="w-3/4 flex flex-col items-center justify-center"><Loading /></div>
      <div className="w-3/4 flex flex-col items-center justify-center"><Loading /></div>
      <div className="w-3/4 flex flex-col items-center justify-center"><Loading /></div>
    </div>
  }

  const d = new Date(blog.date.split('T')[0]);
  const fullYear = d.getFullYear();
  const postedMonth = month[d.getMonth()];
  const postedDate = d.getDate()
  const formattedDate = postedDate + " " + postedMonth + ", " + fullYear;


  return (

    <div className="h-screen w-screen relative z-0">
      <Appbar />
      <div className="grid grid-cols-12 justify-center gap-4 lg:px-10 p-12">
        <div className="grid col-span-12 lg:col-span-8 lg:pl-10 py-10">
          <div className="">
            <div className="font-extrabold text-5xl p-4">{blog.title}</div>
            <div className="px-4 text-slate-400">Posted on {formattedDate}</div>
            <div className="p-4 tracking-wide text-md text-slate-800" dangerouslySetInnerHTML={{__html: blog.content}}></div>
            {email === blog.author.email ?
              <Link to={'/create'}>
                <button
                  onClick={() => {
                    setBlogDetails({
                      title: blog.title,
                      content: blog.content
                    })
                  }}
                  className="mt-5 py-2 px-8 text-white font-bold text-md bg-green-700 hover:bg-green-600 border rounded-full">
                  Edit Post
                </button>
              </Link> : null}
          </div>
        </div>

        <div className="grid col-span-12 lg:col-span-4 py-4 justify-content-start lg:px-2">

          <div className="ml-4 lg:w-full">

            <div className="pt-6 text-lg text-slate-600">Author</div>

            <div className="flex flex-row justify-start items-center gap-4 mt-5">

              <div className="flex w-10 h-10 flex-col justify-center items-center mr-2 px-5">
                <Avatar size={10} username={blog.author.name || "Anonymous"} />
              </div>
              
              <div className="font-bold text-2xl">{blog.author.name || "Anonymous"}</div>

            </div>
              <div className="flex items-center justify-start">
                {/* Description of the author */}
                <div className="py-3 text-slate-400">{blog.author.description}</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog