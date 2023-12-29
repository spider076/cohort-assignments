"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const user_1 = require("../middleware/user");
exports.todoRouter = (0, trpc_1.router)({
    todoCreate: trpc_1.publicProcedure
        .input(zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string()
    }))
        .use(user_1.isLoggedIn)
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        let title = opts.input.title;
        let description = opts.input.description;
        const newTodo = new opts.ctx.db.Todo({ title, description, done: false, userId: opts.ctx.userId });
        let response = yield newTodo.save();
        return {
            id: response.id
        };
    })),
    todoGet: trpc_1.publicProcedure
        .output(zod_1.z.array(zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        done: zod_1.z.boolean()
    })))
        .use(user_1.isLoggedIn)
        .query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        let todos = yield opts.ctx.db.Todo.find({
            userId: opts.ctx.userId
        });
        return todos.map(x => ({
            title: x.title || "",
            description: x.description || "",
            done: x.done || false
        }));
    }))
});
