# **Medium-clone**

### Features:
1. Signin / Signup with authentication
2. Add / delete / edit posts
3. View all posts
4. View my posts
5. Edit profile details
6. Create posts Anonymously
7. Logout

### Tech stack used:
1. React in frontend
2. Cloudflare workers in backend
3. Zod as the validation library and type inference for frontend types
4. Typescript as the language
5. Prisma as the ORM with connection pooling
6. Postgres as the database
7. JWT for authentication

## **Project setup**

### **Backend:**
1. Clone the repository
```
git clone https://github.com/manakhare/medium.git
```

2. Navigate to the backend directory
```
cd backend
npm install
```

3. Open an account on any clould provider who provides Postgres, and get create a DB there. Paste the link of that DB in the .env file.
```
DATABASE_URL = "my_db_url"
```

4. Create a project using Prisma Accelerate, and paste it's link in wrangler.toml file along with the values of JWT_SECRET and SALT_ROUNDS
```
file: wrangler.toml

[vars]
DATABASE_URL= 'my_prisma_accelerate_url'
JWT_SECRET = 'my_jwt_secret'
SALT_ROUNDS = x
```




4. To start db:
```
npx prisma init
npx prisma migrate dev --name init_schema
npx prisma generate --no-engine
```

5. To set up a serveless backend, visit the cloudflare website, and create a worker there.

6. To start the backend server locally, run the following command in the terminal:
```
npm run dev
```

**To deploy backend to cloudflare**

1. Run
```
npx wrangler login
npm run deploy
```

2. Update env variables from the cloudflare dashboard


## **Frontend**

1. Go in the frontend directory, and run the following command in the terminal to start the frontend server locally
``` 
cd frontend
npm run dev
```

