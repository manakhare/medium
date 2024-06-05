import Appbar from "../components/Appbar";
import Avatar from "../components/Avatar";
import { useBlog } from "../hooks"
import { Loading } from "../components/Loading";
import { useParams } from "react-router-dom";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Blog = () => {
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
  const month = months[d.getMonth()];
  const postedDate = d.getDate()
  const formattedDate = postedDate + " " + month + ", " + fullYear;


  return (
    <div className="h-screen w-screen relative z-0">
      <Appbar />
      <div className="grid grid-cols-12 justify-center gap-4 lg:px-5">
        <div className="grid col-span-12 lg:col-span-8 py-10 pl-20 pr-10">
          <div>
            <div className="font-extrabold text-5xl p-4">{blog.title}</div>
            <div className="px-4 text-slate-400">Posted on {formattedDate}</div>
            <div className="p-4 tracking-wide text-md text-slate-800">{blog.content}</div>
          </div>
        </div>

        <div className="grid col-span-12 lg:col-span-4 py-4 px-20">
          <div className="ml-4 lg:w-full">
            <div className="pt-6 text-lg text-slate-600">Author</div>
            <div className="flex flex-row justify-start items-center gap-4 mt-5">
              <div className="flex w-10 flex-col justify-center items-center mr-2 px-5">
                <Avatar size={10} /></div>
              <div>
                <div className="font-bold text-2xl">{blog.author.name || "Anonymous"}</div>
                <div className="py-3 text-slate-400">Master of mirth, purveyor of puns, and the funniest person in the kingdom.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog