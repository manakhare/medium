import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt'
import { Hono } from 'hono'
import { signinInput, signupInput } from '@manakhare/common-module';
import bcrypt from "bcryptjs";


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
        SALT_ROUNDS: number;
    }
}>()

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const { success } = signupInput.safeParse(body);

    if (!success) {
        c.status(411);
        c.json({ message: "Incorrect inputs" })
    }

    try {
        const checkUserExists = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })

        if (checkUserExists) {
            c.status(401);
            return c.json({ message: "Account already exists! Please sign in" })
        }

        const hashedPassword = await bcrypt.hash(body.password, c.env.SALT_ROUNDS);


        const user = await prisma.user.create({
            data: {
                name: body.name || '',
                email: body.email,
                password: hashedPassword
            }
        })

        // console.log(user, 'user');

        const token = await sign({
            id: user.id
        }, c.env.JWT_SECRET);

        // console.log(token, 'token');

        return c.json({
            token, user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        })
    } catch (e) {
        // console.log(e);
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

    try {
        const storedUser = await prisma.user.findUnique({
            where: {
                email: body.email
            },
            select: {
                name: true,
                email: true,
                id: true,
                password: true
            }
        })

        if(!storedUser) throw new Error();

        const passwordsMatch = await bcrypt.compare(body.password, storedUser.password);

        if (!passwordsMatch) {
            return c.json({ message: 'Invalid password' }, 401);
        }
        const token = await sign({
            id: storedUser?.id
        }, c.env.JWT_SECRET);

        return c.json({
            token,
            storedUser: {
                id: storedUser?.id,
                email: storedUser?.email,
                name: storedUser?.name
            },
            message: 'Sign in successful!'
        })
    } catch (e) {
        // if (!storedUser) {
        c.status(403);
        c.json({ message: 'No such user exists. Please sign up!' });
        // }
    }




    // const user = await prisma.user.findUnique({
    //     where: {
    //         email: body.email,
    //         password: 
    //     }
    // })

    // if (!user) {
    //     c.status(403);
    //     return c.json({ message: "No such user exists. Please sign up!" })
    // }

    // verifying password
    // if (user.password !== body.password) {
    //     c.status(401);
    //     return c.json({ message: 'Passwords do not match! Authentication failed' })
    // }


})


userRouter.get('/my-posts', async (c) => {
    const jwt = c.req.header("Authorization");

    if (!jwt) {
        c.status(401);
        return c.json({ message: "Unauthorized access" })
    }

    const user = await verify(jwt, c.env.JWT_SECRET);

    if (!user) {
        c.status(401);
        return c.json({ message: "No such user exists!" })
    }

    const userId = user.id;


    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const userBlogs = await prisma.user.findMany({
            where: {
                id: userId || "",
            },
            include: {
                posts: {
                    orderBy: {
                        date: 'desc'
                    }
                }
            },
            // orderBy: {
            //     posts: {
            //         date: 'desc'
            //     }
            // },
            // select: {
            //     posts: true,
            // }
        })

        return c.json({ userBlogs })
    }
    catch (err) {
        // console.log(err);

        c.status(502);
        return c.json({ message: "Couldn't find posts" })
    }

})


