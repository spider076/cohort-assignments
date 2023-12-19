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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({ log: ['info', 'query'] });
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.post.create({
        data: {
            title: "demo",
            authorId: 1,
            content: "demo description",
            published: true
        }
    });
});
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("query executed succesfully !");
    yield prisma.$disconnect();
})).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(err);
    yield prisma.$disconnect();
    process.exit(1);
}));
