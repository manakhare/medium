import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { Loading } from "./Loading";
import { useBlog } from "../hooks";
import { month } from "../constants";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}


const BlogCard = ({ authorName, title, content, publishedDate, id }: BlogCardProps) => {
    const { loading } = useBlog({ id });

    if (loading) {
        return <div className="w-full flex flex-col items-center justify-center">
            <div className="w-3/4 flex flex-col items-center justify-center"><Loading /></div>
            <div className="w-3/4 flex flex-col items-center justify-center"><Loading /></div>
            <div className="w-3/4 flex flex-col items-center justify-center"><Loading /></div>
        </div>
    }

    const d = new Date(publishedDate.split('T')[0]);
    const fullYear = d.getFullYear();
    const postedMonth = month[d.getMonth()];
    const postedDate = d.getDate()
    const formattedDate = postedDate + " " + postedMonth + ", " + fullYear;

    return (
        <Link to={`/blog/${id}`}>
            <div className="p-2 my-8 min-w-full hover:cursor-pointer flex flex-col border-b border-slate-200">
                <div className="flex flex-row py-1 my-1">
                    <div className="mr-3 flex justify-center w-6">
                        <Avatar size={6} username={authorName || "Anonymous"} />
                    </div>
                    <div className="flex justify-center">
                        <div className="flex justify-center font-semibold mr-3">{authorName || "Anonymous"}</div>
                        <div className="sm:flex sm:justify-center hidden text-slate-500">{formattedDate}</div>
                    </div>
                </div>

                <div className="py-2">
                    <div className="font-bold text-xl">{title}</div>
                    <div className="text-slate-500 pt-1 font-serif" dangerouslySetInnerHTML={{__html: content.length > 130 ? content.slice(0, 130) + "..." : content}}></div>
                </div>

                <div className="py-2 text-slate-700 font-thin text-sm">{`${Math.ceil(content.length / 200)} min read`}</div>
            </div>
        </Link>
    )
}

export default BlogCard