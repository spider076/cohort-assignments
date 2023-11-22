import { Todo } from "./todo";

export type TodoCreationParams = Pick<Todo, "title" | "description">;

export class TodoService {
    public get(id: number): Todo {
        return {
            id, 
            title: "random todo",
            description: "random description",
            done: true
        }
    }

    public create(todoCreationParams: TodoCreationParams): Todo {
        console.log('calling create function !');
        return {
            id : 1, 
            title: "random todo",
            description: "random description",
            done: true
        }
    }
}