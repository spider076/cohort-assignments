import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from '@trpc/server/adapters/standalone';

import * as z from "zod";
import * as fs from "fs";

const TodoInputTypes = z.object({
    id: z.number().finite(),
    title: z.string().max(10),
    description: z.string().max(30),
    done: z.boolean().optional()
});

const appRouter = router({
    createTodo: publicProcedure
        .input(z.object({
            id: z.number(),
            title: z.string(),
            description: z.string(),
            done: z.boolean()
        })).mutation(async (opts) => {
            const user = opts.ctx.user;
            const { input } = opts;
            const todos = await fs.promises.readFile("./db/todos.json", "utf-8");
            const data = JSON.parse(todos);

            if (user) {
                try {
                    data.push(input);
                    await fs.promises.writeFile("./db/todos.json", JSON.stringify(data, null, 2), 'utf-8');
                    console.log("Todo Added successfully");
                    return {
                        message: "todo created succesfully !",
                        id: "1",
                    }
                } catch (err) {
                    console.error(err);
                    return {
                        error: err,
                        message: "todo was not created !"
                    }
                }
            } else {
                return {
                    message: "Invalid User/Permission Denied !"
                }
            }
        }), 
        showTodos: publicProcedure
        .query(async (opts) => {
            try {
                const response = await fs.readFileSync("./db/todos.json", "utf-8");
                const data = JSON.parse(response);
                console.log("data : ", data);
                return {
                    message: "todos succesfully fetched !",
                    data: data
                }
            } catch (err) {
                console.log("error : ", err);
                return {
                    message: "error while fetching the todos",
                    error: err,
                }
            }
        
        }),
        signUp: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string().max(10)
        }))
        .mutation(async (opts) => {
            const { email, password } = opts.input;
            const user = opts.ctx.user;
            console.log("user : ", user);
            return {
                email,
                password
            }
        })
})


// here we are just exporting the types of approuter trpc function
export type AppRouter = typeof appRouter;

// serving the trpc endpoints using the adapters by our choice of backend(express/standalone, aws, nextjs)

const server = createHTTPServer({
    router: appRouter,
    createContext(opts) {
        let authHeader = opts.req.headers["authorization"];
        console.log(authHeader);
        // some jwt magic to verify the user 
        return {
            user: "saad",
        }
    }
});

server.listen(3000);