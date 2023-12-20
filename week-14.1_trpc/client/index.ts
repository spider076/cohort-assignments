import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/index';
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000',
        }),
    ],
});

const createTodo = async () => {
    const response = await trpc.createTodo.mutate({
        id: 1,
        title: "test",
        description: "test Description",
        done: true
    });

    console.log("resposne : ", response);
    return response;
};

const showTodos = async () => {
    const response = await trpc.showTodos.query();

    console.log("todos resposne : ", response);

    const signup = await trpc.signUp.mutate({
        email: "saad@gmail.com",
        password: "23032423",
    })

    console.log("signup resposne : ", signup);

    return {
        response, signup
    };

};

createTodo();

setTimeout(() => {
    console.log("reading call executing !");
    showTodos();

}, 5000)