"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = void 0;
const trpc_1 = require("./trpc");
const standalone_1 = require("@trpc/server/adapters/standalone");
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("./routers/user");
const todo_1 = require("./routers/todo");
const cors_1 = __importDefault(require("cors"));
exports.SECRET = 'SECr3t';
mongoose_1.default.connect('mongodb+srv://saad76:EKrYWkWPUSQHTLLn@cluster0.wgmqb0q.mongodb.net/', { dbName: "todo" });
// using trpc
const appRouter = (0, trpc_1.router)({
    user: user_1.userRouter,
    todo: todo_1.todoRouter,
});
const server = (0, standalone_1.createHTTPServer)({
    router: appRouter,
    middleware: (0, cors_1.default)(),
    createContext(opts) {
        let authHeader = opts.req.headers["authorization"];
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            console.log(token);
            return new Promise((resolve) => {
                jsonwebtoken_1.default.verify(token, exports.SECRET, (err, user) => {
                    if (user) {
                        resolve({ userId: user.userId, db: { Todo: db_1.Todo, User: db_1.User } });
                    }
                    else {
                        resolve({ db: { Todo: db_1.Todo, User: db_1.User } });
                    }
                });
            });
        }
        return {
            db: { Todo: db_1.Todo, User: db_1.User },
        };
    }
});
server.listen(3000);
