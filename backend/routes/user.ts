import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt'
import { Hono } from 'hono'
import { signinInput, signupInput } from '@manakhare/common-module';
import bcrypt from "bcryptjs";
import { isRejected } from '@reduxjs/toolkit';


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
                password: hashedPassword,
                description: ""
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
                name: user.name,
                description: user.description
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
    console.log(body);
    
    const { success } = signinInput.safeParse(body);
    
    if (!success) {
        console.log("Here");
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
                password: true,
                description: true
            }
        })

        console.log(storedUser);

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
                name: storedUser?.name,
                description: storedUser?.description
            },
            message: 'Sign in successful!'
        })
    } catch (e) {
        // if (!storedUser) {
        c.status(403);
        c.json({ message: 'No such user exists. Please sign up!' });
        // }
    }

})


userRouter.get('/my-posts-desc', async (c) => {
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


userRouter.get('/my-posts-asc', async (c) => {
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
                        date: 'asc'
                    }
                }
            }
        })

        return c.json({ userBlogs })
    }
    catch (err) {
        c.status(502);
        return c.json({ message: "Couldn't find posts" })
    }

})


userRouter.post('/profile', async (c) => {
    const jwt = c.req.header("Authorization");
    const body = await c.req.json();

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
        const updateProfile = await prisma.user.update({
            where: {
                id: userId as string || ""
            },
            data: {
                description: body.description,
                name: body.name,
            }
        })

        c.status(200);
        return c.json({ message: "Profile updated successfully" })
    } catch (error) {
        console.log(error);
        c.status(400);
        return c.json({message: "Couldn't update profile details!"})
    }
})


userRouter.get('/profile', async (c) => {
    const jwt = c.req.header("Authorization");
    // const body = await c.req.json();

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
        const data = await prisma.user.findFirst({
            where: {
                id: userId || ""
            },
            select: {
                name: true,
                // email: true,
                description: true
            }
        })

        if(!data) {
            c.status(404);
            return c.json({ message: "Profile not found" });
        }

        console.log(data);
        

        c.status(200);
        return c.json({profile: data})
        
    } catch (error) {
        console.log(error);
        c.status(400);
        return c.json({ message: "Cannot find profile details!"})
    }
})


