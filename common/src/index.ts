import {date, z} from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
})

export const signinInput = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6)
})

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogInput = z.object({
    authorId: z.string(),
    title: z.string(),
    content: z.string(),
    id: z.string().optional(),
    date: z.string().optional(),
    published: z.boolean().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})


export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;