import { BACKEND_URL } from "../../config";
import { useState, useEffect } from "react";
import axios from "axios";

export interface BlogInterface {
    title: string;
    content: string;
    id: string;
    date: string;
    published: boolean;
    author: {
        name: string;
        email: string;
    }
}

export interface UserBlogInterface {
    title: string;
    id: string;
    content: string;
    published: boolean;
    date: string;
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogInterface[]>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    }, [])

    return {
        loading, blogs
    }
}

export const useUserBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<UserBlogInterface[]>();

    useEffect(() => {

        axios.get(`${BACKEND_URL}/api/v1/user/my-posts`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setBlogs(response.data.userBlogs[0].posts);
            setLoading(false);
        })
    }, [])

    return {
        loading, blogs
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogInterface>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setBlog(response.data.blog);
            setLoading(false);
        })
    }, [])

    return {
        loading, blog
    }
}

