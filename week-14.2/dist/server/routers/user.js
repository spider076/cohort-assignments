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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const server_1 = require("@trpc/server");
const user_1 = require("../middleware/user");
exports.userRouter = (0, trpc_1.router)({
    test: trpc_1.publicProcedure
        .query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("test query working !!!");
        return "hi there !";
    })),
    signup: trpc_1.publicProcedure
        .input(zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        let username = opts.input.username;
        let password = opts.input.password;
        let response = yield opts.ctx.db.User.insertMany([{
                username,
                password
            }]);
        let userId = response[0]._id;
        const token = jsonwebtoken_1.default.sign({ userId: userId }, __1.SECRET, { expiresIn: '1h' });
        return {
            token
        };
    })),
    login: trpc_1.publicProcedure
        .input(zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield opts.ctx.db.User.find({
            email: opts.input.username
        });
        if (!response) {
            throw new server_1.TRPCError({ code: 'UNAUTHORIZED' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: opts.ctx.userId }, __1.SECRET, { expiresIn: '1h' });
        return {
            token
        };
    })),
    me: trpc_1.publicProcedure
        .use(user_1.isLoggedIn)
        .output(zod_1.z.object({
        email: zod_1.z.string()
    }))
        .query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield opts.ctx.db.User.findById(opts.ctx.userId);
        if (!response) {
            // shouldn't happen
            throw new server_1.TRPCError({ code: 'UNAUTHORIZED' });
        }
        return {
            email: response.username || "",
        };
    })),
});
