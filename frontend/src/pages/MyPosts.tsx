import Appbar from "../components/Appbar"
import { useUserBlogs } from "../hooks"
import BlogCard from "../components/BlogCard";
import { useRecoilValue } from "recoil";
import { userNameAtom } from "../recoil/atom/userDetailsAtom";
import { Loading } from "../components/Loading";
import { Link } from "react-router-dom";

export const MyPosts = () => {
  const { loading, blogs } = useUserBlogs();
  const { name } = useRecoilValue(userNameAtom);

  // console.log(blogs);

  if (loading) {
    return <div className="w-full flex flex-col items-center justify-center">
      <div className="w-3/4 flex flex-col items-center justify-center"><Loading /></div>
      <div className="w-3/4 flex flex-col items-center justify-center"><Loading /></div>
      <div className="w-3/4 flex flex-col items-center justify-center"><Loading /></div>
      <div className="w-3/4 flex flex-col items-center justify-center"><Loading /></div>
      <div className="w-3/4 flex flex-col items-center justify-center"><Loading /></div>
    </div>
  }

  return (
    <div className="h-screen w-screen relative z-0">
      <div>
        <Appbar />
      </div>

      <div className="my-5 p-5 h-screen w-full flex flex-col justify-start items-center">
        <div className="w-3/4 lg:w-1/2 flex flex-col justify-center">
          <div className="mx-2 px-1 font-bold text-2xl">
            My Posts
          </div>
          <div>
            {blogs && blogs.length>0 ? blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.date}
              />))
              : <div className="px-3 py-5 font-light text-md">You have not posted anything yet!</div>}
          </div>
          <Link to="/blogs">
              <div className="mx-1 px-6 py-2 bg-green-700 w-fit text-slate-50 font-bold rounded-md cursor-pointer hover:bg-green-600 transition-all duration-200">
                Go Back
              </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
