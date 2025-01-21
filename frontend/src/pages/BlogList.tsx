import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import { Loading } from "../components/Loading";
import { useBlogs } from "../hooks"

const BlogList = () => {
    const { loading, blogs } = useBlogs();

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
            <Appbar />

            <div className="my-5 p-5 h-screen w-full flex flex-col justify-start items-center">
                <div className="w-3/4 lg:w-1/2 flex flex-col justify-center">
                    <div className="flex flex-row justify-start">
                        <div className="p-2">+</div>
                        <div className="p-2 font-semibold">For you</div>
                        {/* <div className="p-2">Following</div> */}
                    </div>
                    <div>
                        {blogs ? blogs.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                authorName={blog.author.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={blog.date}
                            />))
                            : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogList