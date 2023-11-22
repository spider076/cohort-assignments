"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
class TodoService {
    get(id) {
        return {
            id,
            title: "random todo",
            description: "random description",
            done: true
        };
    }
    create(todoCreationParams) {
        console.log('calling create function !');
        return {
            id: 1,
            title: "random todo",
            description: "random description",
            done: true
        };
    }
}
exports.TodoService = TodoService;
