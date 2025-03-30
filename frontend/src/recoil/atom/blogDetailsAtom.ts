import { atom } from "recoil";

export const editBlogAtom = atom({
    key: "editBlog",
    default: {
        title: "",
        content: "",
        id: "",
    }
})