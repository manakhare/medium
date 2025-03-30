import {z} from "zod";

export const commonUpdateBlogInput = z.object({
    authorId: z.string().optional(),
    title: z.string(),
    content: z.string(),
    id: z.string().optional(),
    date: z.string().optional(),
    published: z.boolean().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})