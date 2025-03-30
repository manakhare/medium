import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify, decode } from 'hono/jwt'
import { Hono } from 'hono'
import { createBlogInput, updateBlogInput } from '@manakhare/common-module';
import { commonUpdateBlogInput } from '../types';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
        userName: string;
        userEmail: string;
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

    const userDetails = decode(jwt);

    c.set("userId", String(user.id));
    // c.set('userEmail', String(userDetails.payload.email));
    // c.set('userName', String(userDetails.payload.name));

    await next()
})



blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const authId = c.get("userId");
    // const name = c.get('userName');
    // const email = c.get("userEmail");

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

        return c.json({
            id: blog.id,
            date: blog.date,
            // email: email,
            // name: name
        })
    } catch (e) {
        c.status(411);
        c.json({ message: "Incorrect inputs" })
    }

})



blogRouter.get('/my-posts', async (c) => {
    const id = c.get('userId');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.post.findMany({
            where: {
                authorId: id
            },
            select: {
                title: true,
                content: true,
                date: true,
                id: true,
                author: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })

        return c.json({ blogs })
    }
    catch (err) {
        c.status(502);
        return c.json({ message: "Couldn't find posts" })
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
            },
            orderBy: {
                date: 'desc'
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
                        name: true,
                        email: true,
                        description: true
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

blogRouter.delete('/:id', async (c) => {
    const blogId = c.req.param("id");
    const authId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.delete({
            where: {
                id: blogId,
                authorId: authId
            }
        })
        return c.json({ message: "Deleted successfully" })
    } catch (e) {
        c.status(404);
        return c.json({ message: 'blog not found' });
    }
}
)
   

blogRouter.put('/:id', async (c) => {
    const body = await c.req.json();
    const blogId = c.req.param("id");
    const authId = c.get("userId");

    const { success, error } = commonUpdateBlogInput.safeParse(body);

    if (!success) {
        c.status(411);
        return c.json({ message: "Incorrect inputs" })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.update({
            where: {
                id: blogId
            },
            data: {
                title: body.title,
                content: body.content
            }
        });

        return c.json({
            id: blog.id,
            date: blog.date,
            // email: email,
            // name: name
        });

    } catch (e) {
        // console.log(e);
        c.status(411);
        return c.json({ message: "Incorrect inputs" })
    }
})




