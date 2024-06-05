import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt'
import { Hono } from 'hono'
import { createBlogInput, updateBlogInput } from '@manakhare/common-module';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>()

blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header("Authorization");

    if (!jwt) {
        c.status(401);
        return c.json({ message: "Unauthorized access" })
    }

    const user = await verify(jwt, c.env.JWT_SECRET);

    if (!user) {
        c.status(401);
        return c.json({ message: "Unauthorized access" })
    }

    c.set("userId", String(user.id));
    await next()
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const authId = c.get("userId");

    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        c.json({ message: "Incorrect inputs" })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authId,
                date: body.date
            }
        })

        return c.json({ id: blog.id, date: blog.date })
    } catch (e) {
        c.status(411);
        c.json({ message: "Incorrect inputs" })
    }

})


blogRouter.put('/', async (c) => {
    const body = await c.req.json();

    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        c.json({ message: "Incorrect inputs" })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        });

        return c.json({ id: blog.id, date: blog.date });

    } catch (e) {
        c.status(411);
        return c.json({ message: "Incorrect inputs" })
    }
})



blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                date: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({ blogs })
    } catch (e) {
        c.status(404);
        return c.json({ message: "Blogs not found!" })
    }
})


blogRouter.get('/:id', async (c) => {
    const blogId = c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: blogId
            },
            select: {
                id: true,
                title: true,
                content: true,
                date: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({ blog })
    } catch (e) {
        c.status(404);
        return c.json({ message: 'blog not found' });
    }
})


