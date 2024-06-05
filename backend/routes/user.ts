import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt'
import { Hono } from 'hono'
import { signinInput, signupInput } from '@manakhare/common-module';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>()

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();

    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        c.json({ message: "Incorrect inputs" })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.create({
            data: {
                name: body.name || '',
                email: body.email,
                password: body.password
            }
        })

        console.log(user);

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({ token, user })
    } catch (e) {
        c.status(403);
        return c.json({ message: "Error while signing up" })
    }
})

userRouter.post('/signin', async (c) => {
    const body = await c.req.json();

    const { success } = signinInput.safeParse(body);

    if (!success) {
        c.status(411);
        c.json({ message: "Incorrect inputs" })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        },
        select: {
            name: true,
            posts: true,
            id: true
        }
    })

    if (!user) {
        c.status(403);
        return c.json({ message: "Something went wrong" })
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token, user })
})



